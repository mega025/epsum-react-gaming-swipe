import React, {useEffect, useState} from "react";
import {
    Image,
    ImageBackground,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard, FlatList, ActivityIndicator,}
from "react-native";
import { CustomTextInputSearch } from "../../components/CustomTextInputSearch";
import styleSearch from "./StyleSearch";
import GameItems from "../../components/GameItems";
import {Game} from "../../../domain/entities/Game";
import viewModel from "./viewModel";

export function Search() {

    const {games, setGames, loading, LoadMoreGame, SearchTextChange,searchText} = viewModel.searchViewModel()

    return (
        <View style={styleSearch.container}>
            <ImageBackground
                source={require("../../../../assets/definitiveBackground.jpeg")}
                style={{ width: "100%", height: "100%" }}
            >
                <View style={styleSearch.containerHeader}>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={styleSearch.header}>
                            <Image source={require("../../../../assets/logo.png")} style={styleSearch.logo} />
                            <Text style={styleSearch.appName}>GamingSwipe</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={styleSearch.title}>
                        <Text style={styleSearch.title}>Search</Text>
                    </View>

                    <View style={styleSearch.containerSearchInput}>
                        <CustomTextInputSearch
                            keyboardType="default"
                            secureTextEntry={false}
                            value={searchText}
                            onPressButtonFromInterface={(text: string) =>SearchTextChange(text)}
                        />
                    </View>
                </View>
                <View style={styleSearch.containerGames}>
                    <FlatList<Game>
                        data={games}
                        renderItem={({ item }) => <GameItems item={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        ListFooterComponent={
                            loading ? <ActivityIndicator size="large" /> : null
                        }
                        onEndReached={LoadMoreGame}
                        onEndReachedThreshold={1.5}
                    />
                </View>

            </ImageBackground>
        </View>
    );
}
