import {ImageBackground, View, Image, Button} from "react-native";
import stylesHome from "./StyleHome";
import { XButton} from "../../components/XButton";
import {HeartButton} from "../../components/heartButton";
import {Text} from "react-native"
import React, {useEffect, useState} from "react";
import {TinderCard} from "rn-tinder-card";
import styleHome from "./StyleHome";
import {IgdbApiDelivery} from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";
import {Game} from "../../../domain/entities/Game";
import viewModel from "./ViewModel";
import {styles} from "react-native-toast-message/lib/src/components/BaseToast.styles";


export function Home(){

    const {listGames, setListGames, setGames, transfromCoverUrl} = viewModel.homeViewModel()

    useEffect(()=>{
        setGames()
    }, [])

    useEffect(()=>{
        if (listGames.length == 1) {
            setGames()
        }
    })


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
              <View style={stylesHome.logo}>
                 <Image source={require("../../../../assets/logo.png")} style={stylesHome.logo}></Image>
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
                                  cardWidth={350}
                                  cardHeight={630}
                                  disableBottomSwipe={true}
                                  disableTopSwipe={true}
                                  OverlayLabelRight={OverlayRight}
                                  OverlayLabelLeft={OverlayLeft}
                                  cardStyle={stylesHome.card}
                                  onSwipedRight={() => {
                                    setListGames((listGames) => listGames.slice(1))

                                  }}
                                  onSwipedLeft={() => {
                                    setListGames((listGames) => listGames.slice(1))
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
                                  </View>
                              </TinderCard>
                          </View>
                      );
                  })}
              </View>

                  <XButton onPress={()=>{}}></XButton>
                  <HeartButton></HeartButton>

          </ImageBackground>
      </View>
    );
}