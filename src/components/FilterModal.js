import React from 'react'
import {View, StyleSheet} from 'react-native'

const FilterModal = () =>{
    return(
        <View style={filterStyle}>
            <View style={topBar}>
                <TouchableOpacity onPress={handleSubmit(submitForm)}>
                    <Fontisto name='close-a' size={20} color='black' />
                </TouchableOpacity>
                    <Text style={{fontSize:23, fontWeight:'bold', color:'black', paddingLeft: width * 0.04}}>Filters</Text>
                <TouchableOpacity onPress={() => {
                    setValue('categories'&&'quality'&&'sortingType', '')
                    setModalVisible(!modalVisible)
                    setChecked(0)
                }}>
                    <Text style={{fontSize:20, color:'blue'}}>Reset</Text>
                </TouchableOpacity>
            </View>
            <View style={filterUpperContainer}>
                <CustomDropList
                    control={control}
                    name={'categorie'}
                    placeholder={'Choose one of the following categories...'}
                    header={'All categories'}
                    data={objectTypeData}
                    backgroundColor={'#f0f9ff'}
                    borderWidth={1}
                />
                <CustomDropList
                    control={control}
                    name={'quality'}
                    placeholder={'What quality would be acceptable for You...'}
                    header={'Minimum quality'}
                    data={ratingData}
                    backgroundColor={'#f0f9ff'}
                    borderWidth={1}
                />
                <CustomInputButton
                    name={'distance'}
                    backgroundColor={'#f0f8ff'}
                    borderWidth={1}
                    control={control}
                    header={'Max Distance'}
                    keyboardType={'numeric'}
                    placeholder={'Choose maximum distance acceptable for you'}

                />
                <Text style={titleStyle}>Sorting types</Text>
                <View style={ {justifyContent:'center', flexDirection:'row'}}>
                    <CheckBox
                        center
                        title={'Date'}
                        onPress={() => {
                            setValue('sortingType', 'date')
                            setChecked(0)
                        }}
                        checked={checked === 0}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                    <CheckBox
                        center
                        title={'Quality'}
                        onPress={() => {
                            setValue('sortingType', 'quality')
                            setChecked(1)
                        }}
                        checked={checked === 1}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                    <CheckBox
                        center
                        title={'Distance'}
                        onPress={() => {
                            setValue('sortingType', 'distance')
                            setChecked(3)
                        }}
                        checked={checked === 3}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                </View>
            </View>
                        </View>
    )
}

const styles = StyleSheet.create({

})

export default FilterModal
