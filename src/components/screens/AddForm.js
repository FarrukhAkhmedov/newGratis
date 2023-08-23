import React, {useEffect} from 'react';
import { StyleSheet, ScrollView,SafeAreaView, View, Button } from 'react-native';
import UploadPhotoButton from '../CustomButtons/UploadPhotoButton';
import CustomInputButton from '../CustomButtons/CustomInput';
import { useForm } from 'react-hook-form';
import CustomDropList from '../CustomButtons/CustomDropList';
import Rating from '../CustomButtons/Rating';
import { useNavigation, useRoute } from '@react-navigation/native';



const AddForm = () =>{
  const {container, bottomWrapper } = styles
  const {control, handleSubmit, formState:{errors}, setValue} = useForm()
  const navigation = useNavigation()
  const route = useRoute()

  useEffect(()=>{
    setValue('Address', route.params ? route.params.location : '' )
  },[route.params?.location])



  const onFormFilled = (data) => {

    navigation.navigate('My adds')
    setValue('Address', route.params.location)
    console.log(data);
  }


  


  

  const data = [
    {value:'Phone'},
    {value:'Book'},
    {value:'Furneture'},
    {value:'PC'}
  ]

  return (
    <SafeAreaView style={container}>
      <ScrollView>
        <View style={bottomWrapper}>
          <UploadPhotoButton
            control={control}
          />
          <Rating
            name='Quality rating'
            control={control}
            reviews={[
              'Needs a serious overhaul',
              "Got major defects, that affect performance",
              'Needs a small repair ',
              "Got major defects, that don't affect performance" ,
              'Usable',
              'Got minor visible deffects ',
              'Got minor barely visible defects', 
              'Was used only once', 
              'Was never used!' 
            ]}
          />
          <CustomInputButton
            name='Item name'
            control={control}
            placeholder='e.g. Romeo and Juliet by William Shakespeare'
            header='Item name'
            rules={{required:'Item name is required'}}
          />
          <CustomInputButton
            name='Description'
            control={control}
            placeholder='Was published in 1597, got some coffe stains...'
            header='Description'
            rules={{required:'Description is required'}}
          />
          <CustomDropList
            name='Object type'
            control={control}
            data={data}
            header='Object type'
            placeholder={'What is it?'}
            rules={{required:'Object type is required'}}

          />
          <CustomInputButton 
            name='Address'
            placeholder={'Street, House'}
            control={control}
            header='Address'
            map={true}
            rules={{required:'Address is required'}}
          />
          <Button title='Submit form' onPress={handleSubmit(onFormFilled)}/>
        </View>
      </ScrollView>
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
    }
  }
)

export default AddForm 