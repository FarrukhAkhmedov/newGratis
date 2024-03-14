import React from 'react';
import {View, StyleSheet, TextInput, Dimensions, Text, TouchableOpacity} from 'react-native'
import { Controller } from 'react-hook-form'
import Feather from 'react-native-vector-icons/Feather'
import { withCustomInputButton } from '../../Functions/HigherOrderComponents'
let {width, height} = Dimensions.get('screen')


const CustomInputButton = ({
    control,
    placeholder,
    name,
    header,
    map = {},
    rules = {},
    backgroundColor,
    keyboardType = {},
    secureTextEntry,
    navigation,
    borderWidth,
    multiline
}) => {
    const {textInputContainerStyle, CustomInputButton, headerStyle} = styles
    return (
        <>
            <Text style={[headerStyle, {display: !!header ? 'flex': 'none'}]}>{header}</Text> 
            <Controller
                name={name}
                rules={rules}
                control={control}
                render={({field: {value, onChange, onBlur}, fieldState:{error}}) =>(
                    <>
                        <View style={[textInputContainerStyle,{borderColor: error ? 'red' : 'black', backgroundColor: backgroundColor, borderWidth: borderWidth}]}>
                            <TextInput
                                multiline={multiline}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                placeholder={placeholder}
                                style={CustomInputButton}
                                keyboardType={keyboardType}
                                secureTextEntry={secureTextEntry}
                            />
                            <TouchableOpacity 
                                onPress={()=>{navigation.navigate("MyLocationMarker")}} style={{display: map==true?'flex':'none', justifyContent:'center'}}
                            >
                                <Feather name='map-pin' size={20}/>
                            </TouchableOpacity>
                        </View>
                        {error && (
                        <Text style={{color:'red', alignSelf:'stretch'}}>{error.message || 'Error'}</Text>
                        )}
                    </>
                    
            )}/>

        </>
    )
}
  
const styles = StyleSheet.create(
    {
        textInputContainerStyle:{

            flexDirection:'row',

            borderRadius:8,

            marginHorizontal:width*0.01,
            marginVertical:height*0.01, 
        },
        CustomInputButton:{
            fontSize:13,
            width: width * 0.78,
            color:'black',

            marginLeft:width * 0.03,
        },
        headerStyle:{
            fontSize:25,
            color:'black',
            fontWeight:'bold',

            paddingBottom: height * 0.01,
            paddingTop: height * 0.03
        }
    }
)

export default React.memo(withCustomInputButton(CustomInputButton))