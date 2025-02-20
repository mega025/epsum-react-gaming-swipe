import {useState} from "react";
import {Button, Image, View, StyleSheet, TouchableOpacity,Text} from "react-native";
import * as ImagePickerExpo from "expo-image-picker";
import {Alert} from "rn-custom-alert-prompt";
import {AppColors} from "../theme/AppTheme";

export const ChangePhoto = () => {
    const [image, setImage] = useState("");

    const selectImage =async () => {
        const { status } = await ImagePickerExpo.requestCameraPermissionsAsync()

        if (status !== "granted") {
            alert("Permission denied")
            return;
        }
        let result = await ImagePickerExpo.launchImageLibraryAsync({
            mediaTypes:ImagePickerExpo.MediaTypeOptions.All,
            allowsEditing: true,
            aspect:[1,1],
            quality:1
        });
        console.log("result", result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerPhoto}>
                <Image style={styles.photo} source={image? { uri: image }: require("../../../assets/account.png")} />
            </View>
            <TouchableOpacity style={styles.button} onPress={selectImage}>
                <Text style={styles.buttonText}>Change photo</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles =StyleSheet.create({
   container:{
       flex: 1,
       alignItems:"center",
   },
    containerPhoto:{
        alignItems:"center",

    },
    photo:{
        width:100,
        height:100,
        borderRadius:50,
        alignItems:"center",
        resizeMode:"center",
    },
    button:{
        backgroundColor:AppColors.colorButton,
        width:160,
        height:35,
        borderRadius:25,
        marginTop:110,

    },
    buttonText:{
        alignSelf:"center",
        color:AppColors.white,
        paddingVertical:6
    }
})