import React, {useContext, useEffect, useState} from "react";
import {SafeAreaView, StyleSheet, View, Dimensions, Text, ActivityIndicator} from 'react-native'
import {Button} from '@rneui/base'
import CustomInputButton from "../../CustomButtons/CustomInput";
import { useForm } from 'react-hook-form'
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { observer } from 'mobx-react-lite'


let { height, width } = Dimensions.get('screen');

const Landing = () => {
    const {container, table, buttonWrapper, inputWrapper, buttonStyle } = styles
    const {control, handleSubmit} = useForm()
    const navigation = useNavigation()
    const { store } = useContext(AuthContext)
    const [error, setError] = useState('')

    const onLogin = (data) => {
        store.login(
            data.email,
            data.password
        )
    }

    useEffect(()=>{
        store.resetState()
    }, [])
    
    useEffect(()=>{
        if (store.isAuth){
            navigation.navigate({ name: 'Tabs' })
        } else {
            setError(store.serverSideError)
        }
    }, [store.isAuth || store.serverSideError])
    
    if (store.isLoading){
        return(
            <View style={{ flex:1, justifyContent: 'center', alignItems:'center' }}>
                <ActivityIndicator size={height * 0.1} color={'blue'}/>
            </View>
        )
      }

    return (
        <SafeAreaView style={container}>
            <View style={table} >
                <View style={inputWrapper}>
                    <CustomInputButton
                        backgroundColor={'#e9e9e9'}
                        borderWidth={2}
                        keyboardType={'default'}
                        name={'email'}
                        control={control}
                        placeholder={'Enter e-mail'}
                        rules={{required:'E-mail is requires'}}
                    />
                    <CustomInputButton
                        backgroundColor={'#e9e9e9'}
                        secureTextEntry={true}
                        borderWidth={2}
                        keyboardType={'default'}
                        name={'password'}
                        control={control}
                        placeholder={'Password'}
                        rules={{required:'Password is required'}}
                    />
                    <Text style={{color:'red', display: !!error ? 'flex' : 'none'}}>{error}</Text>
                </View>
                <View style={buttonWrapper}>
                    <Button
                        title='Log in'
                        buttonStyle={buttonStyle}
                        titleStyle={{fontWeight:'bold', fontSize: 20}} 
                        onPress={handleSubmit(onLogin)}
                    />
                    <Button title='Create accaunt' 
                        buttonStyle={buttonStyle} 
                        titleStyle={{fontWeight:'bold', fontSize: 20}} 
                        onPress={() => navigation.navigate('Email')}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',

        backgroundColor:'#f0f9ff',

        justifyContent: 'center',
        alignItems:'center'
    },
    table:{
        borderWidth:2,
        borderRadius:10,

        width: width * 0.95,
        height: height * 0.5,

        backgroundColor:'lightblue',

        justifyContent:'center',

        gap: height * 0.03,
    },
    inputWrapper:{
        gap: height * 0.0001,
        marginHorizontal: width * 0.09
    },
    buttonWrapper: {
        marginHorizontal: width * 0.17,
        gap: height * 0.02
    },
    buttonStyle:{
        borderRadius:30
    }
    
    

})

export default observer(Landing)