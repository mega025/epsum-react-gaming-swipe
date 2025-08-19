import {RouteProp, useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {
    ActivityIndicator,
    FlatList,
    Image,
    ImageBackground, SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import {styleGameDetails, styleSimilarGame} from "./StyleGameDetails";
import {AppColors} from "../../theme/AppTheme";
import stylesHome from "../home/StyleHome";
import styleHome from "../home/StyleHome";
import React, {useCallback, useEffect} from "react";
import {userDetailsViewModel} from "./ViewModel";
import {RootStackParamsList} from "../../../../App";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {stylesProfilePicture} from "../account/Account";
import {SimilarGame} from "../../../domain/entities/Game";
import {FavGame} from "../../../domain/entities/FavGame";
import {styleSearch} from "../search/StyleSearch";

type GameDetailsRouteProp = RouteProp<RootStackParamsList, "UserDetails">;

export function UserDetails ({navigation = useNavigation()}: PropsStackNavigation,) {
    const route = useRoute<GameDetailsRouteProp>()
    const {userSearch} = route.params
    const {user} = UseUserLocalStorage()

    const {
        showLoading,
        loadUserGames,
        favGames,
        playedGames,
    } = userDetailsViewModel()

    useFocusEffect(
        useCallback(() => {
            if(user?.slug != undefined)
                loadUserGames(userSearch.slug, user?.access_token ? user?.access_token : "");
        }, [user?.access_token])
    );


    const favGameItem = useCallback(({item} : {item:FavGame}) => (
        <View style={styleSimilarGame.card}>
            <TouchableOpacity onPress={() => {navigation.push("GameDetails", {gameId : item.id_api, likeButton: true})}}>
                <Image
                    source={{
                        uri: item.image_url
                            ? item.image_url
                            : "https://www.igdb.com/assets/no_cover_show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65.png"
                    }}
                    style={styleSimilarGame.image}
                />
            </TouchableOpacity>
            <Text style={styleSimilarGame.name}>{item.name}</Text>
        </View>
    ), [navigation])

    return(
        <SafeAreaView>
            <ImageBackground source={require("../../../../assets/definitiveBackground.jpeg")}
                             style={{width: wp("100%"), height: '100%'}}>

                {!showLoading ? (
                    <>
                        <ScrollView style={{paddingBottom: hp("60%")}} showsVerticalScrollIndicator={false}>
                            <View style={{...styleGameDetails.header, flexDirection: "column", paddingBottom: 0, alignItems:"center"}}>
                                <TouchableOpacity onPress={navigation.goBack}>
                                    <Image source={require("../../../../assets/go-back-icon.png")}
                                           style={{...styleGameDetails.goBackIcon, bottom: hp("3"), end: wp("40%")}} />
                                </TouchableOpacity>
                                <View style={{width: wp("100%"), alignItems: "center"}}>
                                    <Image source={userSearch.image ? {uri: `http://192.168.1.91:8000${userSearch.image}`} : require("../../../../assets/account-image.jpg")}
                                            style={stylesProfilePicture.photo}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{...styleGameDetails.name, height: "auto", lineHeight: 40, paddingBottom: hp("2%")}}>{userSearch?.name} {userSearch?.last_name}</Text>
                                </View>
                            </View>
                            <View style={{paddingHorizontal: wp("3%")}}>
                                {favGames.length > 0 && (
                                    <View>
                                        <Text style={{...styleGameDetails.infoTitles, textAlign: "center"}}>Favorites games</Text>
                                        <FlatList
                                            data={favGames}
                                            renderItem={favGameItem}
                                            fadingEdgeLength={50}
                                            keyExtractor={(item) => item.id_api.toString()}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                        />
                                    </View>
                                )}
                                {playedGames.length > 0 && (
                                    <View>
                                        <Text style={{...styleGameDetails.infoTitles, textAlign: "center", marginTop: wp("0%")}}>Played games</Text>
                                        <FlatList
                                            data={playedGames}
                                            renderItem={favGameItem}
                                            fadingEdgeLength={50}
                                            keyExtractor={(item) => item.id_api.toString()}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                        />
                                    </View>
                                )}

                                {playedGames.length == 0 && favGames.length == 0 && (
                                    <View>
                                        <Text style={{...styleSearch.emptyFlatListText, fontSize: wp("3.8%"), textAlign: "center", margin: wp("4%")}}>Empty library</Text>
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                    </>
                ) : (
                    <View style={stylesHome.loadingIconContainer}>
                        <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading}/>
                    </View>
                )}
            </ImageBackground>
        </SafeAreaView>
    )
}
