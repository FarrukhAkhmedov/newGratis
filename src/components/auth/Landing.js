import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Button, Alert, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


let {width, height} = Dimensions.get('screen')
 
const LoginApp = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigation = useNavigation()

  const {container, square, inputWrapper, buttonWrapper, welcomeButtonWrapper} = styles

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return(
      <SafeAreaView style={container}>
        <View style={square}>
          <View style={inputWrapper}>
            <TextInput 
              placeholder='E-mail'
              onChangeText={(email)=>setEmail(email)}
            />
          </View>
          <View style={inputWrapper}>
            <TextInput
              placeholder='Password'
              onChangeText={(password)=>setPassword(password)}
              secureTextEntry={true}
            />
          </View>
          <Button title='Log in' onPress={()=>{
            auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
              if (error.code == 'auth/email-already-in-use') {
                Alert.alert('Error', 'That email address is already in use!');
              }
          
              if (error.code == 'auth/invalid-email') {
                Alert.alert('Error','That email address is invalid!');
              }

              if (error.code == 'auth/user-not-found'){
                Alert.alert('Error', 'Wrong e-mail and password')
              }
          
              console.error(error);
            });
          }}/>
          <Button title='Create accaunt'  onPress={()=>navigation.navigate('Registration')} style={buttonWrapper}/>
        </View>
      </SafeAreaView>
    );
  }

 return(
  <View style={welcomeButtonWrapper}>
    <Button title='Welcome home!' onPress={()=>navigation.navigate('Tabs', {screen:'Home'})}/>
  </View>
 )

  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#f0f8ff',

    justifyContent:'center',
    alignItems:'center'
    
    
  },
  square:{

    width:width*0.8,
    height:height*0.33,

    justifyContent:'space-evenly',    

  },
  inputWrapper:{
    backgroundColor:'#e9e9e9',

    borderWidth:1,
    borderRadius:4,
   
    marginTop:height*0.01,

    alignItems:'stretch'
  },
  welcomeButtonWrapper:{
    flex:1,

    backgroundColor:'#f0f8ff',

    justifyContent:'center',
    alignItems:'center'
  }
})

export default LoginApp
