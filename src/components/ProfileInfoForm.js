import React, { useState, useContext } from "react"
import { StyleSheet, Dimensions, View, Text, SectionList, Pressable, Keyboard } from 'react-native'
import { Avatar, Button } from "@rneui/base"
import ProfileInput from "./listItems/ProfileInput"
import { ProfileInfoData } from "../Data/DATA"
import BottomSheet from "./Animated/BottomSheet"
import { withProfileInfo } from "../Functions/HigherOrderComponents"
import { AuthContext } from "./context/AuthContext"
import { API_URL } from "./context/Api"

let { height, width } = Dimensions.get('screen')


const ProfileInfoForm = (props) =>{
  const { container, upperContainer, iconStyle, bottomContainer, headerStyle, overlay } = styles
  const { control, onSubmit } = props
  const {store} = useContext(AuthContext)
  const [bottomVisible, setBottomVisible] = useState(false)


  const onAvatarSubmit = () =>{
    setBottomVisible(false)
  }

  const onBottomSheetOpen = () =>{
    Keyboard.dismiss()
    setBottomVisible(!bottomVisible)
  }

  const renderItem = ({item}) =>(
    <ProfileInput name={item.name} control={control} header={item.header} placeholder={item.placeholder} rules={{required:'Field'}}/>
  )

  return(
    <View style={container}>
      <View style={upperContainer}>
        <Avatar
          size={90}
          rounded
          source={{uri: store.image.path ? store.image.path : `${API_URL}/profileImages/${store.userData.userProfileInfo.avatar}`}}
          icon={{ name: 'user', type: 'feather', color: 'rgb(150,150,150)' }}
          overlayContainerStyle={iconStyle}
          containerStyle={{ marginLeft: width * 0.03 }}
        >
            <Avatar.Accessory size={25} onPress={onBottomSheetOpen}/>
        </Avatar>
      </View>
      <View style={bottomContainer}>
        <SectionList 
          sections={ProfileInfoData}
          renderItem={renderItem}
          renderSectionHeader={({section:{title}}) => (
            <Text style={headerStyle}>{title}</Text>
          )}
        />
        <Button 
            title='Continue'
            titleStyle={{fontSize: 20, fontWeight:'bold',}}
            containerStyle={{borderRadius:30, marginHorizontal: width * 0.05, marginVertical: height * 0.03}}
            onPress={onSubmit} 
        />
      </View>
      <Pressable onPress={onAvatarSubmit} style={[overlay, {display: bottomVisible ? 'flex' : 'none'}]}/>
      <BottomSheet
        isVisible={bottomVisible}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    flexDirection: 'column',

    backgroundColor: 'lightblue',

    gap: height * 0.02
  },
  headerStyle:{
    fontSize:20,
    color:'black',
    fontWeight:'900',

    marginVertical:height * 0.01,
    marginStart: width * 0.08,
  },
  userName: {
    fontSize: 13,
    fontWeight:'bold',
    color: 'black',
    marginLeft: width * 0.03
  },
  upperContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: '#f0f9ff',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    paddingTop: height * 0.01
  },
  overlay:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor:'rgba(10, 10, 10, 0.7)',
  },
  iconStyle: {
    borderWidth: 2,
    borderStyle: 'dotted',
    borderRadius: 50,
    borderColor: 'black'
  },
});

export default withProfileInfo(ProfileInfoForm)

  


