import React from 'react'
import { Controller } from 'react-hook-form'
import {View, StyleSheet, Text, Dimensions} from 'react-native'
import  {SelectList} from 'react-native-dropdown-select-list'

let {height, width} = Dimensions.get('screen')

const withCustomDropList = (WrappedComponent) =>{
    return ({name, control, data, header, placeholder, rules = {}, borderWidth, backgroundColor }) =>{
        return (
            <WrappedComponent
                name={name}
                control={control}
                data={data}
                header={header}
                placeholder={placeholder}
                rules={rules}
                borderWidth = {borderWidth}
                backgroundColor = {backgroundColor}
            />
        )

    }
}

const CustomDropList = ({
    name,
    control,
    data ,
    header,
    placeholder,
    rules = {},
    borderWidth,
    backgroundColor
}) => {
    const { dropdownItemStyles, dropListContainer, headerStyle} = styles
    return(
        <>
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
                                boxStyles={{borderColor:error ? 'red' : 'black', borderWidth: borderWidth, borderColor:'black', backgroundColor: backgroundColor}}
                                dropdownTextStyles={dropdownItemStyles}
                                dropdownStyles={{borderColor:'black', backgroundColor: backgroundColor}}
                                placeholder={placeholder}
                            />
                            {error && (
                                <Text style={{color:'red', alignSelf:'stretch'}}>{error.message || 'Error'}</Text>
                            )}
                        </>
                    )}
                />
            </View>
        </>
    )
}





const styles = StyleSheet.create({
    dropdownItemStyles:{
        color:'black'
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

export default withCustomDropList(CustomDropList)