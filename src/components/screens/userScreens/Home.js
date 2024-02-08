import React, {useState, useContext} from 'react'
import { SafeAreaView, Text, View,  StyleSheet, TouchableOpacity, Dimensions, TextInput, Modal, FlatList, ActivityIndicator } from 'react-native'
import { CheckBox } from '@rneui/base'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useForm } from 'react-hook-form'
import CustomInputButton from '../../CustomButtons/CustomInput'
import { AuthContext } from '../../context/AuthContext'
import CustomDropList from '../../CustomButtons/CustomDropList'
import NewAddlist from '../listItems/NewAddList'

let { height, width } = Dimensions.get('screen')

const Home = () => {
    const {container, upperContainer, bottomContainer, searchStyle, filterStyle, topBar, filterUpperContainer, titleStyle} = styles
    const [search, setSearch] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const {userState} = useContext(AuthContext)
    const {control, handleSubmit, setValue} = useForm({
        defaultValues: {
            categorie:'',
            quality:'',
            sortingType:'date'
        }
    })
    const [checked, setChecked] = useState(0)

    const submitForm = (data) =>{
        console.log(data)
        setModalVisible(!modalVisible)
        setChecked(0)
    }

    if (userState.isLoading){
        <View>
            <ActivityIndicator size={height * 0.1} color={'blue'}/>
        </View>
    }

    const Data = [
        {id:'1', name:'knife', image:"https://upload.wikimedia.org/wikipedia/commons/3/33/Damascus_Bowie.jpg", date:'1696925121', objectType:'instrument', description:"That's how I got theese scars", address:'Moscow, Udaltsova 4', rating:4},
        {id:'2', name:'wardrobe', image:'https://www.ikea.com/ch/en/images/products/kleppstad-wardrobe-with-2-doors-white__0733323_pe748780_s5.jpg', date:'054281921', objectType:'furneture', description:'Get out of the closet', address:'20.520126', rating:5},
        {id:'3', name:'table', image:'https://www.futoncompany.co.uk/images/detailed/72/Oak-Console-Table-100cm-_4__3rb3-m4.jpg', date:'1367309121', objectType:'furneture', description:'Just regular table', address:'13.41165685918645', rating:6},
        {id:'4', name:'bible', image:'https://img3.labirint.ru/rc/b12f7844dde09dd7b7fe35425d2c9c11/363x561q80/books47/468967/cover.jpg?1628080127', date:'1680422721', objectType:'book', description: 'Holly shit', address:'20.516242', rating:8},
        {id:'5', name:'knife', image:"https://upload.wikimedia.org/wikipedia/commons/3/33/Damascus_Bowie.jpg", date:'1696925121', objectType:'instrument', description:"That's how I got theese scars", address:'20.525094', rating:4},
        {id:'6', name:'wardrobe', image:'https://www.ikea.com/ch/en/images/products/kleppstad-wardrobe-with-2-doors-white__0733323_pe748780_s5.jpg', date:'054281921', objectType:'furneture', description:'Get out of the closet', address:'20.520126', rating:5},
        {id:'7', name:'table', image:'https://www.futoncompany.co.uk/images/detailed/72/Oak-Console-Table-100cm-_4__3rb3-m4.jpg', date:'1367309121', objectType:'furneture', description:'Just regular table', address:'20.519236', rating:6},
        {id:'8', name:'bible', image:'https://img3.labirint.ru/rc/b12f7844dde09dd7b7fe35425d2c9c11/363x561q80/books47/468967/cover.jpg?1628080127', date:'1680422721', objectType:'book', description: 'Holly shit', address:'20.516242', rating:8}
    ]

    const data = [
        {value:'Phone'},
        {value:'Book'},
        {value:'Furneture'},
        {value:'PC'}
    ]

    const qualityData = [
        {value:'Needs a serious overhaul'},
        {value:"Got major defects, that affect performance"},
        {value:'Needs a small repair '},
        {value:"Got major defects, that don't affect performance"} ,
        {value:'Usable'},
        {value:'Got minor visible deffects '},
        {value: 'Got minor barely visible defects'}, 
        {value:'Was used only once'}, 
        {value:'Was never used!'} 
    ]

    const renderItem = ({item}) =>(
        <NewAddlist source={item.image} text={item.name} id={item.id} date={item.data} description={item.description} address={item.address} rating={item.rating} />
    )

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
                                data={data}
                                backgroundColor={'#f0f9ff'}
                                borderWidth={1}
                            />
                            <CustomDropList
                                control={control}
                                name={'quality'}
                                placeholder={'What quality would be acceptable for You...'}
                                header={'Minimum quality'}
                                data={qualityData}
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
                <Text style={{ fontSize:25, color:'black', fontWeight:'bold', paddingLeft:width * 0.05, paddingTop:height*0.03}}>May be interesting for You</Text>
            </View>
            <View style={bottomContainer}>
                <FlatList
                data={Data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ alignSelf:'center', justifyContent:'space-around' }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
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

export default Home