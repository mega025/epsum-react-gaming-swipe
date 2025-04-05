import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import React, { useState } from 'react';
import {FavGame} from "../../../domain/entities/FavGame";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import Toast from "react-native-toast-message";
import {Game} from "../../../domain/entities/Game";
import {loadFavGamesUseCase} from "../../../domain/usesCases/favGames/LoadFavGames";
import {deleteFavGameUseCase} from "../../../domain/usesCases/favGames/DeleteFavGame";


const favScreenViewModel = () => {
    let [favListGames, setFavListGames] = useState<FavGame[]>([]);
    let [showLoading, setShowLoading] = useState(true);

    const loadFavGames = async (userId: number) => {
        const response = await loadFavGamesUseCase(userId);
        setFavListGames(response);
        setShowLoading(false);
    }

    const deleteGameFromFav = async (position: number, userId: number) => {
        await deleteFavGameUseCase(userId, position)
        favListGames.splice(position, 1);
        console.log("Delete game w index "+position);
    }

    const getPositionGameList = (gameName: string) => {
        return favListGames.findIndex(gameOnList =>
            gameOnList.name.trim().toLowerCase() === gameName.trim().toLowerCase()
        );
    };

    return{
        favListGames,
        setFavListGames,
        loadFavGames,
        showLoading,
        deleteGameFromFav,
        getPositionGameList,
    }
}

export default {favScreenViewModel}