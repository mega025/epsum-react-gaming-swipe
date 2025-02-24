import {ImageBackground, View, Image, Button} from "react-native";
import stylesHome from "./StyleHome";
import { XButton} from "../../components/XButton";
import {HeartButton} from "../../components/heartButton";
import {Text} from "react-native"
import React from "react";
import {TinderCard} from "rn-tinder-card";
import styleHome from "./StyleHome";
import {IgdbApiDelivery} from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";


export function Home(){

    IgdbApiDelivery.post()

    const data = [
        'https://images.unsplash.com/photo-1681896616404-6568bf13b022?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
        'https://images.unsplash.com/photo-1681871197336-0250ed2fe23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
        'https://images.unsplash.com/photo-1681238091934-10fbb34b497a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1282&q=80',
    ];

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
                  {data.map((item, index) => {
                      return (
                          <View
                              style={stylesHome.cardContainer}
                              pointerEvents="box-none"
                              key={index}
                          >
                              <TinderCard
                                  cardWidth={380}
                                  cardHeight={730}
                                  OverlayLabelRight={OverlayRight}
                                  OverlayLabelLeft={OverlayLeft}
                                  cardStyle={stylesHome.card}
                                  onSwipedRight={() => {

                                  }}
                                  onSwipedLeft={() => {
                                  }}
                              >
                                  <Image source={{ uri: item }} style={stylesHome.image} />
                              </TinderCard>
                          </View>
                      );
                  })}
              </View>


                  <XButton></XButton>
                  <HeartButton></HeartButton>



          </ImageBackground>
      </View>
    );
}