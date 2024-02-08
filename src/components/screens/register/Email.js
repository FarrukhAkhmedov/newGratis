import React, { useContext, useEffect, useState } from "react";
import {SafeAreaView, StyleSheet, View, Dimensions, Text, ActivityIndicator} from 'react-native'
import {Button} from '@rneui/base'
import CustomInputButton from "../../CustomButtons/CustomInput";
import { useForm } from 'react-hook-form'
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


let { height, width } = Dimensions.get('screen');

const Email = () => {
    const {container, table, buttonWrapper, inputWrapper, buttonStyle } = styles
    const {control, handleSubmit} = useForm()
    const navigation = useNavigation()
    const [error, setError] = useState()
    const [emailData, setEmailData] = useState(null)
    const {register, userState} = useContext(AuthContext)
    
    useEffect(()=>{
        setError('')
    }, [])

    useEffect(()=>{
        setError(userState.serverSideError)
    }, [userState.serverSideError])

    useEffect(() =>{
        if (emailData){
            navigation.navigate({name: 'Register', params: {email: emailData.email, password: emailData.password}})
        }
    }, [emailData])

    
    const onEmail = (data) => {
        console.log(data);
        register({
            email: data?.email,
        })
        const isValid = validation(data)
        if (isValid){
            setEmailData(data)
        }
    }
    
    const validation = (data) => {
        const regExp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/
        if(data.repeatPassword === data.password){
            if (regExp.test(data.password)){
                return userState.isEmailValid
            } else {
                setError('Password must contain minimum 6 letters, at least one capital letter and number ')
                return false
            }
        } else {
            setError('Password has been repeeted incorrectly')
            return false 
        }
    }
    
    
    


    if (userState.isLoading){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
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
                        placeholder={'E-mail'}
                        rules={{required:'E-mail is required'}}
                    />
                    <CustomInputButton
                        backgroundColor={'#e9e9e9'}
                        borderWidth={2}
                        keyboardType={'default'}
                        name={'password'}
                        control={control}
                        placeholder={'Password'}
                        rules={{required:'Password is required'}}
                    />
                    <CustomInputButton
                        backgroundColor={'#e9e9e9'}
                        borderWidth={2}
                        keyboardType={'default'}
                        name={'repeatPassword'}
                        control={control}
                        placeholder={'Repeat ypur password'}
                        rules={{required:'Repeat password'}}
                    />
                    <Text style={{color:'red', display: !!error ? 'flex' : 'none'}}>{error}</Text>
                </View>
                <View style={buttonWrapper}>
                    <Button title='Continue' 
                        buttonStyle={buttonStyle} 
                        titleStyle={{fontWeight:'bold', fontSize: 20}} 
                        onPress={handleSubmit(onEmail)}
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
        gap: height * 0.01,
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

export default Email