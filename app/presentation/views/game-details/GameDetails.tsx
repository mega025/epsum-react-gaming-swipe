import {Image, ImageBackground, SafeAreaView, Text} from "react-native";
import {RouteProp, useRoute} from "@react-navigation/native";
import {RootStackParamsList} from "../../../../App";
import styleHome from "../home/StyleHome";
import React from "react";
import {homeViewModel} from "../home/ViewModel"
import styleGameDetails from "./StyleGameDetails";

type GameDetailsRouteProp = RouteProp<RootStackParamsList, "GameDetails">;

export function GameDetails() {
    const {transformCoverUrl} = homeViewModel()

    const route = useRoute<GameDetailsRouteProp>()
    const {game} = route.params

    return(
        <SafeAreaView>
            <ImageBackground source={require("../../../../assets/definitiveBackground.jpeg")}
                             style={{width: '100%', height: '100%'}}>
                <Image
                    source={{
                        uri: game.cover
                            ? transformCoverUrl(game.cover.url)
                            : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
                    }}
                    style={styleGameDetails.image}
                />
                <Text>Ola -- {game.name}</Text>
            </ImageBackground>
        </SafeAreaView>
    )
}