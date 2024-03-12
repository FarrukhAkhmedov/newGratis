import React, {useContext, useState, useEffect, useMemo} from "react";
import { StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Dimensions } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import MyAddList from '../../listItems/MyAddList'
import { GestureHandlerRootView } from "react-native-gesture-handler";

const {width, height} = Dimensions.get('screen')

const MyAdds = () =>{
    const {container} = styles
    const {postStore} = useContext(AuthContext)
    const [Data, setData] = useState([])

    useEffect(() =>{
        const fetchData = async () => {
            try {
                await postStore.getMyAdds();
                setData([...postStore.myPosts]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const renderItem = useMemo(() => {
        return ({ item, index }) => (
            <MyAddList 
                source={item.photo} 
                text={item.itemName} 
                data={item.data} 
                description={item.description} 
                address={item.address} 
                rating={item.rating} 
                post_id={item.post_id.toString()}
                index={index}
            />
        );
    }, [Data]);

    return(
        <GestureHandlerRootView style={container}>
            <FlatList
                data={Data}
                renderItem={renderItem}
                ListEmptyComponent={<ActivityIndicator/>}
            />
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,

        backgroundColor:'#f0f8ff'
    }
})

export default MyAdds