import React from "react";
import { AirbnbRating } from '@rneui/themed';
import { Controller } from "react-hook-form";

const Rating = ({control, name, reviews }) =>{
    return(
        <>
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
        </>
    )
}

export default Rating