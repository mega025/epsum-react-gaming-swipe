import {
    ImageBackground,
    View,
    Image,
    Button,
    ActivityIndicator,
    FlatList,
    TouchableWithoutFeedback, Pressable, SafeAreaView, TouchableOpacity
} from "react-native";
import stylesHome from "./StyleHome";
import {XButton} from "../../components/XButton";
import {LikeButton} from "../../components/LikeButton";
import {Text} from "react-native"
import React, {useEffect, useState, useCallback, useRef} from "react";
import {CardItemHandle, TinderCard} from "rn-tinder-card";
import styleHome from "./StyleHome";
import viewModel from "./ViewModel";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {PlatformItem} from "../../components/PlatformItem";
import {GenreItem} from "../../components/GenreItem";
import {Genre, GenreDTO, Platform} from "../../../domain/entities/Game";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {FavGame} from "../../../domain/entities/FavGame";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {useNavigation} from "@react-navigation/native";
import FiltroComponent from "../../components/FilterButton";


export function Home({navigation = useNavigation()}: PropsStackNavigation) {

    const tinderCardsRef = useRef<Array<CardItemHandle | null>>([]);

    const {
        listGames,
        refillSwipeGames,
        transformCoverUrl,
        showLoading,
        addGameToFav,
        selectedGenre,
        activeIndex,
        setActiveIndex,
        swipesCounter,
        setSwipesCounter,
        selectedPlatform,
        showMessageLoading,
        refillSwipeGamesWithFilters,
        setMessageLoading,
        transformGameIntoFavGameInterface
    } = viewModel.homeViewModel()
    const {user} = UseUserLocalStorage()

    const nullGenre: Genre = {name : "N/A"}
    const nullPlatform: Platform = {abbreviation : "N/A"}

    useEffect(() => {
        refillSwipeGames()
    }, [])

    useEffect( () => {
        if(swipesCounter >= 10) {
            setMessageLoading(true);
            setSwipesCounter(0);
            setActiveIndex(9)
            if (selectedGenre == null && selectedPlatform == null)
                refillSwipeGames()
            else {
                const filters = {
                    category: selectedGenre,
                    platform: selectedPlatform,
                }
                refillSwipeGamesWithFilters(filters)
            }
        }
    }, [swipesCounter]);


    const OverlayRight = () => {
        return (
            <View
                style={[
                    stylesHome.overlayLabelContainer,
                    {
                        backgroundColor: 'green',
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
                        backgroundColor: 'red',
                    },
                ]}
            >
                <Text style={stylesHome.overlayLabelText}>Nope</Text>
            </View>
        );
    };
    return (
        <SafeAreaView>
            <ImageBackground source={require("../../../../assets/definitiveBackground.jpeg")}
                             style={{width: '100%', height: '100%'}}>
                <View style={styleHome.wrapper}>
                    {listGames.map((item, index) => {
                        return (
                            <View
                                style={stylesHome.cardContainer}
                                pointerEvents="box-none"
                                key={index}
                            >
                                <TinderCard
                                    ref={(el) => (tinderCardsRef.current[index] = el)}
                                    cardWidth={wp("77%")}
                                    cardHeight={hp("73%")}
                                    disableBottomSwipe={true}
                                    disableTopSwipe={true}
                                    OverlayLabelRight={OverlayRight}
                                    OverlayLabelLeft={OverlayLeft}
                                    cardStyle={stylesHome.card}
                                    onSwipedRight={async () => {
                                        setSwipesCounter(swipesCounter + 1);
                                        setActiveIndex(activeIndex - 1)
                                        console.log(swipesCounter+" "+user?.slug)
                                        if(user?.slug != undefined) {
                                            await addGameToFav(transformGameIntoFavGameInterface(item), user?.slug, user.access_token);
                                        }
                                    }}
                                    onSwipedLeft={() => {
                                        setActiveIndex(activeIndex - 1)
                                        setSwipesCounter(swipesCounter + 1);
                                        console.log(swipesCounter+" "+ activeIndex +" "+listGames.length);
                                    }}

                                >
                                    <TouchableOpacity onPress={() => navigation.navigate("GameDetails", {gameId : item.id, likeButton: false})}>
                                        <Image
                                            source={{
                                                uri: item.cover
                                                    ? transformCoverUrl(item.cover.url)
                                                    : "https://www.igdb.com/assets/no_cover_show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65.png"
                                            }}
                                            style={styleHome.image}
                                        />
                                    </TouchableOpacity>
                                    <View style={{marginHorizontal: 20, marginVertical: hp("0%")}}>
                                        <View style={stylesHome.firstRowCardContainer}>
                                            <Text style={stylesHome.gameNameText}> {item.name}</Text>
                                            <Text
                                                style={stylesHome.ratingText}>{
                                                item.rating
                                                    ? Math.round((item.rating * 100) / 100).toFixed(0)
                                                    : "N/A"
                                            }</Text>
                                        </View>
                                        <View style={styleHome.secondRowCardContainer}>
                                            <FlatList style={styleHome.platformsContainer}
                                                      data={item.platforms ? item.platforms : [nullPlatform]}
                                                      renderItem={PlatformItem}
                                                      horizontal={true}
                                                      scrollEnabled={true}
                                                      fadingEdgeLength={80}
                                                      showsHorizontalScrollIndicator={false}
                                                      nestedScrollEnabled={true}/>
                                        </View>
                                        <View style={styleHome.thirdRowCardContainer}>
                                            <FlatList style={styleHome.genreContainer}
                                                      data={item.genres ? item.genres : [nullGenre]}
                                                      renderItem={GenreItem}
                                                      horizontal={true}
                                                      fadingEdgeLength={80}
                                                      showsHorizontalScrollIndicator={false}
                                                      scrollEnabled={true}
                                                      nestedScrollEnabled={true}/>
                                            <Text
                                                style={{fontSize: 17, fontFamily: "zen_kaku_medium"}}>{item.release_dates ? item.release_dates[0].y : "N/A"}</Text>
                                        </View>
                                    </View>
                                </TinderCard>
                                <View style={styleHome.buttonsContainer}>
                                    <XButton onPress={() =>  tinderCardsRef.current[activeIndex]?.swipeLeft()}></XButton>
                                    <View style={{position:"absolute", start: wp("30%"), top: hp("9%")}}>
                                        <FiltroComponent onApply={refillSwipeGamesWithFilters} selectedGenre={selectedGenre} selectedPlatform={selectedPlatform}  />
                                    </View>
                                    <Image source={require("../../../../assets/logo.png")} style={stylesHome.logo}></Image>
                                    <LikeButton onPress={() => tinderCardsRef.current[activeIndex]?.swipeRight()}></LikeButton>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ImageBackground>
            <Text style={{color: "#FFF",
                fontSize:20,
                zIndex: 99,
                top: hp("45%"),
                bottom: 0,
                left: wp("33%"),
                right: 0,
                position: "absolute",
                fontFamily: "zen_kaku_light",
                display: showMessageLoading ? "flex" : "none"}}>Loading games...</Text>
            <View style={stylesHome.loadingIconContainer}>
                <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading}/>
            </View>
        </SafeAreaView>
    );
}

