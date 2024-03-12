import React, {useState, useContext, useEffect, useMemo} from 'react'
import { SafeAreaView, Text, View,  StyleSheet, TouchableOpacity, Dimensions, TextInput, Modal, FlatList, ActivityIndicator, BackHandler } from 'react-native'
import { CheckBox } from '@rneui/base'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useForm } from 'react-hook-form'
import CustomInputButton from '../../CustomButtons/CustomInput'
import { AuthContext } from '../../context/AuthContext'
import CustomDropList from '../../CustomButtons/CustomDropList'
import NewAddlist from '../../listItems/NewAddList'
import { objectTypeData, ratingData } from '../../../Data/DATA'
import { observer } from 'mobx-react-lite'

let { height, width } = Dimensions.get('screen')

const Home = () => {
    const {container, upperContainer, bottomContainer, searchStyle, filterStyle, topBar, filterUpperContainer, titleStyle} = styles
    const [search, setSearch] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [Data, setData] = useState()
    const {postStore} = useContext(AuthContext)
    const {control, handleSubmit, setValue} = useForm({
        defaultValues: {
            categorie:'',
            quality:'',
            sortingType:'date'
        }
    })
    const [checked, setChecked] = useState(0)

    const submitForm = (data) =>{
        setModalVisible(!modalVisible)
        setChecked(0)
    }

    useEffect(() =>{
        const fetchData = async () => {
            try {
                await postStore.getPosts();
                setData([...postStore.allPosts]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const renderItem = useMemo(() => {
        return ({ item, index }) => (
            <NewAddlist 
                source={item.photo} 
                text={item.itemName} 
                data={item.data} 
                description={item.description} 
                address={item.address} 
                rating={item.rating} 
                id={item.post_id.toString()}
                index={index}
            />
        );
    }, [Data]);

    return(
        <SafeAreaView style={container}>
            <View style={upperContainer}>
                <View style={searchStyle}>
                    <Feather name='search' size={20} style={{marginHorizontal: width * 0.03}}/>
                    <TextInput
                        placeholder='Search...'
                        onChangeText={text => setSearch(text)}
                        value={search}
                        style={{width: width * 0.70}}
                        returnKeyType='search'
                        onSubmitEditing={() => console.log(search)}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Octicons style={{marginHorizontal:width*0.01}} name='filter' size={20} color='grey'/>
                    </TouchableOpacity>
                    <Modal
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(!modalVisible)}
                        animationType='slide'
                    >
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
                    </Modal>
                </View>
                <Text style={{ fontSize:25, color:'black', fontWeight:'bold', paddingLeft: width * 0.05, paddingTop: height*0.03}}>May be interesting for You</Text>
            </View>
            <View style={bottomContainer}>
                <FlatList
                    data={Data}
                    renderItem={renderItem}
                    contentContainerStyle={{ alignSelf:'center', justifyContent:'space-around' }}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={<ActivityIndicator/>}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:7,

        backgroundColor:'#f0f9ff',
    },
    upperContainer:{
        flex:1.7,
    },
    searchStyle:{
        flexDirection:'row',

        borderColor:'black',
        borderWidth:2,
        borderRadius:10,

        backgroundColor:'white',

        alignItems:'center',
        
        marginHorizontal: width * 0.04,
        marginVertical: height * 0.02
    },
    filterStyle:{
        flex:10,
        
        marginHorizontal: width * 0.03
    },
    topBar:{
        flex:0.25,
        flexDirection:'row',

        alignItems:'center',
        justifyContent:'space-between',
    },
    filterUpperContainer:{
        flex:4,

        paddingTop: height * 0.02,

    },
    bottomContainer:{
        flex:4,
    },
    titleStyle:{
        fontSize:25,
        color:'black',
        fontWeight:'bold',

        paddingBottom: height * 0.01,
        paddingTop: height * 0.03
    }

})

export default observer(Home)