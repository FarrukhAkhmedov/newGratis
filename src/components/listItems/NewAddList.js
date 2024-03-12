import React, {useState} from "react";
import {Dimensions, Text, StyleSheet, TouchableOpacity, View, Image} from 'react-native'
import { AirbnbRating, CheckBox } from "@rneui/base";
import { useNavigation } from '@react-navigation/native'
import { API_URL } from "../context/Api";
import { SharedElement } from "react-navigation-shared-element"
import Animated, {FadeInDown}from "react-native-reanimated";

let {height, width} = Dimensions.get('screen')




const NewAddlist = (props) =>{
    const {source, text, address, date, description, rating, id, index} = props
    const {addressStyle, image, card, title} = styles
    const navigation = useNavigation()
    const [checked, setChecked] = useState(false)
    const sourceUrl = `${API_URL}/postImages/${source}`
    return(
        <Animated.View entering={FadeInDown.delay(index * 20)}>
            <TouchableOpacity style={card} onPress={() => navigation.navigate({name:'Full size add', params:{location:address, date:date, description:description, source:sourceUrl, rating:rating, id:id}})}>
                <SharedElement id={id} >
                    <Image source={{uri: sourceUrl}} style={image} resizeMode='cover'/>
                </SharedElement>
                <View style={{flexDirection:'row',  position:'relative', alignItems:'center'}}>
                    <Text style={title}>{text}</Text>
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
                <Text style={addressStyle}>{address.substring(0, 15)}{address?.length > 15 ? '...' : null}</Text>
            </TouchableOpacity>
        </Animated.View>
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
        width: width * 0.4,
        height: height * 0.2,

        borderRadius:10,

        marginBottom:height*0.013,

        zIndex:0
    },
    addressStyle:{
        color:'grey',
        fontSize:20,
    }
})

export default React.memo(NewAddlist)