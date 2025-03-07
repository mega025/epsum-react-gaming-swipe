import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import React, { useState } from 'react';
import {FavGame} from "../../../domain/entities/FavGame";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import Toast from "react-native-toast-message";
import {Game} from "../../../domain/entities/Game";


const favScreenViewModel = () => {
    let [favListGames, setFavListGames] = useState<FavGame[]>([]);
    let [showLoading, setShowLoading] = useState(true);

    const loadFavGames = async (userId: number) => {
        ApiDelivery.get(`/favgames/user/${userId}`)
            .then((response) => {
                if(response.data != undefined) {
                    setFavListGames(response.data);
                    console.log(response.data);
                    setShowLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getPositionGameList: (game: FavGame) => number = (game: FavGame) => {
        return favListGames.findIndex(gameOnList => game.name === gameOnList.name);
    }

    const deleteGameFromFav = async (position: number, userId: number) => {
        await ApiDelivery.post(`/favgames/delete/${userId}`, position)
            .then((response) => {
                favListGames.splice(position, 1);
                console.log("Game w index "+position);
                Toast.show({
                    type: 'success',
                    text1: response.data.message,
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }



    return{
        favListGames,
        setFavListGames,
        loadFavGames,
        showLoading,
        deleteGameFromFav,
        getPositionGameList
    }
}

export default {favScreenViewModel}