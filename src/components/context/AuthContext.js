import React, {createContext, useReducer} from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { INITIAL_STATE, postReducer } from "./postReducer"
import $api, { API_URL } from "./Api"
import axios from "axios"
import EncryptedStorage from 'react-native-encrypted-storage'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [userState, dispatch] = useReducer(postReducer, INITIAL_STATE)

    const register = async ({email}) => {
        dispatch({ type: 'FETCH_START' })
        try{
            const res = await $api.post(`/register`, {
                email
            })
            dispatch({ type: 'FETCH_IS_EMAIL_VALID'}) 
        } catch(error){
            console.error(error)
            dispatch({ type: 'FETCH_ERROR', payload: error.response.data.message})
        }
           
    }

    const addInfo = async ({userName, address, email, password}) =>{
        dispatch({ type: 'FETCH_START' })
        try{
            const res = await  $api.post(`/addInfo`, {
                userName,
                address,
                email,
                password
            })

            console.log(res.data);
            await AsyncStorage.setItem( 'userAccessToken', res.data.accessToken)
            await EncryptedStorage.setItem('userRefreshToken', res.data.refreshToken)
            dispatch({ type: 'FETCH_SUCCESS', payload: {...res.data.userInfo} })
        } catch(error){
            dispatch({type: 'FETCH_ERROR', payload: error.response.data.message})
            console.error(error);
        }
        
    }

    const login = async ({email, password}) => {
        dispatch({ type: 'FETCH_START'})
       
        try{
            const res = await $api.post(`/login`, {
                email,
                password
            })
            
            await AsyncStorage.setItem('userAccessToken', res.data.accessToken)
            await EncryptedStorage.setItem("userRefreshToken", res.data.refreshToken)
            dispatch({type: 'FETCH_SUCCESS', payload: {...res.data.userInfo}})
        }
        catch(error){
            dispatch({type: 'FETCH_ERROR', payload: error.response.data.message})
            console.error(error.response.data.message);
        }
    }

    const checkAuth = async () => {
        dispatch({type:'FETCH_START'})
        try {
            const refresh = await EncryptedStorage.getItem("userRefreshToken")
            const res = await axios.get(`${API_URL}/refresh`, {
                params:{
                    refreshToken: refresh
                }
            })

            await AsyncStorage.setItem('userAccessToken', res.data?.accessToken)
            await EncryptedStorage.setItem('userRefreshTokeb', res.data?.refreshToken)
            dispatch({type:'FETCH_SUCCESS', payload: {...res.data.userInfo}})
        }
        catch(error){
            dispatch({type: 'FETCH_DEFAULT'})
        }
    }

    const logout = async () =>{
        dispatch({ type: 'FETCH_START' })

        try {
            const refreshToken = await EncryptedStorage.getItem('userRefreshToken')

            await $api.post(`/logout`, {
                refreshToken: refreshToken
            })

            await AsyncStorage.removeItem('userAccessToken')
            
            dispatch({type:"FETCH_DEFAULT"})
        } catch(error) {
            console.error(error);
        }
    
    }

    const editProfileInfo = async ({ userName, address}) =>{
        dispatch({type:'FETCH_START'})

        try{
            const res = await $api.post(`/edit`, {
                userName,
                address,
                oldUserName: userState.userData.userProfileInfo.userName
            })
            dispatch({type: 'FETCH_SUCCESS', payload: {...res.data.userInfo}})
        } catch(error){

        }
    }

    
    

    return(
        <AuthContext.Provider value={{register, login, addInfo, checkAuth, logout, editProfileInfo, userState }}>
            {children}
        </AuthContext.Provider>
    )
}
