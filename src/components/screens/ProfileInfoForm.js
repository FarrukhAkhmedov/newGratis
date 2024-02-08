import React from "react"
import { SafeAreaView, StyleSheet, Dimensions, View, Text, SectionList } from 'react-native'
import { Avatar, Button } from "@rneui/base"
import ProfileInput from "./listItems/ProfileInput"
import { ProfileInfoData } from "../../Data/SectionListData"

let { height, width } = Dimensions.get('screen')

const withProfileInfo = (WrappedComponent) =>{
  return({onSubmit, error, control}) => {
    return(
      <WrappedComponent
        control = {control}
        error = {error}
        onSubmit = {onSubmit}
      />
    )
  }
}

const ProfileInfoForm = (props) =>{
  const { container, iconStyle, upperContainer, bottomContainer, headerStyle } = styles
  const { control, error, onSubmit } = props

  const renderItem = ({item}) =>(
    <ProfileInput name={item.name} control={control} header={item.header} placeholder={item.placeholder} />
  )

  return(
    <SafeAreaView style={container}>
        <View style={upperContainer}>
            <Avatar
              size={90}
              rounded
              icon={{ name: 'user', type: 'feather', color: 'rgb(150,150,150)' }}
              overlayContainerStyle={iconStyle}
              containerStyle={{ marginLeft: width * 0.03 }}
            >
              <Avatar.Accessory size={25} />
            </Avatar>
          <Text style={{color:'red', display: !!error ? 'flex' : 'none'}}>{error}</Text>
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
    </SafeAreaView>
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
    fontFamily: 'Ubuntu-Medium',
    fontWeight:'bold',
    color: 'black',
    marginLeft: width * 0.03
  },
  iconStyle: {
    borderWidth:2,
    borderStyle:'dotted',
    borderRadius: 50,
    borderColor: 'black'
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
  }
});

export default withProfileInfo(ProfileInfoForm)

  


