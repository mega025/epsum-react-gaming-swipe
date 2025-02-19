import {Image, ImageBackground, Text, View} from "react-native";
import stylesHome from "../home/StyleHome";
import {XButton} from "../../components/XButton";
import {HeartButton} from "../../components/heartButton";
import styleFab from "./StyleFab";

export function Fab(){
    return (
        <View >
            <ImageBackground source={require("../../../../assets/background.png")}
                             style={{width: '100%', height: '100%'}}>
                <View style={styleFab.header}>
                    <Image source={require("../../../../assets/logo.png")} style={styleFab.logo}></Image>
                    <Text style={styleFab.appName}> GamingSwipe</Text>
                </View>
                <View>
                    <Text style={styleFab.title}>
                        Favourite games
                    </Text>
                </View>






            </ImageBackground>
        </View>
    );
}