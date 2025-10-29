import {
    ImageBackground,
    View,
    Image,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity, FlatList,
} from "react-native";
import stylesHome from "./StyleHome";
import {Text} from "react-native"
import React, {useEffect, useState, useCallback, useRef} from "react";
import {CardItemHandle, TinderCard} from "rn-tinder-card";
import styleHome from "./StyleHome";
import viewModel from "./ViewModel";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {Game, Genre, GenreDTO, Platform} from "../../../domain/entities/Game";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {useNavigation} from "@react-navigation/native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Swiper, type SwiperCardRefType} from "rn-swiper-list";
import {AppColors} from "../../theme/AppTheme";
import {styles} from "react-native-toast-message/lib/src/components/BaseToast.styles";
import {GenreItem} from "../../components/GenreItem";
import {PlatformItem} from "../../components/PlatformItem";
import {NopeButton, stylesNopeButton} from "../../components/NopeButton";
import {LikeButton, stylesLikeButton} from "../../components/LikeButton";
import FilterButton from "../../components/FilterButton";
import {RewindButton} from "../../components/RewindButton";
import {Shadow} from "react-native-shadow-2";
import {FlashList} from "@shopify/flash-list";
import {transformCoverUrl} from "../../utils/TransformCoverUrls";
import {generateNoGamesFoundCard, NO_GAMES_FOUND_LABEL} from "../../utils/NoGameFoundWithThisFilters";


function FiltroComponent(props: {
    onApply: (filters: { category: string | null; platform: string | null }) => Promise<void>,
    selectedGenre: string | null,
    selectedPlatform: string | null
}) {
    return null;
}

export function Home({navigation = useNavigation()}: PropsStackNavigation) {

    const tinderCardsRef = useRef<Array<CardItemHandle | null>>([]);

    const {
        listGames,
        setListGames,
        refillSwipeGames,
        showLoading,
        addGameToFav,
        selectedGenres,
        swipesCounter,
        setSwipesCounter,
        selectedPlatforms,
        refillSwipeGamesWithFilters,
        transformGameIntoFavGameInterface
    } = viewModel.homeViewModel()

    const {user} = UseUserLocalStorage()

    const nullGenre: Genre = {name : "No genres"}
    const nullPlatform: Platform = {name : "No platforms"}

    useEffect(() => {
        refillSwipeGames()
    }, [])

    const renderCard = useCallback((item: Game) => {
        return (
            <View style={{width: "100%", height:"100%"}}>
                <TouchableOpacity onPress={() => item.name !== NO_GAMES_FOUND_LABEL ? navigation.navigate("GameDetails", {gameId : item.id, likeButton: false}) : {}}>
                    <Image
                        source={{
                            uri: item.cover
                                ? transformCoverUrl(item.cover.url)
                                : "https://www.igdb.com/assets/no_cover_show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65.png"
                        }}
                        style={styleHome.image}
                    />
                </TouchableOpacity>
                <View style={{marginVertical: hp("1%"), paddingHorizontal: wp("5%")}}>
                    <View style={stylesHome.firstRowCardContainer}>
                        <Text style={stylesHome.gameNameText}> {item.name}</Text>
                        <Text
                            style={stylesHome.ratingText}>{
                            item.rating
                                ? Math.round((item.rating * 100) / 100).toFixed(0)
                                : "N/A"
                        }</Text>
                    </View>
                    <View style={{marginTop: hp("1%")}}>
                        <FlashList
                            data={item.platforms ? item.platforms : [nullPlatform]}
                                  renderItem={PlatformItem}
                                  horizontal={true}
                                  scrollEnabled={true}
                                  fadingEdgeLength={80}
                                  showsHorizontalScrollIndicator={false}
                                  nestedScrollEnabled={true}/>
                    </View>
                    <View style={styleHome.thirdRowCardContainer}>
                        <FlashList
                            style={{width: "83%"}}
                                  data={item.genres ? item.genres : [nullGenre]}
                                  renderItem={GenreItem}
                                  horizontal={true}
                                  fadingEdgeLength={80}
                                  showsHorizontalScrollIndicator={false}
                                  scrollEnabled={true}
                                  nestedScrollEnabled={true}/>
                        <Text
                            style={styleHome.releaseDateText}>{item.release_dates ? item.release_dates[0].y : ""}</Text>
                    </View>
                </View>
            </View>
        );
    }, []);


    const ref = useRef<SwiperCardRefType>(null);

    const OverlayRight = () => {
        return (
            <View
                style={[
                    stylesHome.overlayLabelContainer,
                    {
                        backgroundColor: AppColors.like,
                        opacity: 0.8
                    },
                ]}
            >
                <Text style={stylesHome.overlayLabelText}>Like</Text>
            </View>
        );
    };
    const OverlayLeft = () => {
        return (
            <View
                style={[
                    stylesHome.overlayLabelContainer,
                    {
                        backgroundColor: AppColors.nope,
                        opacity: 0.8,
                    },
                ]}
            >
                <Text style={stylesHome.overlayLabelText}>Nope</Text>
            </View>
        );
    };
    return (
        <View style={{width: '100%', height: '100%', backgroundColor: AppColors.backgroundColor}}>
            {showLoading ? (
                <>
                    <View style={stylesHome.loadingIconContainer}>
                        <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading} />
                    </View>
                </>
            ):(
                <>
                    <GestureHandlerRootView style={styleHome.cardContainer}>
                        <Swiper
                            ref={ref}
                            data={listGames}
                            cardStyle={styleHome.cardStyle}
                            overlayLabelContainerStyle={styleHome.overlayLabelContainer}
                            swipeVelocityThreshold={1000}
                            renderCard={renderCard}
                            disableTopSwipe={true}
                            disableBottomSwipe={true}
                            onIndexChange={async (index) => {
                                console.log('Current Active index', index, listGames.length);
                            }}
                            onSwipeRight={async (cardIndex) => {
                                console.log('cardIndex', cardIndex);
                                if (user?.slug !== undefined)
                                    if (listGames[cardIndex].name !== NO_GAMES_FOUND_LABEL)
                                        await addGameToFav(transformGameIntoFavGameInterface(listGames[cardIndex]), user.slug)
                                console.log(listGames[cardIndex].name);
                            }}
                            onSwipeLeft={(cardIndex) => {
                                console.log('onSwipeLeft', cardIndex);
                            }}
                            onSwipedAll={() => {
                                setTimeout(async () => {
                                    if (selectedGenres.length === 0 && selectedPlatforms.length === 0) {
                                        await refillSwipeGames()
                                    } else {
                                        const filters = {
                                            genres: selectedGenres,
                                            platforms: selectedPlatforms,
                                        }
                                        await refillSwipeGamesWithFilters(filters);
                                    }
                                }, 350)
                            }}
                            OverlayLabelRight={OverlayRight}
                            OverlayLabelLeft={OverlayLeft}
                        />
                    </GestureHandlerRootView>
                    <View style={styleHome.buttonsContainer}>
                        <NopeButton onPress={() =>  ref.current?.swipeLeft()}></NopeButton>
                        <View style={{gap:hp("2%"), alignItems: "center"}}>
                            <RewindButton onPress={() =>  ref.current?.swipeBack()}></RewindButton>
                            <FilterButton onApply={refillSwipeGamesWithFilters} selectedGenre={selectedGenres} selectedPlatform={selectedPlatforms}  />
                        </View>
                        <LikeButton onPress={() => ref.current?.swipeRight()}></LikeButton>
                    </View>
                </>
            )}
        </View>
    );
}