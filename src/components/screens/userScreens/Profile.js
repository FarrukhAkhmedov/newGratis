import React,{useContext, useEffect} from "react";
import {SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native'
import { Avatar } from "@rneui/themed";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import IconButton from "../../CustomButtons/IconButton";
import IconText from "../../IconText";
import { API_URL } from "../../context/Api";
import { observer } from "mobx-react-lite";


let {height} = Dimensions.get('screen')

const Profile = () =>{
  const {container, profileImageStyle, nameAndSurname, iconStyle} = styles
  const navigation = useNavigation()
  const {authStore} = useContext(AuthContext)

  useEffect(()=>{
    if(!authStore.isAuth){
      navigation.navigate('Landing')
    }
  },[authStore.isAuth])

  
  const avatarUri =  `${API_URL}/profileImages/${authStore.userData.userProfileInfo.avatar}` 

  return(
      <SafeAreaView style={container}>
        <View style={{alignItems:"center"}}>
            <Avatar size={100} rounded source={{uri:  avatarUri }} icon={{ name: 'user', type: 'feather', color: 'rgb(150,150,150)' }} overlayContainerStyle={iconStyle} containerStyle={profileImageStyle} >
              <Avatar.Accessory size={35} onPress={()=>navigation.navigate('Editing Profile')}/>
            </Avatar>
            <Text style={nameAndSurname}>{authStore.userData.userProfileInfo.userName}</Text>
        </View>
          <IconButton
            icon={'list'}
            text={'My active adds'}
            size={25}
            color={'rgb(150,150,150)'}
            onPress={()=>navigation.navigate('My adds')}
            textSize={18}
          />  
          <IconText
            icon={'map-pin'}
            text={authStore.userData.userProfileInfo.address}
            size={25}
            color={'rgb(150,150,150)'}
            textSize={18}
          />
          <IconButton
            icon={'heart'}
            text={'My wish list'}
            size={25}
            color={'rgb(150,150,150)'}
            textSize={18}
          />
      </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,

    backgroundColor:'#f0f8ff'
  },
  iconStyle:{
    borderWidth:1.5,
    borderColor:'black',
    borderRadius:100
  },
  profileImageStyle:{
    marginTop:height*0.17
  },
  nameAndSurname:{
    fontSize:30,
    color:'black',
    fontFamily:'Ubuntu-Medium',

    paddingTop:height*0.01,
  }
})



export default observer(Profile)
