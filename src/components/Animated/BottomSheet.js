import React, { useCallback, useContext, useEffect } from 'react';
import {StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import IconButton from '../CustomButtons/IconButton'
import ImagePicker from 'react-native-image-crop-picker';
import { AuthContext } from '../context/AuthContext';


const { height, width } = Dimensions.get('screen');

const BottomSheet = ({ isVisible }) => {
  const translateY = useSharedValue(height);
  const {store} = useContext(AuthContext)

  const chooseFromGalery = async () =>{
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    })
    console.log(image);
    store.setImage(image);
  }
  
  const openCmera = async () =>{
    const image = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      console.log(image);
      store.setImage(image);
  }

  const animatedSheet = useCallback(() => {
    if (isVisible) {
      translateY.value = withSpring(height / 1.45, { mass: 0.5, useNativeDriver: true});
    } else {
      translateY.value = withSpring(height, { duration: 5000 });
    }
  }, [isVisible, translateY]);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(()=>{
    animatedSheet()
  }, [isVisible, animatedSheet])

  return (
    <Animated.View style={[styles.container, rBottomSheetStyle]}>
       <IconButton
        icon={'image'}
        text={'Choose from galery'}
        textSize={20}
        size={40}
        color={'grey'}
        onPress={chooseFromGalery}
       />
       <IconButton
        icon={'camera'}
        text={'Open  camera'}
        textSize={20}
        size={40}
        color={'grey'}
        onPress={openCmera}
       />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:5,
    flexDirection:'column',

    height: height,
    width: width,
    position: 'absolute',

    backgroundColor: 'white',

    borderRadius: 25,

  }
});

export default BottomSheet;
