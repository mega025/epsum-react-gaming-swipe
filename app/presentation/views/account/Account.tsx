import {
    ActivityIndicator,
    Alert,
    Image,
    ImageBackground,
    Modal,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import styleAccount from "./StyleAccount";
import {RoundedButton} from "../../components/RoundedButton";
import {ChangePhoto} from "../../components/ChangePhoto";
import viewModel from "./ViewModel";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import React, {useCallback, useEffect, useState} from "react";
import {PruebaButton} from "../../components/ModalEditProfile";
import {CustomTextInputPassword} from "../../components/CustomTextInputPassword";
import {CustomTextInput} from "../../components/CustomTextInput";
import {CustomTextInputInline} from "../../components/CustomTextInputInline";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import stylesHome from "../home/StyleHome";
import styleHome from "../home/StyleHome";
import {UserInterface} from "../../../domain/entities/User";
import Toast from "react-native-toast-message";
import {PasswordsDTO} from "../../../domain/entities/UpdatePasswordDTO";

export function Account({navigation = useNavigation(), route}: PropsStackNavigation){

    const [modalVisibleFirst, setModalVisibleFirst] = useState(false);
    const [modalVisibleLast, setModalVisibleLast] = useState(false);
    const [modalVisiblePassword, setModalVisibleLastPassword] = useState(false);
    const {user} = UseUserLocalStorage()
    const [updatedLastName, setUpdateLastName] = useState("");
    const [updatedFirstName, setUpdateFirstName] = useState("");

    const {
        deleteSession,
        userDB,
        getUserDB,
        showLoading,
        updateUserDetails,
        updatePasswordDTO,
        setUpdatePasswordDTO,
        errorMessage,
        setErrorMessage,
        updateUserPassword
    } =viewModel.AccountViewModel();

    useFocusEffect(
        useCallback(() => {
            if(user?.userId != undefined){
                getUserDB(user?.userId)
                if (userDB != undefined)
                    console.log(userDB)
            }
        }, [user?.userId, JSON.stringify(userDB)])
    )

    useEffect(() => {
        if (errorMessage != "") {
            Toast.show({
                type: "error",
                text1: errorMessage,
            })
            setErrorMessage("")
        }
    }, [errorMessage]);

    return (
        <View style={styleAccount.container}>
            <ImageBackground source={require("../../../../assets/definitiveBackground.jpeg")}
                             style={{width: '100%', height: '100%'}}>
                <View style={stylesHome.loadingIconContainer}>
                    <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading}/>
                </View>
                <View>
                    <Text style={styleAccount.title}>
                        Account details
                    </Text>
                </View>
                <View style={styleAccount.containerEmail}>
                    <Text style={styleAccount.textEmail}>{userDB?.email}</Text>
                </View>
                <View style={styleAccount.containerPhoto}>
                    <ChangePhoto></ChangePhoto>
                </View>
                <View style={styleAccount.containerName}>
                    <Text style={styleAccount.labelName}>Name</Text>

                    <View style={styleAccount.containerEditName}>
                        <Text style={styleAccount.Name}>{userDB?.personalDetails.firstName}</Text>
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
                                            onChangeText={(text) => setUpdateFirstName(text)}
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
                                                onPress={() => {
                                                    if(userDB != undefined) {
                                                        if (updatedFirstName === "") {
                                                            setErrorMessage("Empty fields are not allowed")
                                                            setModalVisibleFirst(!modalVisibleFirst)
                                                        } else {
                                                            const updatedUser: UserInterface = {
                                                                ...userDB,
                                                                personalDetails: {
                                                                    firstName: updatedFirstName,
                                                                    lastName: userDB.personalDetails.lastName,
                                                                    imageUrl: userDB.personalDetails.imageUrl,
                                                                    password: userDB.personalDetails.password
                                                                }
                                                            }
                                                            console.log(updatedUser)
                                                            if (user?.userId != undefined)
                                                                updateUserDetails(updatedUser, user?.userId)

                                                            setModalVisibleFirst(!modalVisibleFirst)
                                                            setUpdateFirstName("")
                                                        }
                                                    }}
                                                }
                                            >
                                                <Text style={styleAccount.textStyle}>Accept</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            <Pressable
                                onPress={() => setModalVisibleFirst(true)}>
                                <Image source={require('../../../../assets/edit.png')} style={styleAccount.editButton}/>
                            </Pressable>

                        </View>
                    </View>
                </View>
                <View style={styleAccount.containerLastName}>
                    <Text style={styleAccount.labelName}>Last name</Text>

                    <View style={styleAccount.containerEditName}>
                        <Text style={styleAccount.Name}>{userDB?.personalDetails.lastName}</Text>
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
                                        <Text style={styleAccount.textPopUp}>Change you last name</Text>
                                        <CustomTextInput
                                            label={"Last name"}
                                            keyboardType={"default"}
                                            secureTextEntry={false}
                                            onChangeText={(text) => setUpdateLastName(text)}
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
                                                onPress={() => {
                                                    if(userDB != undefined) {
                                                        if (updatedLastName === "") {
                                                            setErrorMessage("Empty fields are not allowed")
                                                            setModalVisibleFirst(!modalVisibleFirst)
                                                        } else {
                                                            const updatedUser: UserInterface = {
                                                                ...userDB,
                                                                personalDetails: {
                                                                    firstName: userDB.personalDetails.firstName,
                                                                    lastName: updatedLastName,
                                                                    imageUrl: userDB.personalDetails.imageUrl,
                                                                    password: userDB.personalDetails.password
                                                                }
                                                            }
                                                            console.log(updatedUser)
                                                            if (user?.userId != undefined)
                                                                updateUserDetails(updatedUser, user?.userId)

                                                            setModalVisibleLast(!modalVisibleLast)
                                                            setUpdateFirstName("")
                                                        }
                                                    }}
                                                }
                                            >
                                                <Text style={styleAccount.textStyle}>Accept</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                        <Pressable
                            onPress={() => setModalVisibleLast(true)}>
                            <Image source={require('../../../../assets/edit.png')} style={styleAccount.editButton}/>
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
                                    <Text style={styleAccount.textPopUp}>Change you password</Text>
                                    <CustomTextInputPassword
                                        label={"Current password"}
                                        keyboardType={"default"}
                                        onChangeText={(text) => setUpdatePasswordDTO({
                                            ...updatePasswordDTO,
                                            oldPassword: text,
                                        })}
                                    />
                                    <CustomTextInputPassword
                                        label={"New password"}
                                        keyboardType={"default"}
                                        onChangeText={(text) => setUpdatePasswordDTO({
                                            ...updatePasswordDTO,
                                            newPassword: text,
                                        })}
                                    />
                                    <CustomTextInputPassword
                                        label={"Confirm new password"}
                                        keyboardType={"default"}
                                        onChangeText={(text) => setUpdatePasswordDTO({
                                            ...updatePasswordDTO,
                                            confirmPassword: text,
                                        })}
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
                                            onPress={() => {
                                                if (user?.userId != undefined) {
                                                    const passwordsDTO: PasswordsDTO = {
                                                        oldPassword: updatePasswordDTO.oldPassword,
                                                        newPassword: updatePasswordDTO.newPassword,
                                                    }
                                                    updateUserPassword(passwordsDTO, user?.userId)
                                                    console.log(updatePasswordDTO)
                                                }
                                                setModalVisibleLastPassword(!modalVisiblePassword)

                                            }}
                                        >
                                            <Text style={styleAccount.textStyle}>Accept</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <Pressable
                            onPress={() => setModalVisibleLastPassword(true)}>
                            <Text style={styleAccount.TextResetPassword}>Reset Password</Text>
                        </Pressable>

                    </View>
                </View>
                <View style={styleAccount.containerLogOut}>
                    <Text style={styleAccount.LogOut} onPress={() => {deleteSession().then(r => navigation.navigate("TabViewLoginRegister"))}}> Log out</Text>
                </View>
                <Toast/>
            </ImageBackground>
        </View>
    );
}