import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import React, { useState } from 'react';
import {FavGame} from "../../../domain/entities/FavGame";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import Toast from "react-native-toast-message";
import {Game} from "../../../domain/entities/Game";
import {loadFavGamesUseCase} from "../../../domain/usesCases/favGames/LoadFavGames";
import {deleteFavGameUseCase} from "../../../domain/usesCases/favGames/DeleteFavGame";
import {loadPlayedGamesUseCase} from "../../../domain/usesCases/favGames/LoadPlayedGames";
import {addPlayedGameUseCase} from "../../../domain/usesCases/favGames/AddPlayedGame";
import {deletePlayedGameUseCase} from "../../../domain/usesCases/favGames/DeletePlayedGame";


const favScreenViewModel = () => {
    let [favListGames, setFavListGames] = useState<FavGame[]>([]);
    let [playedListGames, setPlayedListGames] = useState<FavGame[]>([]);
    let [showLoading, setShowLoading] = useState(true);

    const loadFavGames = async (slug: string) => {
        const response = await loadFavGamesUseCase(slug);
        setFavListGames(response);
        setShowLoading(false);
    }

    const loadPlayedGames = async (slug: string) => {
        const response = await loadPlayedGamesUseCase(slug);
        setPlayedListGames(response);
        setShowLoading(false);
    }

    const addPlayedGame = async (slug: string, favgame: FavGame) => {
        const response = await addPlayedGameUseCase(slug, favgame);
        favListGames.splice(getPositionGameList(favgame.name, favListGames), 1)
        playedListGames.push(favgame);
    }

    const deleteGameFromFav = async (position: number, slug: string) => {
        await deleteFavGameUseCase(slug, position)
        favListGames.splice(position, 1);
    }

    const deletePlayedGame = async (position: number, slug: string) => {
        await deletePlayedGameUseCase(slug, position)
        playedListGames.splice(position, 1);
    }

    const getPositionGameList = (gameName: string, gameList: FavGame[]) => {
        return gameList.findIndex(gameOnList =>
            gameOnList.name.trim().toLowerCase() === gameName.trim().toLowerCase()
        );
    };

    return{
        favListGames,
        playedListGames,
        setFavListGames,
        loadFavGames,
        loadPlayedGames,
        addPlayedGame,
        showLoading,
        deleteGameFromFav,
        deletePlayedGame,
        getPositionGameList,
    }
}

export default {favScreenViewModel}