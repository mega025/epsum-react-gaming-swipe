import {StyleSheet} from "react-native";
import {AppColors} from "../../theme/AppTheme";


const stylesHome= StyleSheet.create({
    iconButton:{
        backgroundColor:AppColors.colorButton,
    },
    logo:{
        width:60,
        height:60,
        bottom:30,
        position:"absolute",
        alignSelf:"center",
    },

    overlayLabelContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },

    wrapper: {
        flex: 1,
    },
    cardContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderRadius: 48,
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 48,
    },

    overlayLabelText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold'
    }

})

export default stylesHome;