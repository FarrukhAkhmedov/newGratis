import React from 'react'
import { Controller } from 'react-hook-form'
import {View, StyleSheet, Text, Dimensions} from 'react-native'
import  {SelectList} from 'react-native-dropdown-select-list'

let {height, width} = Dimensions.get('screen')

const CustomDropList = ({name, control, data, header, placeholder, rules = {} }) =>{
    const {boxStyles, dropdownItemStyles, dropdownStyles, dropListContainer, headerStyle} = styles
    return(
        <View>
            <Text style={headerStyle}>{header}</Text>
            <View style={dropListContainer}>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({field:{onChange, value}, fieldState:{error}})=>(
                        <>
                            <SelectList
                                data={data}
                                save={value}
                                setSelected={onChange}
                                boxStyles={[boxStyles,{borderColor:error?'red':'black'}]}
                                dropdownTextStyles={dropdownItemStyles}
                                dropdownStyles={dropdownStyles}
                                placeholder={placeholder}
                            />
                            {error && (
                                <Text style={{color:'red', alignSelf:'stretch'}}>{error.message || 'Error'}</Text>
                            )}
                        </>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    boxStyles:{
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'#e9e9e9'
    },
    dropdownItemStyles:{
        color:'black'
    },
    dropdownStyles:{
        borderColor:'black',
        backgroundColor:'#e9e9e9'
    },
    dropListContainer:{
        marginHorizontal:width*0.01,
        marginVertical:height*0.01,
    },
    headerStyle:{
        fontSize:15,
        color:'black',
        marginHorizontal:height*0.01,
        marginVertical:height*0.005,
    }
    
})

export default CustomDropList