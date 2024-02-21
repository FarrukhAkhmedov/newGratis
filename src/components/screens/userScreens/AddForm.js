import React, { useContext, useEffect} from 'react';
import { StyleSheet, ScrollView,SafeAreaView, View, Pressable} from 'react-native';
import UploadPhotoButton from '../../CustomButtons/UploadPhotoButton';
import CustomInputButton from '../../CustomButtons/CustomInput';
import { useForm } from 'react-hook-form';
import Rating from '../../CustomButtons/Rating';
import { useRoute } from '@react-navigation/native';
import CustomMultipleSelect from '../../CustomButtons/CustomMultipleSelect';
import { objectTypeData, ratingData } from '../../../Data/DATA';
import BottomSheet from '../../Animated/BottomSheet';
import { AuthContext } from '../../context/AuthContext';
import {observer} from 'mobx-react-lite' 
import { Button } from '@rneui/base';




const AddForm = () =>{
  const {container, bottomWrapper, overlay } = styles
  const {control, handleSubmit, setValue} = useForm({
    address: ''
  })
  const {userStore, store} = useContext(AuthContext)
  const route = useRoute()

  useEffect(()=>{
    setValue('address', route.params ? route.params.location : '' )
  },[route.params?.location])


  const onFormFilled = (data) => {
    console.log(data);
  }

  

  return (
    <SafeAreaView style={container}>
      <ScrollView>
        <View style={bottomWrapper}>
          <View style={{ alignItems: 'center'}}>
            <UploadPhotoButton
              control={control}
              rules={{required:'Photo is required'}}
              image={store.image.path}
            />
          </View>
          <Rating
            name='qualityRating'
            control={control}
            reviews={ratingData}
          />
          <CustomInputButton
            borderWidth = {2}
            backgroundColor={'#e9e9e9'}
            name='itemName'
            control={control}
            keyboardType={'default'}
            placeholder='e.g. Romeo and Juliet by William Shakespeare'
            header='Item name'
            rules={{required:'Item name is required'}}
          />
          <CustomInputButton
            borderWidth = {2}
            backgroundColor={'#e9e9e9'}
            name='description'
            keyboardType={'default'}
            control={control}
            placeholder='Was published in 1597, got some coffe stains...'
            header='Description'
            rules={{required:'Description is required'}}
          />
          <CustomMultipleSelect
            name='objectType'
            control={control}
            data={objectTypeData}
            header='Object type'
            placeholder={'Book'}
            rules={{required:'Object type is required'}}
          />
          <CustomInputButton 
            backgroundColor={'#e9e9e9'}
            borderWidth = {2}
            name='Address'
            keyboardType={'default'}
            placeholder={'Street, House'}
            control={control}
            header='Address'
            map={true}
            rules={{required:'Address is required'}}
          />
          <Button title='Submit add' onPress={handleSubmit(onFormFilled)}/>
        </View>
        <Pressable onPress={() => userStore.bottomSheetClose()} style={[ overlay ,{display: userStore.isBottomVisible ? 'flex' : 'none'}]}/>
      </ScrollView>
      <BottomSheet
        isVisible={userStore.isBottomVisible}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create(
  {
    container:{
      flex:1,
      flexDirection:'column',

      backgroundColor:'#f0f8ff',
      justifyContent: 'center'
    },

    bottomWrapper:{
      flex:1,      
      
      margin:15,
      gap:20
    },
    overlay:{
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  }
)

export default observer(AddForm)