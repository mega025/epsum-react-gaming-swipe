import {
    ImageBackground,
    View,
    Image,
    Button,
    ActivityIndicator,
    FlatList,
    TouchableWithoutFeedback
} from "react-native";
import stylesHome from "./StyleHome";
import { XButton} from "../../components/XButton";
import {LikeButton} from "../../components/LikeButton";
import {Text} from "react-native"
import React, {useEffect, useState, useCallback, useRef} from "react";
import {CardItemHandle, TinderCard} from "rn-tinder-card";
import styleHome from "./StyleHome";
import viewModel from "./ViewModel";
import {PlatformItem} from "../../components/PlatformItem";
import {Gesture, GestureDetector, ScrollView} from "react-native-gesture-handler";
import {GenreItem} from "../../components/GenreItem";


export function Home() {

    const {listGames, setListGames, setGames, transfromCoverUrl, showLoading} = viewModel.homeViewModel()
    const ref = useRef<CardItemHandle>();
    const [swipesCounter, setSwipesCounter] = useState(0);

    useEffect(()=>{
        setGames()
    }, [])

    useEffect(() => {
        if(swipesCounter == 6){
            setGames();
            setSwipesCounter(0)
        }

    });

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
      <View>
          <ImageBackground source={require("../../../../assets/background.png")}
                           style={{width: '100%', height: '100%'}}>
              <View style={stylesHome.loadingIconContainer}>
                  <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading}/>
              </View>
              <View style={styleHome.wrapper}>
                  {listGames.map((item, index) => {
                      return (
                          <View
                              style={stylesHome.cardContainer}
                              pointerEvents="box-none"
                              key={index}
                          >
                              <TinderCard
                                  cardWidth={330}
                                  cardHeight={630}
                                  disableBottomSwipe={true}
                                  disableTopSwipe={true}
                                  OverlayLabelRight={OverlayRight}
                                  OverlayLabelLeft={OverlayLeft}
                                  cardStyle={stylesHome.card}
                                  onSwipedRight={() => {
                                      setSwipesCounter(swipesCounter + 1);

                                  }}
                                  onSwipedLeft={() => {
                                      setSwipesCounter(swipesCounter + 1);
                                  }}
                              >
                                  <Image
                                      source={{
                                          uri: item.cover
                                              ? transfromCoverUrl(item.cover.url)
                                              : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
                                      }}
                                      style={styleHome.image}
                                  />
                                  <View style={{marginHorizontal: 20, marginVertical: 15}}>
                                      <View style={stylesHome.firstRowCardContainer}>
                                          <Text style={stylesHome.gameNameText}> {item.name}</Text>
                                          <Text style={stylesHome.ratingText}>{Math.round((item.rating * 100)/100).toFixed(0)}</Text>
                                      </View>
                                      <View style={styleHome.secondRowCardContainer} >
                                          <FlatList style={styleHome.platformsContainer}
                                                    data={item.platforms}
                                                    renderItem={PlatformItem}
                                                    horizontal={true}
                                                    scrollEnabled={true}
                                                    nestedScrollEnabled={true}/>
                                      </View>
                                      <View style={styleHome.thirdRowCardContainer} >
                                          <FlatList style={styleHome.genreContainer}
                                                    data={item.genres}
                                                    renderItem={GenreItem}
                                                    horizontal={true}
                                                    scrollEnabled={true}
                                                    nestedScrollEnabled={true}/>
                                          <Text style={{fontSize: 15}}>{item.release_dates ? item.release_dates[0].y : "N/A"}</Text>
                                      </View>
                                  </View>
                              </TinderCard>
                          </View>
                      );
                  })}
              </View>
              <View>
                  <Image source={require("../../../../assets/logo.png")} style={stylesHome.logo}></Image>
                  <XButton onPress={() => ref.current?.swipeLeft}></XButton>
                  <LikeButton></LikeButton>
              </View>

          </ImageBackground>
      </View>
    );
}

