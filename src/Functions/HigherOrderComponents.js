import { useNavigation } from "@react-navigation/native"

export const withProfileInfo = (WrappedComponent) =>{
    return({onSubmit, error, control, setAvatar}) => {
      return(
        <WrappedComponent
          control = {control}
          onSubmit = {onSubmit}
        />
      )
    }
  }

export const withCustomDropList = (WrappedComponent) =>{
  return ({name, control, data, header, placeholder, rules = {}, borderWidth, backgroundColor }) =>{
      return (
          <WrappedComponent
              name={name}
              control={control}
              data={data}
              header={header}
              placeholder={placeholder}
              rules={rules}
              borderWidth = {borderWidth}
              backgroundColor = {backgroundColor}
          />
      )

  }
}

export const withCustomInputButton = (WrappedComponent) => {
  return ({ control, placeholder, name, header, map = {}, rules = {}, backgroundColor = {}, keyboardType = {}, secureTextEntry, borderWidth, multiline }) => {
      const navigation = useNavigation()
      return (
          <WrappedComponent
              control={control}
              placeholder={placeholder}
              name={name}
              header={header}
              map={map}
              rules={rules}
              backgroundColor={backgroundColor}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry} 
              borderWidth={borderWidth}
              navigation={navigation}
              multiline={multiline}
          />
      )
  }
}