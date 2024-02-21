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