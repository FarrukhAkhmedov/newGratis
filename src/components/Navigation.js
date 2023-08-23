import React from 'react';
import { Pressable, Dimensions } from 'react-native';

import auth from '@react-native-firebase/auth'

import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';

import Profile from './screens/Profile';
import AddForm from './screens/AddForm';
import Home from './screens/Home';
import MyLocationMarker from './screens/MyLocationMarker';
import EditProfile from './screens/EditProfile';
import MyAdds from './screens/MyAdds';
import LoginApp from './auth/Landing';
import Registration from './auth/Registration';


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
let { width } = Dimensions.get('screen')

const Tabs = () => {
  const navigation = useNavigation() 
  return (
      <Tab.Navigator screenOptions={{
        tabBarShowLabel:false,
        headerTitleAlign:'center',
        tabBarStyle:{
          borderTopLeftRadius:15,
          borderTopRightRadius:15
        },
        headerStyle: {
          backgroundColor:'#f0f8ff'
        },
        headerTitleStyle: {
          fontWeight:'500'
        },
      }}>
        <Tab.Screen name={'Home'} component={Home} options={{
          tabBarIcon:({focused}) => <FontAwesome name='home' size={25} color={focused ? '#007BA7' : 'grey'}/>
        }}/>
        <Tab.Screen name={'Create add'} component={AddForm} options={{
          tabBarIcon:({focused}) => <Feather name='plus' size={25} color={focused ? '#007BA7' : 'grey'}/>
        }}/>
        <Tab.Screen name={'Profile'} component={Profile} options={{
          tabBarIcon: ({focused}) => <Feather name='user' size={25} color={focused ? '#007BA7' : 'grey'}/>,
          headerRight:() => {
            return(
              <Pressable style={{marginRight:width*0.05}} onPress={() => {
                auth()
                  .signOut()
                  .then(()=>navigation.navigate('Landing'))
              }}>
                <Feather name='log-out' size={25} color={'black'}/>
              </Pressable>
            )
          }
        }}/>
      </Tab.Navigator>
  )
}

const Navigation = () => {
  return(
    <Stack.Navigator initialRouteName='Landing'>
      <Stack.Screen
        name='Tabs'
        component={Tabs}
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen
        name='Landing'
        component={LoginApp}
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
          headerTitleAlign:'center',
          headerStyle:{backgroundColor:'#f0f8ff'}
        }}
      />
      <Stack.Screen
        name='Registration'
        component={Registration}
        options={{
          headerShown:false
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
    </Stack.Navigator>
  )
}


  
  
  
export default Navigation