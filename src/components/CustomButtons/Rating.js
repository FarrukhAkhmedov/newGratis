import React from "react";
import {StyleSheet, View, } from 'react-native'
import { AirbnbRating } from '@rneui/themed';
import { Controller } from "react-hook-form";

const Rating = ({control, name, reviews }) =>{
    return(
        <View>
            <Controller 
                name={name}
                control={control}
                render={({field:{onChange}})=>(
                    <AirbnbRating
                    count={9}
                    defaultRating={1}
                    size={20}
                    reviews={reviews}
                    onFinishRating={onChange}
                    reviewSize={17}
                    reviewColor="grey"
                    />
                )}
            />
            
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1
        }
    }
)

export default Rating