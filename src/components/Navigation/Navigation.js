import React, {useContext, useEffect, lazy, Suspense} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext'
import {observer} from 'mobx-react-lite'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

const MyLocationMarker = lazy(() => import('../screens/userScreens/MyLocationMarker'))
const EditProfile = lazy(() => import('../screens/userScreens/EditProfile'))
const MyAdds = lazy(() => import('../screens/userScreens/MyAdds'))
const FullSizeAdd = lazy(() => import('../screens/userScreens/FullSizeAdd'))
const RegisterForm = lazy(() => import('../screens/register/RegisterForm'))
import Landing from '../screens/register/Landing';
const Email = lazy(() => import('../screens/register/Email'))
import Tabs from './Tabs'




const Stack = createSharedElementStackNavigator()


const Navigation = () => {
  const {authStore} = useContext(AuthContext)

  const checkUserAccessToken = async () =>{
    const userAccessToken = await AsyncStorage.getItem('userAccessToken')
    if (userAccessToken !== null){
      return true 
    }
    return false
  }
  
  useEffect( () => {
    if (checkUserAccessToken()){
      authStore.checkAuth()
    }
  }, [])

  
  return(
    <NavigationContainer>
      <Suspense>
        <Stack.Navigator initialRouteName = { authStore.isAuth ? 'Home' : 'Landing' } >
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
              headerStyle: {backgroundColor:'#f0f9ff'},
            }}
          />
          <Stack.Screen
            name='Tabs'
            component={Tabs}
            options={{
              headerShown:false
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
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='My adds'
            component={MyAdds}
            options={{
              headerShadowVisible:false,
              headerStyle:{backgroundColor:'#f0f8ff'},
              headerTitleAlign:'center'
            }}
          />
          <Stack.Screen
            name='Full size add'
            component={FullSizeAdd}
            options={{
              headerShown:false,
              headerStyle:{backgroundColor:'#f0f8ff'},
              title:''
            }}
            sharedElements={(route) => {
              const { id } = route.params;
              return [{ id }];
            }}
          />
        </Stack.Navigator>
      </Suspense>
    </NavigationContainer>
  )
}


  
  
  
export default observer(Navigation)