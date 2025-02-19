import {StyleSheet} from "react-native";
import {AppColors} from "../../theme/AppTheme";

const styleSearch = StyleSheet.create({
    logo:{
        width:50,
        height:50,
        top:10,


    },
    container: {
        flex: 1,

    },
    appName: {
        fontSize:16,
        top:23,
        fontFamily:"",
        color:AppColors.white,
    },
    header: {
        flexDirection: "row",
        alignSelf: "center",
        top:10,
    },
    title:{
        fontSize:30,
        alignSelf:"center",
        top:25,
        color:AppColors.white,
    },
    containerSearchInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: "center",
        top:70,
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 10,
        bottom:5,
    },

})

export default styleSearch;