import React, {useState} from "react";
import {Dimensions, Text, StyleSheet, Image, TouchableOpacity, View} from 'react-native'
import { AirbnbRating, CheckBox } from "@rneui/base";
import { useNavigation } from '@react-navigation/native'

let {height, width} = Dimensions.get('screen')


const NewAddlist = (props) =>{
    const {source, text, address, date, description, rating} = props
    const {addressStyle, image, card, title} = styles
    const navigation = useNavigation()
    const [checked, setChecked] = useState(false)

    return(
        <TouchableOpacity style={card} onPress={() => navigation.navigate({name:'Full size add', params:{location:address, date:date, description:description, source:source, rating:rating}})}>
            <Image source={{uri:source}} style={image} />
            <View style={{flexDirection:'row',  position:'relative', alignItems:'center'}}>
                <Text style={title}>{text.substring(0, 15)}{text?.length > 15 ? '...' : null}</Text>
                <CheckBox
                    right
                    checked={checked}
                    checkedIcon="heart"
                    uncheckedIcon="heart-o"
                    checkedColor="red"
                    onPress={() => setChecked(!checked)}
                    containerStyle={{position:'absolute', backgroundColor:'#f0f9ff', zIndex:50, marginLeft: width * 0.32}}
                />
            </View>
            <AirbnbRating
                defaultRating={rating}
                count={9}
                size={13}
                showRating={false}
                isDisabled={true}
            />
            <Text style={addressStyle}>{address}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius:10,

        width:width * 0.405,
        height:height * 0.3,

        alignItems:'stretch',

        marginHorizontal:width*0.03,
        marginVertical:height * 0.03,


        position:'relative'

    },
    title:{
        fontWeight:'bold',
        fontSize:20,
        color:'black',
        zIndex:1

        
    },
    image:{
        width:width*0.4,
        height:height*0.2,

        borderRadius:10,

        marginBottom:height*0.013,

        zIndex:0
    },
    addressStyle:{
        color:'grey',
        fontSize:20,

        
    }
})

export default NewAddlist