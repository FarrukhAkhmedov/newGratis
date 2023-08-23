import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Dimensions, Text, TouchableOpacity} from 'react-native'
import { Controller } from 'react-hook-form'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';

let {width, height} = Dimensions.get('screen')

const CustomInputButton = ({control, placeholder, name, header, map = {}, rules = {} }) =>{
    const {textInputContainerStyle, CustomInputButton, headerStyle} = styles
    const navigation = useNavigation()

    return(
        <View>
            <Text style={headerStyle}>{header}</Text>
            <Controller
                name={name}
                rules={rules}
                control={control}
                render={({field: {value, onChange, onBlur}, fieldState:{error}}) =>(
                    <>
                        <View style={[textInputContainerStyle,{borderColor: error?'red':'black'}]}>
                            <TextInput 
                                multiline
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                placeholder={placeholder}
                                style={CustomInputButton}
                            />
                            <TouchableOpacity 
                                 onPress={()=>{navigation.navigate("MyLocationMarker")}} style={{display: map==true?'flex':'none', justifyContent:'center',alignItems:'center'}}
                            >
                                <Feather name='map-pin' size={20}/>
                            </TouchableOpacity>
                        </View>
                        {error && (
                        <Text style={{color:'red', alignSelf:'stretch'}}>{error.message || 'Error'}</Text>
                        )}
                    </>
                    
                )}/>

        </View>
    )
}
  
const styles = StyleSheet.create(
    {
        textInputContainerStyle:{

            flexDirection:'row',
            backgroundColor:'#e9e9e9',

            borderWidth:1,
            borderRadius:8,

            marginHorizontal:width*0.01,
            marginVertical:height*0.01, 
            gap:width*0.57
        },
        CustomInputButton:{

            fontSize:13,
            color:'black',

            marginLeft:width*0.03,
        },
        headerStyle:{
            
            fontSize:15,
            color:'black',

            marginHorizontal:height*0.01,
            marginVertical:height*0.005
        }
    }
)

export default CustomInputButton