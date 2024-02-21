import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import {View, StyleSheet, Text, Dimensions} from 'react-native'
import  {MultipleSelectList} from 'react-native-dropdown-select-list'

let {height, width} = Dimensions.get('screen')

const CustomMultipleSelect = ({name, control, data, header, placeholder, rules = {} }) =>{
    const {boxStyles, dropdownItemStyles, dropdownStyles, dropListContainer, headerStyle} = styles
    const [state, setState] = useState('')    
    return(
        <>
            <Text style={headerStyle}>{header}</Text>
            <View style={dropListContainer}>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={ ({ field: {onChange}, fieldState: {error} } )=>(
                        <>
                            <MultipleSelectList
                                data={data}
                                save={'value'}
                                onSelect={() => onChange(state)}
                                setSelected={setState}
                                boxStyles={[boxStyles, { borderColor: error ? 'red' : 'black'}]}
                                dropdownTextStyles={dropdownItemStyles}
                                dropdownStyles={dropdownStyles}
                                placeholder={placeholder}
                            />
                            {error && (
                                <Text style={{color:'red', alignSelf:'stretch'}}>{ error.message || 'Error' }</Text>
                            )}
                        </>
                    )}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    boxStyles:{
        borderWidth:2,
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
        fontSize:25,
        color:'black',
        fontWeight:'bold',
        paddingBottom: height * 0.01,
        paddingTop: height * 0.03
    }
    
})

export default CustomMultipleSelect