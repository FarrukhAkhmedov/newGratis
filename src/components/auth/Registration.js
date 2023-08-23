import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Button, Alert, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

let {width, height} = Dimensions.get('screen')
 
const Registration = () => {
 
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigation = useNavigation()

  const {container, square, inputWrapper} = styles

  
    return (
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
          <Button title='Create accaunt' onPress={()=>{
            auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              Alert.alert('Error', 'User account created & signed in!'); 
            })
            .then(()=>navigation.navigate('Tabs',{screen:'Home'}))
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
              
              
            });
          }}/>
        </View>
      </SafeAreaView>
    );
  }

 


const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',

    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f0f8ff'
    
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
})

export default Registration
