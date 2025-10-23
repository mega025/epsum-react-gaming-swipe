import {Image, TouchableOpacity,StyleSheet} from "react-native";
import {AppColors} from "../theme/AppTheme";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

interface Props {
    onPress: () => void;
}

export const RewindButton=({onPress}: Props)=>{
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={require("../../../assets/rewind-arrow.png")} style={styles.button}></Image>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        height:hp("3%"),
        width:hp("3%"),
        tintColor: AppColors.orange,
    },
    container:{
        backgroundColor:AppColors.buttonBackground,
        borderRadius:40,
        height:hp("7%"),
        width:hp("7%"),
        alignItems:"center",
        justifyContent:"center",
        elevation:10,
    }
});
