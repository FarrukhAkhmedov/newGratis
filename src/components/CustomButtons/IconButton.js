import React from 'react'
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'


const { height } = Dimensions.get('screen')

const IconButton = ({icon, size, text, onPress, color, textSize}) =>{
    const { wrapperBottom, bottomButtonColumn, bottomIconColumn, textStyle} = styles
    return(
        <View style={wrapperBottom}>
            <View style={bottomIconColumn}>
                <Feather name={icon} size={size} color={color} />
            </View>
            <Pressable onPress={onPress} style={bottomButtonColumn}>
                <Text style={[textStyle, {fontSize: textSize, color: !!color ? color :  'rgb(150,150,150)'}]}>{text}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapperBottom:{
        flexDirection:'row',
    
        top: height * 0.03,
        justifyContent: 'space-evenly',
        marginVertical: height * 0.02,
        alignItems: 'center'
    },

    bottomIconColumn:{
        flex: 1,

        flexDirection: 'column',
        alignItems: 'center'
    },

    bottomButtonColumn:{
        flex: 3,
        
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    
    textStyle:{
        fontWeight:'bold',

        alignSelf: 'stretch'
    }
})

export default IconButton