import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";

const MyAdds = () =>{
    const {container} = styles
    return(
        <SafeAreaView style={container}>
            <Text>MyAdds</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,

        backgroundColor:'#f0f8ff'
    }
})

export default MyAdds