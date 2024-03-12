import { addInfo, checkEmail, editProfileInfo, logout, login } from '../../Functions/AuthFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage'
import EncryptedStorage from 'react-native-encrypted-storage'
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import  { API_URL } from "../context/Api"





export default class AuthStore{
    isLoading = false
    userData = {
        userProfileInfo : {}
    }
    serverSideError = ''
    isAuth = false
    isEmailValid = false
    image = {}

    constructor(){
        makeAutoObservable(this)
    }

    setImage(payload){
        this.image = payload
    }
    
   
    fetchStart() {
        this.isLoading = true;
    }

    fetchSuccess(payload) {
        this.isAuth = true;
        this.userData.userProfileInfo = payload;
        setTimeout(()=>{
            this.isLoading = false
        }, 500)
    }

    fetchError(error) {
        this.serverSideError = error;
        this.isLoading = false;
        this.isEmailValid = false;
    }

    fetchIsEmailValid() {
        this.isLoading = false;
        this.isEmailValid = true;
    }

    resetState() {
        this.isLoading = false;
        this.userData.userProfileInfo = {};
        this.serverSideError = '';
        this.isAuth = false;
        this.isEmailValid = false;
        this.image = {}
    }

    async register (email) {
        this.fetchStart()
        try{
            await checkEmail(email)
            this.fetchIsEmailValid()
        } catch(error){
            this.fetchError(error.response.data.message)
        } 
    }

    async addInfo (userName, address, email, password){
        this.fetchStart()
        const formData = new FormData()
        formData.append('profileImage', {
            name: userName + '_profile',
            uri: this.image.path,
            type: this.image.mime
        })
        formData.append('userName', userName)
        formData.append('address', address)
        formData.append('email', email)
        formData.append('password', password)
        try{

            const res = await addInfo(formData)

            await AsyncStorage.setItem('userAccessToken', res.data.accessToken)
            await EncryptedStorage.setItem('userRefreshToken', res.data.refreshToken)

            this.fetchSuccess({...res.data.userInfo})
            
        } catch(error){
            console.error(error.response.data.message)
            this.fetchError(error.response.data.message)
        }
        
    }

    async login (email, password){
        this.fetchStart()
        try{
            const res = await login(email, password)
            
            await AsyncStorage.setItem('userAccessToken', res.data.accessToken)
            await EncryptedStorage.setItem("userRefreshToken", res.data.refreshToken)
            this.fetchSuccess({...res.data.userInfo})
        }
        catch(error){
            this.fetchError(error.response.data.message)
        }
    }

    async checkAuth (){
        this.fetchStart()
        try {
            const refresh = await EncryptedStorage.getItem("userRefreshToken")
            const res = await axios.get(`${API_URL}/auth/refresh`, {
                params:{
                    refreshToken: refresh
                }
            })

            await AsyncStorage.setItem('userAccessToken', res.data.accessToken)
            await EncryptedStorage.setItem('userRefreshToken', res.data.refreshToken)
            this.fetchSuccess(res.data.userInfo)
        }
        catch(error){
           this.resetState()
        }
    }

    async logout() {
        this.fetchStart()
        try {
            await logout()
            await AsyncStorage.removeItem('userAccessToken')
            await EncryptedStorage.removeItem('userRefreshToken')
            this.resetState()
        } catch(error) {
            console.error(error);
        }
    
    }

    async editProfileInfo( userName, address){
        this.fetchStart()
        const formData = new FormData()
        formData.append('profileImage', {
            name: userName + '_profile',
            uri: this.image.path,
            type: this.image.mime
        })
        formData.append('userName', userName)
        formData.append('address', address)
        formData.append('oldUserName', this.userData.userProfileInfo.userName)
        try{
            const res = await editProfileInfo(formData)
            this.fetchSuccess(res.data.userInfo)
        } catch(error){
            this.fetchError(error.response.data.message)
        }
    }
        
};

