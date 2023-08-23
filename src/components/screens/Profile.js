import React from "react";
import {SafeAreaView, StyleSheet, Text, View, Dimensions, Pressable} from 'react-native'
import { Avatar } from "@rneui/themed";
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import { state } from "../utilites/state";
import { useNavigation } from "@react-navigation/native";

let {height} = Dimensions.get('screen')

const Profile = () =>{
  const navigation = useNavigation()
  
  const {container, profileImageStyle, nameAndSurname, myAds, iconStyle, wrapperBottom, bottomButtonColumn, bottomIconColumn} = styles
    return(
        <SafeAreaView style={container}>
          <View style={{alignItems:"center"}}>
              <Avatar size={100} source={{uri: state.user.avatar}}  rounded icon={{ name: 'user', type: 'feather', color: 'rgb(150,150,150)' }} overlayContainerStyle={iconStyle} containerStyle={profileImageStyle} >
                <Avatar.Accessory size={35} onPress={()=>navigation.navigate('Editing Profile')}/>
              </Avatar>
              <Text style={nameAndSurname}>{state.user.name} {state.user.lastName}</Text>
          </View>  
            <View style={wrapperBottom}>
              <View style={bottomIconColumn}>
                <Feather name='upload' size={25} color={'rgb(150,150,150)'} />
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
                <Text style={myAds}>{state.user.address.country} {state.user.address.city} {state.user.address.street} {state.user.address.house} {state.user.address.postIndex}</Text>
              </View>   
            </View>
            <View style={wrapperBottom}>
              <View style={bottomIconColumn}>
                <Entypo name='calendar' size={25} color={'rgb(150,150,150)'} />
              </View>
              <View style={bottomButtonColumn}>
                <Text style={myAds}>On Gratis since</Text>
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

    paddingTop:15,
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
    marginVertical:10,
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
