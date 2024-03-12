import $api from "../components/context/Api"
import EncryptedStorage from 'react-native-encrypted-storage'

export const checkEmail = async (email) => {
    return $api.post(`/auth/register`,  {email} )
}

export const addInfo = async (formData) =>{
    return  $api.post(`/auth/addInfo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export const login = async (email, password) => {
    return $api.post(`/auth/login`, { email, password })
}

export const logout = async () =>{
        const refreshToken = await EncryptedStorage.getItem('userRefreshToken')

        return $api.post(`/auth/logout`, { refreshToken: refreshToken })

}

export const editProfileInfo = async ( formData ) =>{
    return $api.post(`/auth/edit`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        
}






// const addInfo = async ({userName, address, email, password}) =>{
//     dispatch({ type: 'FETCH_START' })
//     try{
//         const res = await  $api.post(`/addInfo`, {
//             userName,
//             address,
//             email,
//             password
//         })

//         console.log(res.data);
//         await AsyncStorage.setItem( 'userAccessToken', res.data.accessToken)
//         await EncryptedStorage.setItem('userRefreshToken', res.data.refreshToken)
//         dispatch({ type: 'FETCH_SUCCESS', payload: {...res.data.userInfo} })
//     } catch(error){
//         dispatch({type: 'FETCH_ERROR', payload: error.response.data.message})
//         console.error(error);
//     }
    
// }

// const login = async ({email, password}) => {
//     dispatch({ type: 'FETCH_START'})
   
//     try{
//         const res = await $api.post(`/login`, {
//             email,
//             password
//         })
        
//         await AsyncStorage.setItem('userAccessToken', res.data.accessToken)
//         await EncryptedStorage.setItem("userRefreshToken", res.data.refreshToken)
//         dispatch({type: 'FETCH_SUCCESS', payload: {...res.data.userInfo}})
//     }
//     catch(error){
//         dispatch({type: 'FETCH_ERROR', payload: error.response.data.message})
//         console.error(error.response.data.message);
//     }
// }

// const checkAuth = async checkAuth () => {
//     dispatch({type:'FETCH_START'})
//     try {
//         const refresh = await EncryptedStorage.getItem("userRefreshToken")
//         const res = await axios.get(`${API_URL}/refresh`, {
//             params:{
//                 refreshToken: refresh
//             }
//         })

//         await AsyncStorage.setItem('userAccessToken', res.data?.accessToken)
//         await EncryptedStorage.setItem('userRefreshTokeb', res.data?.refreshToken)
//         dispatch({type:'FETCH_SUCCESS', payload: {...res.data.userInfo}})
//     }
//     catch(error){
//         dispatch({type: 'FETCH_DEFAULT'})
//     }
// }

// const logout = async () =>{
//     dispatch({ type: 'FETCH_START' })

//     try {
//         const refreshToken = await EncryptedStorage.getItem('userRefreshToken')

//         await $api.post(`/logout`, {
//             refreshToken: refreshToken
//         })

//         await AsyncStorage.removeItem('userAccessToken')
        
//         dispatch({type:"FETCH_DEFAULT"})
//     } catch(error) {
//         console.error(error);
//     }

// }

// const editProfileInfo = async ({ userName, address, avatar}) =>{
//     dispatch({ type:'FETCH_START' })
//     console.log(avatar);
//     const formData = new FormData()
//     formData.append('profileImage', {
//         name: userName + '_profile',
//         uri: avatar.path,
//         type: avatar.mime
//     })
//     formData.append('userName', userName)
//     formData.append('address', address)
//     formData.append('oldUserName', userState.userData.userProfileInfo.userName)
//     console.log(formData.getParts('profileImage'));
//     try{
//         const res = await $api.post(`/edit`, formData, {
//             headers:{
//                 'Content-Type': 'multipart/form-data'
//             } 
//         })
//         console.log(userState.userData.userProfileInfo.userName);
//         dispatch({type: 'FETCH_SUCCESS', payload: {...res.data.userInfo}})
//     } catch(error){

//     }
// }
