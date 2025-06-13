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
import {PropsStackNavigation} from "../../interfaces/StackNav";


export const favScreenViewModel = () => {
    let [favListGames, setFavListGames] = useState<FavGame[]>([]);
    let [playedListGames, setPlayedListGames] = useState<FavGame[]>([]);
    let [showLoading, setShowLoading] = useState(true);

    const loadFavGames = async (slug: string, token: string) => {
        const response = await loadFavGamesUseCase(slug, token);
        setFavListGames(response);
        setShowLoading(false);
    }

    const loadPlayedGames = async (slug: string, token: string) => {
        const response = await loadPlayedGamesUseCase(slug, token);
        setPlayedListGames(response);
        setShowLoading(false);
    }

    const addPlayedGame = async (slug: string, favgame: FavGame, token: string) => {
        const response = await addPlayedGameUseCase(slug, favgame, token);
        await loadFavGames(slug, token);
        await loadPlayedGames(slug, token);
    }

    const deleteGameFromFav = async (id_api: number, slug: string, token: string) => {
        await deleteFavGameUseCase(slug, id_api, token)
        await loadFavGames(slug, token)
    }

    const deletePlayedGame = async (id_api: number, slug: string, token: string) => {
        await deletePlayedGameUseCase(slug, id_api, token)
        await loadPlayedGames(slug, token)
    }

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
    }
}

export default {favScreenViewModel}