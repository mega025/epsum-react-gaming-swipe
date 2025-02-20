import {StyleSheet} from "react-native";
import {AppFonts} from "../../theme/AppTheme";

const stylesAuthViews = StyleSheet.create({
    container:{
      width:'100%',
      height:'100%',
    },

    titleLogin:{
        fontSize:35,
        color:'white',
        marginTop:"40%",
        alignSelf:'flex-start',
        marginStart: 60,
        marginBottom:50,
        fontFamily: "zen_kaku_light"

    },


    titleRegister:{
        fontSize:35,
        color:'white',
        alignSelf:'flex-start',
        marginStart: 52,
        marginTop:"20%",
        marginBottom:50,
        fontFamily: "zen_kaku_light"

    },

    formContainer:{
        width:'100%',
        alignItems:'center',
    },

    formInputContainer: {
        marginBottom:20,
    },

    formInputContainerPassword: {
        marginBottom:20,
        flexDirection:'row',
        alignItems: "center",
        justifyContent:'center',
    },

    iconPasswordToggle: {
        width:20,
        height:20,
        resizeMode:'stretch',
        backgroundColor:'white',
    },

    formButtonContainer: {
        marginTop:20,
    },

    formInlineInputsContainer: {
        flexDirection: "row",
        marginBottom:20,
        gap: 10
    }

});

export default stylesAuthViews;