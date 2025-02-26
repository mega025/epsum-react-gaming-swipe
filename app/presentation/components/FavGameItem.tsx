import {FavGame} from "../../domain/entities/FavGame";
import {Image, View, Text, TouchableOpacity} from "react-native";
import {StyleSheet} from 'react-native';
import {BaseToast} from "react-native-toast-message";
import stylesHome from "../views/home/StyleHome";


export const FavGameItem = ({item}: {item: FavGame}) => {
    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <Image source={{uri : item.imageUrl}} style={styles.image}/>
                <Text style={stylesHome.gameNameText}>{item.name}</Text>
                <TouchableOpacity style={styles.deleteIcon}>
                    <Image source={require("../../../assets/borrar.png")} style={styles.deleteIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        alignSelf: "center",
        justifyContent: "center",
        width: "90%",
        height: 190,
        backgroundColor: "#cecece",
        borderRadius: 20,
        elevation: 5,
        marginBottom: 20,
    },

    container: {
        position: "absolute",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },

    image : {
        width: 120,
        height: 190,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },

    deleteIcon: {
        width: 20,
        height: 20,
    }




})