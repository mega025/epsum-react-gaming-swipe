import {StyleSheet} from "react-native";
import {AppFonts} from "../theme/AppTheme";

const stylesAuthViews = StyleSheet.create({
    container:{
      width:'100%',
      height:'100%',
    },

    title:{
        fontSize:35,
        color:'white',
        marginTop:"50%",
        marginBottom:50,
        fontFamily:AppFonts.light

    },

    labelEmail:{
        fontSize:15,
        color:'white',
        marginBottom:10,

    },

    labelPassword:{
        fontSize:15,
        color:'white',
        marginBottom:10,
        marginTop:15,

    },

    formContainer:{
        width:'72%',
        alignSelf:'center',

    }

});

export default stylesAuthViews;