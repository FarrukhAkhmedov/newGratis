import React, {useContext} from 'react';

import { Pressable, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

import Profile from '../screens/userScreens/Profile';
import AddForm from '../screens/userScreens/AddForm';
import Home from '../screens/userScreens/Home';

const Tab = createBottomTabNavigator()

let { width } = Dimensions.get('screen')

const Tabs = () => {
  const {logout} = useContext(AuthContext)
  const navigation = useNavigation()
  
  const onLogout = () =>{
    logout()
    navigation.navigate('Landing')
  }

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
          tabBarIcon:({focused}) => <FontAwesome name='home' size={25} color={focused ? '#007BA7' : 'grey'}/>,
          headerShown:false,
          
        }}/>
        <Tab.Screen name={'Create add'} component={AddForm} options={{
          tabBarIcon:({focused}) => <Feather name='plus' size={25} color={focused ? '#007BA7' : 'grey'}/>
        }}/>
        <Tab.Screen name={'Profile'} component={Profile} options={{
          tabBarIcon: ({focused}) => <Feather name='user' size={25} color={focused ? '#007BA7' : 'grey'}/>,
          headerRight:() => {
            return(
              <Pressable style={{marginRight:width*0.05}} onPress={()=> {onLogout()} }>
                <Feather name='log-out' size={25} color={'black'}/>
              </Pressable>
            )
          }
        }}/>
      </Tab.Navigator>
  )
}

export default Tabs