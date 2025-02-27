import {Alert, Image, ImageBackground, Modal, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import styleAccount from "./StyleAccount";
import {RoundedButton} from "../../components/RoundedButton";
import {ChangePhoto} from "../../components/ChangePhoto";
import viewModel from "./ViewModel";
import {useNavigation} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import React, {useState} from "react";
import {PruebaButton} from "../../components/ModalEditProfile";
import {CustomTextInputPassword} from "../../components/CustomTextInputPassword";

export function Account({navigation = useNavigation(), route}: PropsStackNavigation){

    const [modalVisible, setModalVisible] = useState(false);

    const {deleteSession} =viewModel.AccountViewModel();
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
                        <View style={styleAccount.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={styleAccount.centeredView}>
                                <View style={styleAccount.modalView}>
                                    <CustomTextInputPassword label={"Password"}
                                                             keyboardType={"default"}
                                                             onChangeText={(text) => alert("Password")}>
                                    </CustomTextInputPassword>

                                    <Pressable
                                        onPress={() => setModalVisible(!modalVisible)}>
                                       <Image source={require("../../../../assets/x.png")} style={styleAccount.Edit}></Image>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                        <Pressable
                            onPress={() => setModalVisible(true)}>
                            <Image source={require('../../../../assets/edit.png')} style={styleAccount.Edit}/>
                        </Pressable>

                        </View>
                    </View>
                </View>
                <View style={styleAccount.containerResetPassword}>
                    <Text style={styleAccount.TextResetPassword}>
                        Reset password
                    </Text>
                </View>
                <View style={styleAccount.containerLogOut}>
                    <Text style={styleAccount.LogOut} onPress={() => {deleteSession().then(r => navigation.navigate("TabViewLoginRegister"))}}> Log out</Text>
                </View>

            </ImageBackground>
        </View>
    );
}