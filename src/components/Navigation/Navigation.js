import React, {useContext, useEffect} from 'react';
import Tabs from './Tabs';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext'

import MyLocationMarker from '../screens/userScreens/MyLocationMarker';
import EditProfile from '../screens/userScreens/EditProfile';
import MyAdds from '../screens/userScreens/MyAdds';
import FullSizeAdd from '../screens/userScreens/FullSizeAdd';
import Landing from '../screens/register/Landing';
import RegisterForm from '../screens/register/RegisterForm';
import Email from '../screens/register/Email';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator()


const Navigation = () => {
  const {userState, checkAuth} = useContext(AuthContext)

  const checkUserAccessToken = async () =>{
    const userAccessToken = await AsyncStorage.getItem('userAccessToken')
    if (userAccessToken !== null){
      return true 
    }
    return false
  }
  
  useEffect( () => {
    if (checkUserAccessToken()){
      checkAuth()
    }
  }, [])

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName = { userState.isAuth  ? 'Home' : 'Landing' } >
        <Stack.Screen
          name='Tabs'
          component={Tabs}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name = 'Landing'
          component={Landing}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name={'Email'}
          component={Email}
          options={{
            headerShown:false
          }}

        />
        <Stack.Screen
          name={'Register'}
          component={RegisterForm}
          options={{
            headerShown: false,
            headerStyle:{backgroundColor:'#f0f9ff'},
          }}
        />
        <Stack.Screen 
          name='MyLocationMarker' 
          component={MyLocationMarker} 
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name='Editing Profile'
          component={EditProfile}
          options={{
            headerTitleAlign:'center',
          }}
        />
        <Stack.Screen
          name='My adds'
          component={MyAdds}
          options={{
            headerStyle:{backgroundColor:'#f0f8ff'},
            headerTitleAlign:'center'
          }}
        />
        <Stack.Screen
          name='Full size add'
          component={FullSizeAdd}
          options={{
            headerStyle:{backgroundColor:'#f0f8ff'},
            title:''
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


  
  
  
export default Navigation