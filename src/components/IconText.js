import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'


const {height} = Dimensions.get('screen')

const IconText = ({icon, size, text, color, textSize}) =>{
    const { wrapperBottom, bottomButtonColumn, bottomIconColumn, textStyle} = styles
    return(
        <View style={wrapperBottom}>
            <View style={bottomIconColumn}>
                <Feather name={icon} size={size} color={color} />
            </View>
            <View style={bottomButtonColumn}>
                <Text style={[textStyle, {fontSize: textSize, color: !!color ? color :  'rgb(150,150,150)'}]}>{text}</Text>
            </View>   
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
        color: 'rgb(150,150,150)',
        fontWeight:'bold',
        
        alignSelf: 'stretch'
    }
})

export default IconText