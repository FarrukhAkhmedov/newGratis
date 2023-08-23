import React from "react"
import {SafeAreaView, StyleSheet, Dimensions, View, TextInput, FlatList} from 'react-native'
import { Avatar, Button, Text } from "@rneui/base"
import { state } from "../utilites/state"
import Feather from 'react-native-vector-icons/Feather'
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from "@react-navigation/native"

let {height, width} = Dimensions.get('screen')

const EditProfile = () => {
  const {container, iconStyle, upperContainer, bottomContainer, wrapper, textInputContainerStyle, headerStyle, userName}=styles
  const {control, handleSubmit} = useForm()
  const navigation = useNavigation()

  const onEditPressed = (data) =>{
    state.user.name=data.Name?data.Name:state.user.name
    state.user.lastName=data['Last name']?data['Last name']:state.user.lastName
    state.user.address.country=data.Country?data.Country:state.user.address.country
    state.user.address.city=data.City?data.City:state.user.address.city
    state.user.address.street=data.Street?data.Street:state.user.address.street
    state.user.address.house=data.House?data.House:state.user.address.house
    state.user.address.postIndex=data['Post index']?data['Post index']:state.user.address.postIndex
    navigation.navigate('Profile')
    return state;
    
  }

  const EditList = (props) => {  
    const {userName} = styles
    const { placeholder, header } = props
    return(
      <View >
        <View style={wrapper}>
          <Text style={headerStyle}>{header}</Text>
        </View>
        <View style={textInputContainerStyle}>
          <Controller 
            control={control}
            name={header}
            render={({field:{value, onChange, onBlur}})=>(
              <TextInput 
                style={userName}
                placeholder={placeholder}
                onChangeText={onChange} 
                value={value}
                onBlur={onBlur}      
              />
            )}
          />
        </View>
      </View>   
    )
  } 
 
  let DATA=[
    {id:'1',placeholder:state.user.name, title:'Name'},
    {id:'2',placeholder:state.user.lastName,title:'Last name'},
    {id:'3',placeholder:'Country',title:'Country'},
    {id:'4',placeholder:'City',title:'City'},
    {id:'5',placeholder:'Street',title:'Street'},
    {id:'6',placeholder:'House',title:'House'},
    {id:'7',placeholder:'Post index',title:'Post index'}
  ]

  const renderItem=({item}) => (
    <EditList  placeholder={item.placeholder} header={item.title} id={item.id}  />
  )
    return(
        <SafeAreaView style={container}>
          <View style={upperContainer}>
            <Avatar size={90} rounded source={{uri: state.user.avatar}} icon={{name:'user', type:'feather', color:'rgb(150,150,150)'}} overlayContainerStyle={iconStyle} containerStyle={{marginLeft:width*0.03}}  > 
              <Avatar.Accessory size={25}/>
            </Avatar>
            <Text style={[userName,{fontSize:17, fontFamily:'Ubuntu-Bold'}]}>{`${state.user.name}`+`  ${state.user.lastName}`}</Text>
          </View>
          <View style={bottomContainer}>
            <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id}/>
            <Button  title={'Edit profile'} onPress={handleSubmit(onEditPressed)}/>
          </View>
        </SafeAreaView>
    )
}

const styles =  StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#babcbb',
    gap:8
  },
  iconStyle:{
    borderRadius:50,
    borderColor:'black'
    
  },
  upperContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    borderBottomEndRadius:15,
    borderBottomStartRadius:15,
    backgroundColor:'#f0f8ff'
  },
  bottomContainer:{
    flex:4,
    backgroundColor:'#f0f8ff',
    borderTopLeftRadius:17,
    borderTopRightRadius:17,
    paddingTop: height*0.01

  },
  userName:{
    fontSize:13,
    marginLeft:width*0.03,
    fontFamily:'Ubuntu-Medium',
    color:'black'
  },
  textInputContainerStyle:{
    borderWidth:0.5,
    borderRadius:8,
    marginHorizontal:width*0.03,
    marginVertical:height*0.03,
    backgroundColor:'#e9e9e9'
  },
  wrapper:{
    marginHorizontal:width*0.03
  },
  headerStyle:{
    fontSize:15,
    fontFamily:'Ubuntu-Bold',
  }
})


export default EditProfile