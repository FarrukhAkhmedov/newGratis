import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import ProfileInfoForm from "../ProfileInfoForm";

const EditProfile = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const {userState, editProfileInfo } = useContext(AuthContext)
  const [error, setError] = useState('')

  const onEditProfile = (data) => {
    const address = `${data.country}, ${data.city}, ${data.street}`
    editProfileInfo({
      address: address,
      userName: data.userName
    })

    navigation.navigate('Profile')
  };

  return (
    <ProfileInfoForm
      control={control}
      onSubmit={handleSubmit(onEditProfile)}
      error={error}
    />
  );
};

export default EditProfile