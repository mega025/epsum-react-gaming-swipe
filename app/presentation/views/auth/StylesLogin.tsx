import {StyleSheet} from "react-native";
import {AppFonts} from "../../theme/AppTheme";

const styles = StyleSheet.create({
    Container:{
      width:'100%',
      height:'100%',

    },
    TextWelcome:{
        fontSize:35,
        color:'white',
        marginTop:"50%",
        marginBottom:50,
        fontFamily:AppFonts.light

    },
    TextEmail:{
        fontSize:15,
        color:'white',
        marginBottom:10,

    },
    TextPassword:{
        fontSize:15,
        color:'white',
        marginBottom:10,
        marginTop:15,

    },
    View:{
        width:'72%',
        alignSelf:'center',

    }

});

export default styles;