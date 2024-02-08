import React, {useEffect} from 'react';
import { StyleSheet, ScrollView,SafeAreaView, View, Button } from 'react-native';
import UploadPhotoButton from '../../CustomButtons/UploadPhotoButton';
import CustomInputButton from '../../CustomButtons/CustomInput';
import { useForm } from 'react-hook-form';
import Rating from '../../CustomButtons/Rating';
import { useRoute } from '@react-navigation/native';
import CustomMultipleSelect from '../../CustomButtons/CustomMultipleSelect';
import { objectTypeData } from '../../../Data/DropdawnInput';



const AddForm = () =>{
  const {container, bottomWrapper } = styles
  const {control, handleSubmit, formState:{errors}, setValue} = useForm()
  const route = useRoute()


  useEffect(()=>{
    setValue('Address', route.params ? route.params.location : '' )
  },[route.params?.location])



  const onFormFilled = (data) => {
    console.log(data);
  }

  

  return (
    <SafeAreaView style={container}>
      <ScrollView>
        <View style={bottomWrapper}>
          <View style={{alignItems:'center'}}>
            <UploadPhotoButton
              control={control}
            />
          </View>
          <Rating
            name='qualityRating'
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