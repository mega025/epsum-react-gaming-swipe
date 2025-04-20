import {
    ActivityIndicator, Alert,
    FlatList,
    Image,
    ImageBackground, Modal, Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import stylesHome from "../home/StyleHome";
import styleFav from "./StyleFav";
import viewModel from "./ViewModel";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import styleHome from "../home/StyleHome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {FavGame} from "../../../domain/entities/FavGame";
import {AppColors} from "../../theme/AppTheme";
import {useFocusEffect} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import styleAccount from "../account/StyleAccount";
import {CustomTextInput} from "../../components/CustomTextInput";
import {UserInterface} from "../../../domain/entities/User";
import App from "../../../../App";


export function FavScreen(){
    const {favListGames,
        loadFavGames,
        showLoading,
        getPositionGameList,
        deleteGameFromFav} = viewModel.favScreenViewModel();
    const {user} = UseUserLocalStorage()
    const [modalVisibleDeleteGame, setModalVisibleDeleteGame] = useState(false);

    useFocusEffect(
        useCallback(() => {
            console.log('Fav Screen focused');
            if(user?.slug != undefined) {
                console.log(user?.slug)
                loadFavGames(user?.slug)
            }
        }, [user?.slug])
    );

    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

    const favGameRenderItem = useCallback(({ item }: { item: FavGame }) => (
        <View style={stylesFavGameItem.card}>
            <View style={stylesFavGameItem.container}>
                <Image source={{ uri: item.image_url }} style={stylesFavGameItem.image} />
                <Text style={{ ...stylesHome.gameNameText, width: wp("53%"), fontSize: wp("3.5%"), color:"white"}}>{item.name}</Text>
                <TouchableOpacity
                    style={stylesFavGameItem.deleteIcon}
                    onPress={() => {
                        item.id
                            ? setSelectedGameId(item.id)
                            : Toast.show({"type": "error", "text1": "Unexpected error!"})}}
                >
                    <Image source={require("../../../../assets/borrar.png")} style={stylesFavGameItem.deleteIcon} />
                </TouchableOpacity>

                {selectedGameId === item.id && (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => setSelectedGameId(null)}
                    >
                        <View style={styleAccount.centeredView}>
                            <View style={styleAccount.modalView}>
                                <Text style={styleAccount.textPopUp}>DELETE '{item.name}'?</Text>
                                <View style={styleAccount.containerButton}>
                                    <Pressable
                                        style={styleAccount.modalCancelButton}
                                        onPress={() => setSelectedGameId(null)}
                                    >
                                        <Text style={styleAccount.modalButtonTextStyle}>Cancel</Text>
                                    </Pressable>
                                    <Pressable
                                        style={styleAccount.modalAcceptButton}
                                        onPress={async () => {
                                            console.log(item.name)
                                            await deleteGameFromFav(getPositionGameList(item.name), user?.slug || "");
                                            setSelectedGameId(null);
                                        }}
                                    >
                                        <Text style={styleAccount.modalButtonTextStyle}>Accept</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        </View>
    ), [user?.slug, getPositionGameList, selectedGameId]);

    return (
        <View style={styleFav.container}>
            <ImageBackground source={require("../../../../assets/definitiveBackground.jpeg")}
                             style={{width: '100%', height: '100%'}}>
                <View style={styleFav.header}>
                    <Text style={styleFav.title}>Favourite games</Text>
                </View>
                <View style={stylesHome.loadingIconContainer}>
                    <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading}/>
                </View>
                <View style={{ marginBottom: hp("17%"), borderTopColor: "#ffffff", borderTopWidth: 1}}>
                    <FlatList data={favListGames}
                              removeClippedSubviews={true}
                              renderItem={favGameRenderItem}
                              extraData={favListGames}
                              ListFooterComponent={<Text style={{...styleFav.flatListFavGames, display: showLoading ? "none" : "flex"}}>Add more games!</Text>}
                    />
                </View>
                <Toast/>
            </ImageBackground>
        </View>
    );
}

const stylesFavGameItem = StyleSheet.create({
    card: {
        alignSelf: "center",
        justifyContent: "center",
        width: "100%",
        height: hp("18%"),
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },

    container: {
        position: "absolute",
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
    },

    image : {
        width: wp("27%"),
        height: hp("16%"),
        marginStart: wp("2.5%"),
        borderRadius: wp("1.5%"),
    },

    deleteIcon: {
        width: 20,
        height: 20,
        tintColor: AppColors.white,
    }
})