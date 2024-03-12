import React,{useContext} from "react";
import {Dimensions, Text, StyleSheet, TouchableOpacity, Image, View} from 'react-native'
import { AirbnbRating } from "@rneui/base";
import { useNavigation } from '@react-navigation/native'
import { API_URL } from "../context/Api";
import { SharedElement } from "react-navigation-shared-element"
import Animated, {FadeInDown, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming}from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from "../context/AuthContext";


let {height, width} = Dimensions.get('window')




const MyAddList = (props) =>{
    const {source, text, address, date, description, rating, post_id, index} = props
    const {addressStyle, image, card, title, imageContainer, iconStyle, itemContainer} = styles
    const navigation = useNavigation()
    const {postStore} = useContext(AuthContext)

    const onSwipeFinished = (id) =>{
        postStore.deletePost(id)
    }

    const sourceUrl = `${API_URL}/postImages/${source}`

    const TRANSLATE_X_THRESHOLD = - width * 0.3;

    const translateX = useSharedValue(0)
    const itemHeight = useSharedValue( height * 0.43)
    const opacity = useSharedValue(1)

    const panGesture = Gesture.Pan().onUpdate((event)=>{
        translateX.value = event.translationX 
        if(translateX.value > 100){
            translateX.value = 0
        }
    }).onEnd(() =>{
        const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD

        if(shouldBeDismissed){
            translateX.value = withTiming(-width)
            itemHeight.value = withTiming(0)
            opacity.value = withTiming(0, { duration: 100 },
                (isFinished) =>{
                    if (isFinished){
                        runOnJS(onSwipeFinished)(post_id)
                    }
                })
        } else {
            translateX.value = withSpring(0, {
                duration:200
            })
        }
    })
    
    
    const rIconContainer = useAnimatedStyle(()=>{
        const opacity = withTiming(
            translateX.value >= TRANSLATE_X_THRESHOLD ? 0 : 1
        )
        return{
            opacity
        }
    })

    const rItemContainer = useAnimatedStyle(()=>{
        return{
            height: itemHeight.value,
            opacity: opacity.value
        }
    })
    
    const rAddStyle = useAnimatedStyle(() =>{
        return {
            transform: [{translateX: translateX.value}],
        }
    })

    return(
        <Animated.View style={[itemContainer, rItemContainer]}>
            <Animated.View style={[iconStyle, rIconContainer]}>
                <Feather name="trash-2" color='red' size={30}/>
            </Animated.View>
                <Animated.View entering={FadeInDown.delay(index * 20)} style={[card, rAddStyle]}>
                    <TouchableOpacity  onPress={() => navigation.navigate({name:'Full size add', params:{location:address, date:date, description:description, source:sourceUrl, rating:rating, id: post_id}})}>
                        <SharedElement id={post_id} style={imageContainer} >
                            <Image source={{uri: sourceUrl}} style={image} resizeMode='cover'/>
                        </SharedElement>
                        <GestureDetector gesture={panGesture}>
                            <View>
                                <Text style={title}>{text}</Text>
                                <AirbnbRating
                                    defaultRating={rating}
                                    count={9}
                                    size={18}
                                    showRating={false}
                                    isDisabled={true}
                                    />
                                <Text style={addressStyle}>{address.substring(0, 15)}{address?.length > 15 ? '...' : null}</Text>
                            </View>
                        </GestureDetector>
                    </TouchableOpacity>
                </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    itemContainer:{
        flex: 4, flexDirection:"row",
        justifyContent:'flex-end', 
        alignItems:'center'
    },
    card:{        
        marginVertical:height * 0.01,
        backgroundColor:'white',
    },
    title:{
        fontWeight:'bold',
        fontSize:20,
        color:'black',
        textAlign:'center',
    },
    imageContainer:{
        backgroundColor:'lightgrey', 

        borderWidth:1, 
        borderColor:'darkgrey',

        paddingHorizontal: width * 0.15, 
        paddingVertical: height * 0.01, 

        marginBottom: height * 0.005
    },
    image:{
        width: width * 0.7,
        height: height * 0.3,

        paddingTop: height * 0.06,
        borderRadius:10,

    },
    addressStyle:{
        color:'grey',
        fontSize:20,
        textAlign:'center'
    },
    iconStyle:{
        height: height * 0.15,
        width: height * 0.1,
        position:'absolute',
        justifyContent:'center'
    }
})

export default React.memo(MyAddList)