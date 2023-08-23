import React from "react"; 
import { Controller } from "react-hook-form";
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

let {width} = Dimensions.get('screen')

const UploadPhotoButton = ({rules = {}, control }) =>{
  const {uploadPhotoWrapper} = styles
  return(
    <View>
      <Controller
        name="Photo"
        control={control}
        rules={rules}
        render={({field:{}, fieldState:{error}})=>(
          <TouchableOpacity style={[uploadPhotoWrapper, {borderColor:error? 'red':'black'}]}>
            <MaterialIcons name='add-a-photo' size={30}/>
          </TouchableOpacity>
        )}/>
    </View>
  )
}


const styles = StyleSheet.create(
    {
        uploadPhotoWrapper:{
            backgroundColor:'#e9e9e9',
            borderRadius:10,
            borderColor:'black',
            borderWidth:1,

            justifyContent:'center',
            alignItems:'center',

            width:width*0.9,
            height:250,
        }
    }
)

export default UploadPhotoButton
