import {Alert, Image, ImageBackground, Modal, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import styleAccount from "./StyleAccount";
import {ChangePhoto} from "../../components/ChangePhoto";
import viewModel from "./ViewModel";
import {useNavigation} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import React, {useState} from "react";
import {CustomTextInputPassword} from "../../components/CustomTextInputPassword";
import {CustomTextInput} from "../../components/CustomTextInput";

export function Account({navigation = useNavigation(), route}: PropsStackNavigation){

    const [modalVisibleFirst, setModalVisibleFirst] = useState(false);
    const [modalVisibleLast, setModalVisibleLast] = useState(false);
    const [modalVisiblePassword, setModalVisibleLastPassword] = useState(false);

    const {deleteSession} =viewModel.AccountViewModel();
    return (
        <View style={styleAccount.container}>
            <ImageBackground source={require("../../../../assets/definitiveBackground.jpeg")}
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
                        <View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleFirst}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisibleFirst(!modalVisibleFirst);
                                }}
                            >
                                <View style={styleAccount.centeredView}>
                                    <View style={styleAccount.modalView}>
                                        <Text style={styleAccount.textPopUp}> Change you first name </Text>
                                        <CustomTextInput
                                            label={"First name"}
                                            keyboardType={"default"}
                                            secureTextEntry={false}
                                            onChangeText={(text) => alert(text)}
                                        />
                                        <View style={styleAccount.containerButton}>
                                            <Pressable
                                                style={styleAccount.cancelButton}
                                                onPress={() => setModalVisibleFirst(!modalVisibleFirst)}
                                            >
                                                <Text style={styleAccount.textStyle}>Cancel</Text>
                                            </Pressable>
                                            <Pressable
                                                style={styleAccount.acceptButton}
                                                onPress={() => setModalVisibleFirst(!modalVisibleFirst)}
                                            >
                                                <Text style={styleAccount.textStyle}>Accept</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            <Pressable
                                onPress={() => setModalVisibleFirst(true)}>
                                <Image source={require('../../../../assets/edit.png')} style={styleAccount.Edit}/>
                            </Pressable>

                        </View>
                    </View>
                </View>
                <View style={styleAccount.containerLastName}>
                    <Text style={styleAccount.labelLastName}> Last name</Text>

                    <View style={styleAccount.containerEditName}>
                        <Text style={styleAccount.LastName}> 2</Text>
                        <View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleLast}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisibleLast(!modalVisibleLast);
                                }}
                            >
                                <View style={styleAccount.centeredView}>
                                    <View style={styleAccount.modalView}>
                                        <Text style={styleAccount.textPopUp}> Change you last name </Text>
                                        <CustomTextInput
                                            label={"Last name"}
                                            keyboardType={"default"}
                                            secureTextEntry={false}
                                            onChangeText={(text) => alert(text)}
                                        />
                                        <View style={styleAccount.containerButton}>
                                            <Pressable
                                                style={styleAccount.cancelButton}
                                                onPress={() => setModalVisibleLast(!modalVisibleLast)}
                                            >
                                                <Text style={styleAccount.textStyle}>Cancel</Text>
                                            </Pressable>
                                            <Pressable
                                                style={styleAccount.acceptButton}
                                                onPress={() => setModalVisibleLast(!modalVisibleLast)}
                                            >
                                                <Text style={styleAccount.textStyle}>Accept</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                        <Pressable
                            onPress={() => setModalVisibleLast(true)}>
                            <Image source={require('../../../../assets/edit.png')} style={styleAccount.Edit}/>
                        </Pressable>

                        </View>
                    </View>
                </View>
                <View style={styleAccount.containerResetPassword}>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisiblePassword}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisibleLastPassword(!modalVisiblePassword);
                            }}
                        >
                            <View style={styleAccount.centeredView}>
                                <View style={styleAccount.modalView}>
                                    <Text style={styleAccount.textPopUp}> Change you password </Text>
                                    <CustomTextInputPassword
                                        label={"Password current"}
                                        keyboardType={"default"}
                                        onChangeText={(text) => alert(text)}
                                    />
                                    <CustomTextInputPassword
                                        label={"New password"}
                                        keyboardType={"default"}
                                        onChangeText={(text) => alert(text)}
                                    />
                                    <CustomTextInputPassword
                                        label={"Confirm new password"}
                                        keyboardType={"default"}
                                        onChangeText={(text) => alert(text)}
                                    />
                                    <View style={styleAccount.containerButton}>
                                        <Pressable
                                            style={styleAccount.cancelButton}
                                            onPress={() => setModalVisibleLastPassword(!modalVisiblePassword)}
                                        >
                                            <Text style={styleAccount.textStyle}>Cancel</Text>
                                        </Pressable>
                                        <Pressable
                                            style={styleAccount.acceptButton}
                                            onPress={() => setModalVisibleLastPassword(!modalVisiblePassword)}
                                        >
                                            <Text style={styleAccount.textStyle}>Accept</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                        <Pressable
                            onPress={() => setModalVisibleLastPassword(true)}>
                            <Text style={styleAccount.TextResetPassword}> Reset Password</Text>
                        </Pressable>

                    </View>
                </View>
                <View style={styleAccount.containerLogOut}>
                    <Text style={styleAccount.LogOut} onPress={() => {deleteSession().then(r => navigation.navigate("TabViewLoginRegister"))}}> Log out</Text>
                </View>

            </ImageBackground>
        </View>
    );
}