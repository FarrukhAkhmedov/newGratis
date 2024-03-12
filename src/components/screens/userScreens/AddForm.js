import React, { useContext, useEffect, useState} from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View, Button, Pressable } from 'react-native';
import UploadPhotoButton from '../../CustomButtons/UploadPhotoButton';
import CustomInputButton from '../../CustomButtons/CustomInput';
import { useForm } from 'react-hook-form';
import Rating from '../../CustomButtons/Rating';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomMultipleSelect from '../../CustomButtons/CustomMultipleSelect';
import { objectTypeData, ratingData } from '../../../Data/DATA';
import BottomSheet from '../../Animated/BottomSheet';
import { AuthContext } from '../../context/AuthContext';
import {observer} from 'mobx-react-lite' 




const AddForm = () => {
  const {container, bottomWrapper, overlay } = styles
  const {control, handleSubmit, setValue} = useForm({defaultValues:{
    address:'',
    photo:{},
    qualityRating:1
  }})
  const [image, setImage] = useState({})
  const {postStore} = useContext(AuthContext)
  const navigation = useNavigation()
  const route = useRoute()


  useEffect(()=>{
    setValue('address', route.params?.location)
  },[route.params?.location])

  useEffect(()=>{
    setValue('photo', {...image})
  },[image])

  const handleImageSelect = (image) =>{
    setImage(image)
  }




  const onAddSubmit = (data) =>{
    postStore.createPost(
      data.address,
      data.description,
      data.itemName,
      data.objectType,
      data.qualityRating,
      data.photo
    )
    navigation.navigate({name: 'Tabs'})
  }

  

  return (
    <SafeAreaView style={container}>
      <ScrollView>
        <View style={bottomWrapper}>
          <View style={{ alignItems: 'center'}}>
            <UploadPhotoButton
              control={control}
              rules={{required: 'Photo is required'}}
              image = {image}
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
            name='address'
            keyboardType={'default'}
            placeholder={'Street, House'}
            control={control}
            header='Address'
            map={true}
            rules={{required:'Address is required'}}
          />
          <Button title='Submit add' onPress={handleSubmit(onAddSubmit)}/>
        </View>
        <Pressable onPress={() => postStore.bottomSheetClose()} style={[ overlay , {display: postStore.isBottomVisible ? 'flex' : 'none'}]}/>
      </ScrollView>
      <BottomSheet
        isVisible={postStore.isBottomVisible}
        imageSelect={handleImageSelect}
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