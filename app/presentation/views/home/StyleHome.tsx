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
        bottom: hp("3.6%"),
        position: "absolute",
        alignSelf: "center",
    },
    overlayLabelContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    wrapper: {
        flex: 1,
        marginBottom: 50,
    },
    cardContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: "#cecece",
        borderRadius: 20,
        marginBottom: 80,
        elevation: 10,
        position: "absolute",
    },

    loadingIconContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1
    },

    loading: {
        position: "absolute",
        width: 50,
        height: 20,
        alignSelf: "center",
        justifyContent: "center",
    },

    image: {
        width: '100%',
        height: 420,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },

    overlayLabelText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold'
    },

    ratingText: {
        fontSize: 19,
        backgroundColor: "#00da08",
        color: "#FFF",
        fontWeight: "bold",
        padding: 10,
    },

    platformsContainer: {
        width: 290,
    },

    genreContainer: {
        width: 205,
    },

    gameNameText: {
        fontSize: 17,
        width: 230
    },

    firstRowCardContainer: {
        flexDirection: "row",
        position:"absolute",
        alignItems:"center",
        gap: 10,
    },

    secondRowCardContainer: {
        marginTop: 70,
        position: "absolute",
        elevation: 5
    },

    thirdRowCardContainer: {
        marginTop: 120,
        flexDirection: "row",
        gap: 20,
        position: "absolute",
        alignItems: "center",
    },

    buttonsContainer : {
        marginTop: hp("101%")
    }
})

export default stylesHome;