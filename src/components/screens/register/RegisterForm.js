import React, { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import ProfileInfoForm from "../ProfileInfoForm";

const RegisterForm = () =>{
    const { userState, addInfo} = useContext(AuthContext)
    const { control, setValue, handleSubmit } = useForm( 
        {
            defaultValues:{
                email:'',
                password:''
            }
        })


    const navigation = useNavigation();
    const route = useRoute()
    const [error, setError] = useState('')
    
    useEffect(()=>{
        setValue('email', route.params?.email)
        setValue('password', route.params?.password)
    }, [route.params])

    useEffect(()=>{
        if (userState.isAuth) {
        navigation.navigate('Home');
        } 
        setError(userState.serverSideError)
    }, [ userState.serverSideError ])

    const onRegister = (data) => {
        const address = `${data.country}, ${data.city}, ${data.street}`
        addInfo({
        userName: data.userName,
        address,
        email: data.email,
        password: data.password
        })

        navigation.navigate('Tabs')
        
    }
    return(
        <ProfileInfoForm
            onSubmit={handleSubmit(onRegister)}
            control={control}
            error={error}
        />
    )
}

export default RegisterForm