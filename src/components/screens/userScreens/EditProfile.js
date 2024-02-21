import React, { useContext, } from "react"
import {View, StyleSheet} from 'react-native'
import { useForm } from 'react-hook-form'
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../../context/AuthContext"
import ProfileInfoForm from "../../ProfileInfoForm"
import { observer } from "mobx-react-lite"

const EditProfile = () => {
  const {container} = styles
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const {store} = useContext(AuthContext)
  
  const onEditProfile = (data) => {
    const address = `${data.country}, ${data.city}, ${data.street}`
    store.editProfileInfo(
      data.userName,
      address
    )
    navigation.navigate('Profile')
  };


  return (
    <View style={container}>
      <ProfileInfoForm
        control={control}
        onSubmit={handleSubmit(onEditProfile)}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default observer(EditProfile)