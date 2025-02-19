import {StyleSheet} from "react-native";
import {AppColors} from "../../theme/AppTheme";


const stylesHome= StyleSheet.create({
    iconButton:{
        backgroundColor:AppColors.colorButton,

    },
    logo:{
        width:60,
        height:60,
        bottom:60,
        position:"absolute",
        alignSelf:"center",

    }
})

export default stylesHome;