import {StyleSheet} from "react-native";
import {AppColors} from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


const stylesHome= StyleSheet.create({
    iconButton:{
        backgroundColor:AppColors.colorButton,
    },
    logo: {
        width: wp("15%"),
        height: wp("15%"),
        bottom: hp("4%"),
        position: "absolute",
        alignSelf: "center",
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
        backgroundColor: "#cecece",
        borderRadius: 48,
        marginBottom: 80,
    },

    image: {
        width: '100%',
        height: 400,
        borderRadius: 10,
    },

    overlayLabelText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold'
    },

    ratingText: {
        fontSize: 20,
        backgroundColor: "#00da08",
        color: "#FFF",
        fontWeight: "bold",
        padding: 10
    },

    gameNameText: {
        fontSize: 18,
        width: 250
    },

    firstRowCardContainer: {
        flexDirection: "row",
        position:"absolute",
        alignItems:"center",
        gap: 20
    }
})

export default stylesHome;