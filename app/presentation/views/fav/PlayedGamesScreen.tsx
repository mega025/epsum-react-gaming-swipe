import {
    ActivityIndicator, Alert,
    FlatList,
    ImageBackground, Modal, Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Image} from "expo-image"
import stylesHome from "../home/StyleHome";
import styleFav from "./StyleFav";
import viewModel from "./ViewModel";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import styleHome from "../home/StyleHome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {FavGame} from "../../../domain/entities/FavGame";
import {AppColors} from "../../theme/AppTheme";
import {useFocusEffect, useIsFocused, useNavigation} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import styleAccount from "../account/StyleAccount";
import {CustomTextInput} from "../../components/CustomTextInput";
import {UserInterface} from "../../../domain/entities/User";
import App from "../../../../App";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {stylesFavGameItem} from "./FavGamesScreen";


export function PlayedGamesScreen({navigation = useNavigation()}: PropsStackNavigation) {
    const {playedListGames,
        loadPlayedGames,
        showLoading,
        addPlayedGame,
        deletePlayedGame,
        deleteGameFromFav} = viewModel.favScreenViewModel();
    const {user} = UseUserLocalStorage()
    const [modalVisibleDeleteGame, setModalVisibleDeleteGame] = useState(false);

    const isFocused = useIsFocused();

    useFocusEffect(
        useCallback(() => {
            if(user?.slug != undefined)
                loadPlayedGames(user?.slug)
        }, [user?.slug])
    );

    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

    const favGameRenderItem = useCallback(({ item }: { item: FavGame }) => (
        <View style={stylesFavGameItem.card}>
            <View style={stylesFavGameItem.container}>
                <TouchableOpacity onPress={() => navigation.navigate("GameDetails", {gameId : item.id_api, likeButton: false})}>
                    <Image
                        contentFit="contain"
                        transition={500}
                        source={{ uri: item.image_url }} style={stylesFavGameItem.image} />
                </TouchableOpacity>
                <Text style={{ ...stylesHome.gameNameText, width: wp("53%"), fontSize: wp("3.5%"), color:"white"}}>{item.name}</Text>
                <TouchableOpacity
                    style={{...stylesFavGameItem.deleteIcon, alignItems:"center", justifyContent:"center"}}
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
                                <Text style={{...styleAccount.textPopUp, color: AppColors.red}}>Delete this game?</Text>
                                <Text style={styleAccount.gameNamePopUp}>{item.name}</Text>
                                <View style={styleAccount.containerButton}>
                                    <TouchableOpacity
                                        style={styleAccount.modalCancelButton}
                                        onPress={() => setSelectedGameId(null)}
                                    >
                                        <Text style={styleAccount.modalButtonTextStyle}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styleAccount.modalAcceptButton}
                                        onPress={async () => {
                                            console.log(item.name)
                                            await deletePlayedGame(item.id_api, user?.slug || "");
                                            setSelectedGameId(null);
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
    ), [user?.slug, selectedGameId, navigation]);

    return (
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
                        <FlatList data={playedListGames}
                                  removeClippedSubviews={true}
                                  renderItem={favGameRenderItem}
                                  extraData={playedListGames}
                                  fadingEdgeLength={80}
                                  ListFooterComponent={<Text style={{...styleFav.footerFavGames, display: showLoading ? "none" : "flex"}}>Play more games!</Text>}
                        />
                    </View>
                </>
            )}
                <Toast/>
        </View>
    );
}