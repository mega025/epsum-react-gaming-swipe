import {
    ActivityIndicator,
    Alert,
    Image,
    ImageBackground,
    Modal,
    Pressable, SafeAreaView, StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import styleAccount from "./StyleAccount";
import viewModel from "./ViewModel";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import React, {useCallback, useEffect, useState} from "react";
import {CustomTextInputPassword} from "../../components/CustomTextInputPassword";
import {CustomTextInput} from "../../components/CustomTextInput";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import stylesHome from "../home/StyleHome";
import styleHome from "../home/StyleHome";
import {UpdateUserDTO, UserInterface} from "../../../domain/entities/User";
import Toast from "react-native-toast-message";
import {PasswordsDTO} from "../../../domain/entities/UpdatePasswordDTO";
import * as ImagePickerExpo from "expo-image-picker";
import {AppColors} from "../../theme/AppTheme";
import styles from "../auth/StylesAuthViews";
import {removeUserUseCase} from "../../../domain/usesCases/userLocal/removeUser";

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
            if(user?.slug != undefined){
                getUserDB(user?.slug, user?.access_token)
                if (userDB != undefined)
                    console.log(userDB)
            }
        }, [user?.slug, JSON.stringify(userDB)])
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

    const selectImage =async () => {
        const { status } = await ImagePickerExpo.requestMediaLibraryPermissionsAsync()

        if (status !== "granted") {
            alert("Permission denied")
            return;
        }

        let result = await ImagePickerExpo.launchImageLibraryAsync({
            mediaTypes:ImagePickerExpo.MediaTypeOptions.All,
            allowsEditing: true,
            aspect:[1,1],
            quality:1
        });

        console.log("result", result);
        if (!result.canceled) {
            if (userDB != undefined) {
                const selectedAsset = result.assets[0]
                const formData = new FormData();
                formData.append('image', {
                    uri: selectedAsset.uri,
                    name: selectedAsset.fileName,
                    type: selectedAsset.mimeType,
                } as any);
                console.log(formData);

                if(user?.slug != undefined){
                    await updateUserDetails(user?.slug, user?.access_token, formData)
                    await getUserDB(user?.slug, user?.access_token)
                    console.log("aaaa")
                }
            }
        }
    }

    return (
        <SafeAreaView style={styleAccount.container}>
            <ImageBackground source={require("../../../../assets/definitiveBackground.jpeg")}
                             style={{width: '100%', height: '100%'}}>
                {!showLoading ? (
                    <>
                        <View>
                            <Text style={styleAccount.title}>
                                Account details
                            </Text>
                        </View>
                        <View style={styleAccount.containerEmail}>
                            <Text style={styleAccount.textEmail}>{userDB?.email}</Text>
                        </View>
                        <View style={styleAccount.containerPhoto}>
                            <View style={stylesProfilePicture.container}>
                                <View style={stylesProfilePicture.containerPhoto}>
                                    <Image style={stylesProfilePicture.photo}  source={userDB?.image ? {uri: `http://192.168.1.91:8000${userDB?.image}`} : require("../../../../assets/account-image.jpg")}
                                    />
                                </View>
                                <TouchableOpacity style={stylesProfilePicture.changePhotoButton} onPress={selectImage}>
                                    <Text style={stylesProfilePicture.changePhotoButtonText}>Change photo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styleAccount.containerName}>
                            <Text style={styleAccount.labelName}>Name</Text>

                            <View style={styleAccount.containerEditName}>
                                <Text style={styleAccount.Name}>{userDB?.name}</Text>
                                <View>
                                    <Modal
                                        animationType="fade"
                                        transparent={true}
                                        visible={modalVisibleFirst}
                                        onRequestClose={() => {
                                            Alert.alert("Modal has been closed.");
                                            setModalVisibleFirst(!modalVisibleFirst);
                                        }}
                                    >
                                        <View style={styleAccount.centeredView}>
                                            <View style={styleAccount.modalView}>
                                                <Text style={styleAccount.textPopUp}> Change your first name </Text>
                                                <CustomTextInput
                                                    label={"First name"}
                                                    keyboardType={"default"}
                                                    maxLenght={15}
                                                    secureTextEntry={false}
                                                    onChangeText={(text) => setUpdateFirstName(text)}
                                                />
                                                <Text style={styleAccount.charactersCounter}>{updatedFirstName.length}/15</Text>
                                                <View style={styleAccount.containerButton}>
                                                    <Pressable
                                                        style={styleAccount.modalCancelButton}
                                                        onPress={() => setModalVisibleFirst(!modalVisibleFirst)}
                                                    >
                                                        <Text style={styleAccount.modalButtonTextStyle}>Cancel</Text>
                                                    </Pressable>
                                                    <Pressable
                                                        style={styleAccount.modalAcceptButton}
                                                        onPress={() => {
                                                            if(userDB != undefined) {
                                                                if (updatedFirstName === "") {
                                                                    setErrorMessage("Empty fields are not allowed")
                                                                    setModalVisibleFirst(!modalVisibleFirst)
                                                                } else {
                                                                    const data: UpdateUserDTO = {
                                                                        name: updatedFirstName
                                                                    }
                                                                    console.log(data)
                                                                    if (user?.slug != undefined)
                                                                        updateUserDetails(user?.slug, user?.access_token, data)

                                                                    userDB.name = updatedFirstName
                                                                    setModalVisibleFirst(!modalVisibleFirst)
                                                                    setUpdateFirstName("")
                                                                }
                                                            }}
                                                        }
                                                    >
                                                        <Text style={styleAccount.modalButtonTextStyle}>Accept</Text>
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
                                <Text style={styleAccount.Name}>{userDB?.last_name}</Text>
                                <View>
                                    <Modal
                                        animationType="fade"
                                        transparent={true}
                                        visible={modalVisibleLast}
                                        onRequestClose={() => {
                                            Alert.alert("Modal has been closed.");
                                            setModalVisibleLast(!modalVisibleLast);
                                        }}
                                    >
                                        <View style={styleAccount.centeredView}>
                                            <View style={styleAccount.modalView}>
                                                <Text style={styleAccount.textPopUp}>Change your last name</Text>
                                                <CustomTextInput
                                                    label={"Last name"}
                                                    keyboardType={"default"}
                                                    maxLenght={15}
                                                    secureTextEntry={false}
                                                    onChangeText={(text) => setUpdateLastName(text)}
                                                />
                                                <Text style={styleAccount.charactersCounter}>{updatedLastName.length}/15</Text>
                                                <View style={styleAccount.containerButton}>
                                                    <Pressable
                                                        style={styleAccount.modalCancelButton}
                                                        onPress={() => setModalVisibleLast(!modalVisibleLast)}
                                                    >
                                                        <Text style={styleAccount.modalButtonTextStyle}>Cancel</Text>
                                                    </Pressable>
                                                    <Pressable
                                                        style={styleAccount.modalAcceptButton}
                                                        onPress={() => {
                                                            if(userDB != undefined) {
                                                                if (updatedLastName === "") {
                                                                    setErrorMessage("Empty fields are not allowed")
                                                                    setModalVisibleLast(!modalVisibleLast)
                                                                } else {
                                                                    const data: UpdateUserDTO = {
                                                                        last_name: updatedLastName
                                                                    }
                                                                    console.log(data)
                                                                    if (user?.slug != undefined)
                                                                        updateUserDetails(user?.slug, user?.access_token, data)

                                                                    userDB.last_name = updatedLastName
                                                                    setModalVisibleLast(!modalVisibleLast)
                                                                    setUpdateLastName("")
                                                                }
                                                            }}
                                                        }
                                                    >
                                                        <Text style={styleAccount.modalButtonTextStyle}>Accept</Text>
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
                                    animationType="fade"
                                    transparent={true}
                                    visible={modalVisiblePassword}
                                    onRequestClose={() => {
                                        Alert.alert("Modal has been closed.");
                                        setModalVisibleLastPassword(!modalVisiblePassword);
                                    }}
                                >
                                    <View style={styleAccount.centeredView}>
                                        <View style={styleAccount.modalView}>
                                            <Text style={styleAccount.textPopUp}>Change your password</Text>
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
                                            <Text style={styleAccount.passwordHint}>Password must have at least 8 characters</Text>
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
                                                    style={styleAccount.modalCancelButton}
                                                    onPress={() => setModalVisibleLastPassword(!modalVisiblePassword)}
                                                >
                                                    <Text style={styleAccount.modalButtonTextStyle}>Cancel</Text>
                                                </Pressable>
                                                <Pressable
                                                    style={styleAccount.modalAcceptButton}
                                                    onPress={() => {
                                                        if (user?.slug != undefined) {
                                                            const passwordsDTO: PasswordsDTO = {
                                                                oldPassword: updatePasswordDTO.oldPassword,
                                                                newPassword: updatePasswordDTO.newPassword,
                                                            }
                                                            updateUserPassword(user?.slug, user?.access_token, passwordsDTO)
                                                            console.log(updatePasswordDTO)
                                                        }
                                                        setModalVisibleLastPassword(!modalVisiblePassword)

                                                    }}
                                                >
                                                    <Text style={styleAccount.modalButtonTextStyle}>Accept</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                                <Pressable
                                    onPress={() => setModalVisibleLastPassword(true)}>
                                    <Text style={styleAccount.TextResetPassword}>Change Password</Text>
                                </Pressable>

                            </View>
                        </View>
                        <View style={styleAccount.containerLogOut}>
                            <Text style={styleAccount.LogOut} onPress={() => {
                                deleteSession().then(r => navigation.replace("TabViewLoginRegister"))}
                            }> Log out</Text>
                        </View>
                        <Toast/>
                    </>
                ) : (
                    <>
                        <View style={stylesHome.loadingIconContainer}>
                            <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading}/>
                        </View>
                    </>
                )}
            </ImageBackground>
        </SafeAreaView>
    );
}

export const stylesProfilePicture =StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center",
    },
    containerPhoto:{
        alignItems:"center",

    },
    photo:{
        width:100,
        height:100,
        borderRadius:50,
        resizeMode: "contain",
        alignItems:"center",
    },
    changePhotoButton:{
        backgroundColor:AppColors.darkPink,
        width:160,
        height:35,
        alignSelf:"center",
        borderRadius:25,
        marginTop:110,

    },
    changePhotoButtonText:{
        alignSelf:"center",
        verticalAlign:"middle",
        fontFamily:"zen_kaku_regular",
        height: 30,
        color:AppColors.white,
    }
})