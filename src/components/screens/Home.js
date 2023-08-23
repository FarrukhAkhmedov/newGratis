import React from 'react'
import {SafeAreaView, Text, StyleSheet} from 'react-native'
import Landing from '../auth/Landing'

const Home = () =>{
    const {container} = styles
    return(
        <SafeAreaView style={container}>
            <Text>Home</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,

        backgroundColor:'#f0f8ff'
    }
})

export default Home