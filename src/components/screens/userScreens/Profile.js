import React,{useContext} from "react";
import {SafeAreaView, StyleSheet, Text, View, Dimensions, Pressable} from 'react-native'
import { Avatar } from "@rneui/themed";
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

let {height} = Dimensions.get('screen')

const Profile = () =>{
  const {container, profileImageStyle, nameAndSurname, myAds, iconStyle, wrapperBottom, bottomButtonColumn, bottomIconColumn} = styles
  const navigation = useNavigation()
  const {userState} = useContext(AuthContext)
  console.log(userState.userData);
    return(
        <SafeAreaView style={container}>
          <View style={{alignItems:"center"}}>
              <Avatar size={100} rounded icon={{ name: 'user', type: 'feather', color: 'rgb(150,150,150)' }} overlayContainerStyle={iconStyle} containerStyle={profileImageStyle} >
                <Avatar.Accessory size={35} onPress={()=>navigation.navigate('Editing Profile')}/>
              </Avatar>
              <Text style={nameAndSurname}>{userState.userData.userProfileInfo.userName}</Text>
          </View>  
            <View style={wrapperBottom}>
              <View style={bottomIconColumn}>
                <Feather name='list' size={25} color={'rgb(150,150,150)'} />
              </View>
              <Pressable onPress={()=>navigation.navigate('My adds')} style={bottomButtonColumn}>
                <Text style={myAds}>My active adds</Text>
              </Pressable>
            </View>
            <View style={wrapperBottom}>
              <View style={bottomIconColumn}>
                <Feather name='map-pin' size={25} color={'rgb(150,150,150)'} />
              </View>
              <View style={bottomButtonColumn}>
                <Text style={myAds}>{userState.userData.userProfileInfo.address}</Text>
              </View>   
            </View>
            <View style={wrapperBottom}>
              <View style={bottomIconColumn}>
                <Entypo name='calendar' size={25} color={'rgb(150,150,150)'} />
              </View>
              <View style={bottomButtonColumn}>
                <Text style={myAds}>On Gratis since{userState.userData.userProfileInfo.since}</Text>
              </View>   
            </View>
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
  },
  myAds:{
    fontSize:18,
    color:'rgb(150,150,150)',
    fontFamily: 'Ubuntu-Medium',

    alignSelf:'stretch'
  }, 
  wrapperBottom:{
    flexDirection:'row',

    top:height*0.03,
    justifyContent:'space-evenly',
    marginVertical:height*0.02,
    alignItems:'center'
  },
  bottomIconColumn:{
    flex:1,

    flexDirection:'column',
    alignItems:'center'
  },
  bottomButtonColumn:{
    flex:3,
    
    flexDirection:'column',
    alignItems:'stretch'
  }

})



export default Profile
