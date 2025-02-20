import {Image, ImageBackground, Text, View} from "react-native";
import stylesHome from "../home/StyleHome";
import {XButton} from "../../components/XButton";
import {HeartButton} from "../../components/heartButton";
import styleFab from "../fab/StyleFab";
import styleAccount from "./StyleAccount";
import {RoundedButton} from "../../components/RoundedButton";
import {RoundedButtonAccount} from "../../components/RoundedButtonAccount";

export function Account(){
    return (
        <View style={styleAccount.container}>
            <ImageBackground source={require("../../../../assets/background.png")}
                             style={{width: '100%', height: '100%'}}>
                <View style={styleAccount.header}>
                    <Image source={require("../../../../assets/logo.png")} style={styleAccount.logo}></Image>
                    <Text style={styleAccount.appName}> GamingSwipe</Text>
                </View>
                <View>
                    <Text style={styleAccount.title}>
                        Account details
                    </Text>
                </View>
                <View style={styleAccount.containerEmail}>
                    <Text style={styleAccount.textEmail}> email </Text>
                </View>
                <View style={styleAccount.containerPhoto}>
                    <Image source={require("../../../../assets/account.png")} style={styleAccount.photo}></Image>
                    <RoundedButtonAccount text={"Change photo"} onPressFromInterface={alert}></RoundedButtonAccount>
                </View>
                <View>


                </View>








            </ImageBackground>
        </View>
    );
}