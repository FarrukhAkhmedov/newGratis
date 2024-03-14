import React from "react";
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native'
import { Controller } from 'react-hook-form'

let {height, width} = Dimensions.get('screen')

const ProfileInput = (props) => {  
    const {userName, wrapper, headerStyle, textInputContainerStyle} = styles
    const {  header, control, placeholder, name, rules={} } = props
    return(
      <>
        <Controller 
          control={control}
          name={name}
          rules={rules}
          render={({field:{value, onChange, onBlur}, fieldState:{error}})=>(
            <View style={{position:'relative'}}>
              <View style={wrapper}>
                <Text style={[headerStyle, {color: error ? 'red' : 'darkblue' }]}>{header}</Text>
              </View>
              <View style={[textInputContainerStyle, {borderColor: error ? 'red' : 'darkblue'} ]}>
                <TextInput 
                  style={userName}
                  onChangeText={onChange} 
                  value={value}
                  onBlur={onBlur}      
                  placeholder={placeholder}
                />
              </View>
            </View>
          )}
        />
      </>   
    )
}

const styles = StyleSheet.create({
    userName:{
        fontSize:13,
        color:'black',

        marginLeft: width * 0.03
    },
    wrapper:{
        position:'absolute',
        alignItems:'center',
        backgroundColor:'#f0f9ff',
        zIndex:1,
        left: width * 0.06,
        marginTop:11,
        width: width * 0.2
        
    },
    textInputContainerStyle:{
        backgroundColor:'transparent',
        zIndex:0,
        
        borderWidth:2,
        borderRadius:8,
    
        marginHorizontal: width * 0.03,
        marginVertical: height * 0.03
    },
    headerStyle:{
        fontSize:15,
        color:'darkblue',
        fontFamily:'Ubuntu-Bold',
        fontWeight:'700'
    }
})

export default React.memo(ProfileInput)