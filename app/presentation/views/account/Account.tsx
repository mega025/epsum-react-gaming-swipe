import {Image, ImageBackground, Text, View} from "react-native";
import styleAccount from "./StyleAccount";
import {RoundedButton} from "../../components/RoundedButton";
import {ChangePhoto} from "../../components/ChangePhoto";

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
                    <ChangePhoto></ChangePhoto>
                </View>
                <View style={styleAccount.containerName}>
                    <Text style={styleAccount.labelName}> Name</Text>

                    <View style={styleAccount.containerEditName}>
                        <Text style={styleAccount.Name}> 1</Text>
                        <Image source={require("../../../../assets/edit.png")} style={styleAccount.Edit}></Image>
                    </View>
                </View>
                <View style={styleAccount.containerLastName}>
                    <Text style={styleAccount.labelLastName}> Last name</Text>

                    <View style={styleAccount.containerEditName}>
                        <Text style={styleAccount.LastName}> 2</Text>
                        <Image source={require("../../../../assets/edit.png")} style={styleAccount.Edit}></Image>
                    </View>
                </View>
                <View style={styleAccount.containerResetPassword}>
                    <Text style={styleAccount.TextResetPassword}>
                        Reset password
                    </Text>
                </View>
                <View style={styleAccount.containerLogOut}>
                    <Text style={styleAccount.LogOut}> Log out</Text>
                </View>

            </ImageBackground>
        </View>
    );
}