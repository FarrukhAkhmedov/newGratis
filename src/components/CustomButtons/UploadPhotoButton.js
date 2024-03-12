import React, { useContext } from "react"; 
import { Controller } from "react-hook-form";
import {View, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from "../context/AuthContext";

let {width, height} = Dimensions.get('window')

const UploadPhotoButton = ({rules = {}, control }) => {
  const {uploadPhotoWrapper, imageStyle} = styles
  const {postStore} = useContext(AuthContext)

  return(
    <View>
      <Controller
        name="photo"
        control={control}
        rules={rules}
        render={({field: {value}, fieldState: {error} })=>(
          <TouchableOpacity onPress={ () => postStore.bottomSheetOpen()} style={[ uploadPhotoWrapper, { borderColor: error ? 'red' : 'black'}]}>
            <Image source={{ uri: value.path}} style={imageStyle}/> 
            <MaterialIcons name='add-a-photo' size={30} style={{display: value.path ? 'none': 'flex'}}/>
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
