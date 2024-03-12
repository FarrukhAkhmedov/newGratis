import React from "react";
import {View, ScrollView, StyleSheet, Text, useWindowDimensions, Image, Dimensions} from 'react-native'
import { AirbnbRating } from "@rneui/base";
import { useRoute } from "@react-navigation/native";
import Animated, { FadeInDown } from 'react-native-reanimated'
import { ratingData } from "../../../Data/DATA";
import { SharedElement } from "react-navigation-shared-element";

const {height, width} = Dimensions.get('screen')

const FullSizeAdd = () => {
    const {container, title, description} = style
    const route = useRoute()
    return(
        <View style={container}> 
            <ScrollView>
                <SharedElement id={route.params.id}>
                    <Image style={{borderRadius:10, width: width, height: width }} resizeMode='cover' source={{uri:route.params.source}}/>
                </SharedElement>
                <Animated.View entering={FadeInDown.delay(400)}>
                    <AirbnbRating
                        count={9}
                        defaultRating={route.params.rating}
                        size={20}
                        isDisabled={true}
                        reviews={ratingData}
                        reviewSize={17}
                        reviewColor="grey"
                    />
                </Animated.View>
                <Animated.Text entering={FadeInDown.delay(800)} style={[title, { marginVertical: height * 0.02, fontWeight:'bold' } ]}>Description</Animated.Text>
                <Animated.View entering={FadeInDown.delay(900)} style={{alignItems: 'center', backgroundColor: '#e9e9e9', borderRadius:20}}>
                    <Text style={description}>{route.params.description}</Text>
                    <Text entering={FadeInDown.delay(600)} style={ [description, {  fontWeight:'900', alignSelf:'flex-start'}]}> located at {route.params.location} </Text>
                </Animated.View>
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create(
    {
    container:{

        flex:1,
        flexDirection:'column',

        backgroundColor:'#f0f8ff',

        alignItems:"center",
    },
    title:{

        fontSize:25,
        color:'black',
        
        alignSelf:'center',
        
    },
    description:{
        fontSize:18,
        color:'black',
        marginHorizontal: width * 0.04,
        paddingBottom: height * 0.02
    }
    })

export default FullSizeAdd