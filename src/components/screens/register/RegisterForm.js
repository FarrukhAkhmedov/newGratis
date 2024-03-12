import React, { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import ProfileInfoForm from "../../ProfileInfoForm";
import { observer } from "mobx-react-lite";

const RegisterForm = () =>{
    const { authStore } = useContext(AuthContext)
    const { control, setValue, handleSubmit } = useForm( 
        {
            defaultValues: {
                email:'',
                password:'',
            }
        })


    const navigation = useNavigation();
    const route = useRoute()
    const [error, setError] = useState('')
    
    useEffect(()=>{
        authStore.resetState()
    }, [])
    
    useEffect(()=>{
        setValue('email', route.params?.email)
        setValue('password', route.params?.password)
    }, [route.params])


    useEffect(()=>{
        if (authStore.isAuth) {
            navigation.navigate('Tabs', {screen: 'Home'});
        } else {
            setError(authStore.serverSideError)
        }
    }, [ authStore.serverSideError || authStore.isAuth])

    const onRegister = (data) => {
        const address = `${data.country}, ${data.city}, ${data.street}`
        authStore.addInfo(
            data.userName,
            address,
            data.email,
            data.password,
        )

        
    }
    return(
        <ProfileInfoForm
            onSubmit={handleSubmit(onRegister)}
            control={control}
            error={error}
        />
    )
}

export default observer(RegisterForm)