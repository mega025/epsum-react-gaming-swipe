import {Image, ImageBackground, Text, View} from "react-native";
import {CustomTextInputSearch} from "../../components/CustomTextInputSearch";
import styleSearch from "./StyleSearch";

export function Search(){
    return (
        <View style={styleSearch.container}>
            <ImageBackground
                source={require("../../../../assets/background.png")}
                style={{width: '100%', height: '100%'}}
            >

                <View style={styleSearch.header}>
                    <Image source={require("../../../../assets/logo.png")} style={styleSearch.logo} />
                    <Text style={styleSearch.appName}>GamingSwipe</Text>
                </View>


                <View style={styleSearch.title}>
                    <Text style={styleSearch.title}>Search</Text>
                </View>


                <View style={styleSearch.containerSearchInput}>
                    <CustomTextInputSearch
                        keyboardType="default"
                        secureTextEntry={false}
                        onPressButtonFromInterface={() => alert("Button pressed")}
                    />
                    <Image
                        source={require("../../../../assets/search.png")}
                        style={styleSearch.icon}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}