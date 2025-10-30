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
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import styleAccount from "../account/StyleAccount";
import {PropsStackNavigation} from "../../interfaces/StackNav";


export function FavGamesScreen({navigation = useNavigation()}: PropsStackNavigation) {
    const {favListGames,
        loadFavGames,
        showLoading,
        addPlayedGame,
        deleteGameFromFav} = viewModel.favScreenViewModel();
    const {user} = UseUserLocalStorage()
    const [modalVisibleDeleteGame, setModalVisibleDeleteGame] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if(user?.slug != undefined) {
                loadFavGames(user?.slug);
            }
        }, [user?.slug])
    );

    const [selectedDeleteGameId, setSelectedDeleteGameId] = useState<number | null>(null);
    const [selectedPlayedGameId, setSelectedPlayedGameId] = useState<number | null>(null);

    const favGameRenderItem = useCallback(({ item }: { item: FavGame }) => (
        <View style={stylesFavGameItem.card}>
            <View style={stylesFavGameItem.container}>
                <TouchableOpacity onPress={() => navigation.navigate("GameDetails", {gameId : item.id_api, likeButton: true})}>
                    <Image source={{ uri: item.image_url }} style={stylesFavGameItem.image} />
                </TouchableOpacity>
                <Text style={{ ...stylesHome.gameNameText, width: wp("46%")}}>{item.name}</Text>
                <TouchableOpacity
                    style={{...stylesFavGameItem.deleteIcon, alignItems:"center", justifyContent:"center"}}
                    onPress={() => {
                        item.id
                            ? setSelectedPlayedGameId(item.id)
                            : Toast.show({"type": "error", "text1": "Unexpected error!"})}}
                >
                    <Image source={require("../../../../assets/check-icon.png")} style={{...stylesFavGameItem.deleteIcon, tintColor: AppColors.green}} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{...stylesFavGameItem.deleteIcon, alignItems:"center", justifyContent:"center"}}
                    onPress={() => {
                        item.id
                            ? setSelectedDeleteGameId(item.id)
                            : Toast.show({"type": "error", "text1": "Unexpected error!"})}}
                >
                    <Image source={require("../../../../assets/borrar.png")} style={stylesFavGameItem.deleteIcon} />
                </TouchableOpacity>

                {selectedDeleteGameId === item.id && (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => setSelectedDeleteGameId(null)}
                    >
                        <View style={styleAccount.centeredView}>
                            <View style={styleAccount.modalView}>
                                <Text style={{...styleAccount.textPopUp, color: AppColors.red}}>Delete this game?</Text>
                                <Text style={styleAccount.gameNamePopUp}>{item.name}</Text>
                                <View style={styleAccount.containerButton}>
                                    <TouchableOpacity
                                        style={styleAccount.modalCancelButton}
                                        onPress={() => setSelectedDeleteGameId(null)}
                                    >
                                        <Text style={styleAccount.modalButtonTextStyle}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styleAccount.modalAcceptButton}
                                        onPress={async () => {
                                            console.log(item.name)
                                            await deleteGameFromFav(item.id_api, user?.slug || "");
                                            setSelectedDeleteGameId(null);
                                        }}
                                    >
                                        <Text style={styleAccount.modalButtonTextStyle}>Accept</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
                {selectedPlayedGameId === item.id && (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => setSelectedPlayedGameId(null)}
                    >
                        <View style={styleAccount.centeredView}>
                            <View style={styleAccount.modalView}>
                                <Text style={{...styleAccount.textPopUp, color: AppColors.green}}>Do you have this game?</Text>
                                <Text style={styleAccount.gameNamePopUp}>{item.name}</Text>
                                <View style={styleAccount.containerButton}>
                                    <TouchableOpacity
                                        style={styleAccount.modalCancelButton}
                                        onPress={() => setSelectedPlayedGameId(null)}
                                    >
                                        <Text style={styleAccount.modalButtonTextStyle}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styleAccount.modalAcceptButton}
                                        onPress={async () => {
                                            console.log(item.name)
                                            await addPlayedGame(user?.slug ? user?.slug : "", item);
                                            setSelectedPlayedGameId(null);
                                        }}
                                    >
                                        <Text style={styleAccount.modalButtonTextStyle}>Accept</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        </View>
    ), [user?.slug, selectedDeleteGameId, selectedPlayedGameId, navigation]);

    return (
        <View style={styleFav.container}>
            <View style={{width: '100%', height: '100%', backgroundColor: AppColors.backgroundColor}}>
                {showLoading ? (
                    <>
                        <View style={stylesHome.loadingIconContainer}>
                            <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading}/>
                        </View>
                    </>
                ):(
                    <>
                        <View style={{height:"100%"}}>
                            <FlatList data={favListGames}
                                      removeClippedSubviews={true}
                                      renderItem={favGameRenderItem}
                                      extraData={favListGames}
                                      fadingEdgeLength={80}
                                      ListFooterComponent={<Text style={{...styleFav.footerFavGames, display: showLoading ? "none" : "flex"}}>Add more games!</Text>}
                            />
                        </View>
                    </>
                )}
                <Toast/>
            </View>
        </View>
    );
}

export const stylesFavGameItem = StyleSheet.create({
    card: {
        justifyContent: "center",
        width: "100%",
        height: hp("18%"),
    },

    container: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },

    image : {
        width: wp("27%"),
        height: hp("16%"),
        marginStart: wp("2.5%"),
        borderRadius: wp("1.5%"),
    },

    deleteIcon: {
        width: wp("8%"),
        height: wp("8%"),
        padding: wp("2%"),
        tintColor: AppColors.white,
    }
})