import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from "react-native-encrypted-storage";

export const API_URL = `http://YOUR_SERVER_IP:3000`

const $api = axios.create({
    baseURL: `${API_URL}`,
})

$api.interceptors.request.use( async (config) =>{
    config.headers.Authorization = `Beerer ${await AsyncStorage.getItem('userAccessToken')}`
    return config
})

$api.interceptors.response.use((config) =>{
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true
        try{
            const refreshToken = await EncryptedStorage.getItem("userRefreshToken")
            const response = await axios.get(`${API_URL}/auth/refresh`, {
                params:{
                    refreshToken: refreshToken
                }
            })
            console.log(response.data);
            await AsyncStorage.setItem('userAccessToken', response.data.accessToken )
            await EncryptedStorage.setItem('userRefreshToken', response.data.refreshToken)

            return $api.request(originalRequest)
        }catch(e){
            console.log(e);
        }
    }
    throw error
})

export default $api;
