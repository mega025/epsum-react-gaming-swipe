import {
    ActivityIndicator,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Image} from "expo-image"
import {RouteProp, useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamsList} from "../../../../App";
import styleHome from "../home/StyleHome";
import React, {useCallback, useEffect} from "react";
import viewModelHome, {homeViewModel} from "../home/ViewModel"
import {gameDetailsViewModel} from "./ViewModel";
import stylesHome from "../home/StyleHome";
import {styles} from "react-native-toast-message/lib/src/components/BaseToast.styles";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {PlatformItem} from "../../components/PlatformItem";
import {Cover, Game, GameDetailsInterface, Genre, Platform, SimilarGame} from "../../../domain/entities/Game";
import {GenreItem} from "../../components/GenreItem";
import YoutubePlayer from "react-native-youtube-iframe";
import {styleGameDetails, styleSimilarGame} from "./StyleGameDetails";
import Toast from "react-native-toast-message";
import viewModelFav from "../fav/ViewModel";
import {styleSearch, styleSearchGameItem} from "../search/StyleSearch";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {AppColors} from "../../theme/AppTheme";
import {FlashList} from "@shopify/flash-list";
import {
    NO_IMAGE_URL,
    transformBig2xCoverUrl,
    transformCoverUrl,
    transformSmallCoverUrl
} from "../../utils/TransformCoverUrls";
import {HorizontalFlashList} from "../../components/HorizontalFlashList";
import PagerView from "react-native-pager-view";
import stylesAuthViews from "../auth/StylesAuthViews";

type GameDetailsRouteProp = RouteProp<RootStackParamsList, "GameDetails">;

export function GameDetails({navigation = useNavigation()}: PropsStackNavigation) {
    const {user} = UseUserLocalStorage()
    const {
        gameDetails,
        loadGameDetails,
        showLoading
    } = gameDetailsViewModel()

    const {
        addGameToFav,
        transformGameIntoFavGameInterface,
    } = viewModelHome.homeViewModel()

    const {
        deleteGameFromFav,
        loadFavGames,
        favListGames,
        loadPlayedGames,
        playedListGames,
    } = viewModelFav.favScreenViewModel()

    useFocusEffect(
        useCallback(() => {
            if(user?.slug != undefined) {
                loadFavGames(user?.slug)
                loadPlayedGames(user?.slug)
            }
        }, [user?.slug])
    );

    const checkIfGameFromApiIsLiked = (gameId: number) => {
        return favListGames.some(game => game.id_api === gameId);
    }

    const checkIfGameFromApiIsPlayed = (gameId: number) => {
        return playedListGames.some(game => game.id_api === gameId);
    }

    const route = useRoute<GameDetailsRouteProp>()
    const {gameId} = route.params
    const {likeButton} = route.params

    useEffect(() => {
        loadGameDetails(gameId)
        console.log(likeButton)
    }, []);

    const nullGenre: Genre = {name : "No genres registered"}
    const nullPlatform: Platform = {name : "No platforms registered"}

    const similarGameItem = useCallback(({item} : {item:SimilarGame}) => (
        <View style={styleSimilarGame.card}>
            <TouchableOpacity onPress={() => {navigation.push("GameDetails", {gameId : item.id, likeButton: true})}}>
                <Image
                    source={{
                        uri: item.cover
                            ? transformSmallCoverUrl(item.cover.url)
                            : "https://www.igdb.com/assets/no_cover_show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65.png"
                    }}
                    contentFit="contain"
                    transition={250}
                    style={styleSimilarGame.image}
                />
            </TouchableOpacity>
            <Text style={styleSimilarGame.name}>{item.name}</Text>
        </View>
        ), [navigation])

    const defaultDataWith6Colors: Cover[] = [
        {
            url: NO_IMAGE_URL,
        },
        {
            url: NO_IMAGE_URL,
        },
        {
            url:  NO_IMAGE_URL,
        },
    ]

    return(
            <View style={{width: '100%', height: '100%', backgroundColor: AppColors.backgroundColor}}>
                {!showLoading ? (
                    <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{...styleSearch.logoContainer, position:"absolute", zIndex:99}}>
                            <Image transition={100} priority={"high"}
                                   source={require("../../../../assets/igdb-logo.webp")} style={styleSearch.logo} />
                        </View>
                        <View style={styleGameDetails.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styleGameDetails.goBackIconTouchable}>
                                <Image source={require("../../../../assets/go-back-icon.png")}
                                       style={styleGameDetails.goBackIcon}/>
                            </TouchableOpacity>
                            <Image
                                source={{
                                    uri: gameDetails?.cover
                                        ? transformBig2xCoverUrl(gameDetails.cover.url)
                                        : NO_IMAGE_URL,
                                }}
                                contentFit="contain"
                                priority={"high"}
                                transition={150}
                                style={styleGameDetails.image}
                            />
                            <View style={{flex: 2}}>
                                <Text style={styleGameDetails.name}>{gameDetails?.name}</Text>
                                <View style={{flexDirection: "row", gap: wp("11%")}}>
                                    <Text style={styleGameDetails.rating}>{gameDetails?.rating ? gameDetails?.rating.toFixed(1) : "No rate"}</Text>
                                    <Text style={styleGameDetails.rating}>{gameDetails?.release_dates ? gameDetails?.release_dates[0].y : "TBD"}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{paddingHorizontal: wp("4%")}}>
                            <View style={{flexDirection: "row", gap:wp("36%")}}>
                                <Text style={styleGameDetails.infoTitles}>Involved companies</Text>
                                {likeButton && (
                                <TouchableOpacity onPress={async () => {
                                    if (!checkIfGameFromApiIsLiked(gameDetails?.id || 0)) {
                                        try {
                                            if (!checkIfGameFromApiIsPlayed(gameDetails?.id || 0)) {
                                                await addGameToFav(transformGameIntoFavGameInterface(gameDetails), user?.slug || "");
                                                await loadFavGames(user?.slug || "")
                                            }
                                        } catch (error) {
                                            Toast.show({
                                                "type": "error",
                                                "text1": "Error while trying to save the game",
                                            })
                                        }
                                    } else {
                                        try {
                                            await deleteGameFromFav(
                                                gameDetails ? gameDetails?.id : 0,
                                                user?.slug ? user?.slug : "",
                                            );
                                            await loadFavGames(user?.slug ? user?.slug : "")

                                        } catch (error) {
                                            Toast.show({
                                                "type": "error",
                                                "text1": "Error while trying to delete game",
                                            })
                                        }
                                    }
                                }}>
                                    <Image
                                        contentFit={"contain"}
                                        style={styleGameDetails.fav} source={
                                        checkIfGameFromApiIsLiked(gameDetails?.id || 0)
                                            ? require("../../../../assets/filled-heart.png")
                                            : checkIfGameFromApiIsPlayed(gameDetails?.id || 0) ? require("../../../../assets/check-icon.png") : require("../../../../assets/heart.png")}/>
                                </TouchableOpacity>
                            )}
                            </View>
                            <FlashList
                                data={gameDetails?.involved_companies}
                                scrollEnabled={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={{flexDirection: "row", alignSelf:"flex-start", alignItems:"center", gap:wp("3%")}} onPress={() => navigation.push("CompanyDetails", {companyId: item.company.id})}>
                                        <Text style={styleGameDetails.involvedCompany}>{item.company.name}</Text>
                                        <Image priority={"high"} source={require("../../../../assets/url-icon.png")}
                                        style={{width: wp("3.5%"), height: hp("1.6%"), tintColor: AppColors.white}}/>
                                    </TouchableOpacity>
                                )}/>

                            <Text style={styleGameDetails.infoTitles}>Platforms</Text>
                            <HorizontalFlashList style={{width: wp("90")}}
                                                 data={gameDetails?.platforms ? gameDetails?.platforms : [nullPlatform]}
                                                 renderItem={PlatformItem}
                            />
                            <Text style={styleGameDetails.infoTitles}>Genres</Text>
                            <HorizontalFlashList style={{width: wp("90")}}
                                                 data={gameDetails?.genres ? gameDetails?.genres : [nullGenre]}
                                                 renderItem={GenreItem}
                            />
                            {gameDetails?.release_dates && (
                                <View>
                                    <Text style={styleGameDetails.infoTitles}>Release date</Text>
                                    <Text style={{...styleGameDetails.summary, lineHeight: 20}}>{gameDetails?.release_dates[0].human}</Text>
                                </View>
                            )}
                            <Text style={styleGameDetails.infoTitles}>Summary</Text>
                            <Text style={styleGameDetails.summary}>{gameDetails?.summary ? gameDetails?.summary : "--"}</Text>
                            {gameDetails?.storyline && (
                                <View>
                                    <Text style={styleGameDetails.infoTitles}>Story line</Text>
                                    <Text style={styleGameDetails.summary}>{gameDetails?.storyline ? gameDetails?.storyline : "--"}</Text>
                                </View>
                            )}
                            {gameDetails?.screenshots && (
                                <View>
                                    <Text style={styleGameDetails.infoTitles}>Screenshots</Text>
                                    <PagerView style={{flex:1, height: hp("25%")}}
                                               initialPage={0}
                                               overdrag={true}
                                    >
                                        {gameDetails?.screenshots.map ((screenshot, index) => (
                                            <View key={index}
                                                style={{paddingHorizontal: wp("1%")}} >
                                            <Image
                                                style={{width:"100%", height:hp("25%"), borderRadius:15}}
                                                transition={250}
                                                priority={"normal"}
                                                source={{uri: transformCoverUrl(screenshot.url)}}/>
                                            </View>
                                        ))}
                                    </PagerView>
                                    {gameDetails?.screenshots.length > 1 && (
                                        <Text style={{...stylesAuthViews.passwordHint, textAlign:"right"}}>Swipe to see more</Text>
                                    )}
                                </View>
                            )}
                            {gameDetails?.videos && (
                                <View style={{marginTop: hp("2%"), marginBottom: hp("-3%")}}>
                                    <YoutubePlayer
                                        height={250}
                                        videoId={gameDetails?.videos[0].video_id}
                                    />
                                </View>
                            )}

                            {gameDetails?.similar_games && (
                                <View>
                                    <Text style={styleGameDetails.infoTitles}>Similar games</Text>
                                    <HorizontalFlashList data={gameDetails?.similar_games}
                                                         renderItem={similarGameItem}/>
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
            </View>
    )
}