import React, { useContext } from "react"; 
import { Controller } from "react-hook-form";
import {View, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from "../context/AuthContext";

let {width, height} = Dimensions.get('window')

const UploadPhotoButton = ({rules = {}, control, image }) => {
  const {uploadPhotoWrapper, imageStyle} = styles
  const {userStore} = useContext(AuthContext)

  return(
    <View>
      <Controller
        name="Photo"
        control={control}
        rules={rules}
        render={({field: {}, fieldState: {error} })=>(
          <TouchableOpacity onPress={ () => userStore.bottomSheetOpen() } style={[ uploadPhotoWrapper, { borderColor: error ? 'red' : 'black'}]}>
            <Image source={{ uri: image}} style={imageStyle}/> 
            <MaterialIcons name='add-a-photo' size={30} style={{display: image ? 'none': 'flex'}}/>
          </TouchableOpacity>
        )}/>
    </View>
  )
}


const styles = StyleSheet.create(
    {
      uploadPhotoWrapper:{
        backgroundColor:'#e9e9e9',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth:2,

        justifyContent:'center',
        alignItems:'center',

        width: width * 0.9,
        height: height * 0.4,
      },
      imageStyle:{
        width: width * 0.9,
        height: height * 0.4, 
        position:'absolute', 
        borderRadius: 10
      }
    }
)

export default UploadPhotoButton
