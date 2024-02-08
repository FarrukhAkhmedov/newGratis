import React from "react";
import {View, SafeAreaView, Dimensions, Image, ScrollView, StyleSheet, Text} from 'react-native'
import { AirbnbRating } from "@rneui/base";
import { useRoute } from "@react-navigation/native";

let {width, height} = Dimensions.get('screen')

const FullSizeAdd = () => {
    const {container, description, imageStyle, title} = style
    const route = useRoute()
    
    return(
        <SafeAreaView style={container}> 
            <ScrollView>
                <Image style={imageStyle} source={{uri:route.params.source}}/>
                <AirbnbRating
                    count={9}
                    defaultRating={route.params.rating}
                    size={20}
                    isDisabled={true}
                    reviews={[
                        'Needs a serious overhaul',
                        "Got major defects, that affect performance",
                        'Needs a small repair ',
                        "Got major defects, that don't affect performance" ,
                        'Usable',
                        'Got minor visible deffects ',
                        'Got minor barely visible defects', 
                        'Was used only once', 
                        'Was never used!' 
                    ]}
                    reviewSize={17}
                    reviewColor="grey"
                />
                <Text style={title}>Description</Text>
                <View style={description}>
                    <Text style={{fontSize:18, color:'black', marginVertical:5}}>{route.params.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
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
    imageStyle:{
        borderRadius:10,

        width:width*0.9,
        height:height*0.4,
        
    },
    description:{

        backgroundColor:'#e9e9e9',

        borderRadius:7,

        paddingLeft:width*0.04
    },
      title:{

        fontSize:25,
        color:'black',
        fontWeight:'bold',
        
        alignSelf:'center',
        
        marginVertical:height*0.02
      }
    })

export default FullSizeAdd