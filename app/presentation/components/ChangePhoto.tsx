import {useState} from "react";
import {launchImageLibrary} from "react-native-image-picker";
import {Button, Image, View,StyleSheet} from "react-native";

export const ChangePhoto = () => {
    const [image, setImage] = useState("https://via.placeholder.com/200");

    const selectImage = () => {
        launchImageLibrary(
            {
                mediaType: "photo",
                quality: 0.8,
            },
            (response) => {
                if (response.didCancel) {
                    console.log("User cancelled image picker");
                } else if (response.errorCode) {
                    console.error("ImagePicker Error:", response.errorMessage);
                } else {
                    const uri = response.assets?.[0]?.uri;
                    if (uri) setImage(uri); // Actualiza la imagen
                }
            }
        );
    };

    return (
        <View>
            <Button title="Change photo" onPress={selectImage} />
            <Image style={styles.photo} source={{ uri: image }} />
        </View>
    );
}
const styles =StyleSheet.create({
    photo:{
        width:60,
        height:60,
    },
})