import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Button, LogBox } from 'react-native';
import { LeafletView, AnimationType, INFINITE_ANIMATION_ITERATIONS } from 'react-native-leaflet-view';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native'



const MyLocationMarker = () =>{
  const {container} = styles
  const [centerMapCoords, setCenterMapCoords] = useState({})
  const [coords, setCoords] = useState({})
  const navigation = useNavigation()

  
  
  
  useEffect (() => {
    Geolocation.getCurrentPosition((position) =>{
      setCoords({lat:position.coords.latitude, lng:position.coords.longitude})
      setCenterMapCoords({lat:position.coords.latitude, lng:position.coords.longitude})
    })
  },[])

  
  return (
    <SafeAreaView style={container}>
      <LeafletView
        style={container}
        zoom={25} 
        mapCenterPosition={centerMapCoords}
        mapMarkers={[{position:coords , icon:"📍", size:[25,25]}]}
        onMessageReceived={(e)=>{switch(e.event){case 'onMapClicked': return setCoords({lat:e.payload.touchLatLng.lat, lng:e.payload.touchLatLng.lng});
      }}}
      />
      <Button title='Confirm location' onPress={()=> navigation.navigate({name:'Create add', params:{location:`${coords.lat} ${coords.lng}`}})}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create(
  {
    container:{
      flex:1,

      flexDirection:'column-reverse',

      
    }
  }
)

export default MyLocationMarker