import {IgdbApiDelivery} from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";
import {useState} from "react";
import {Game} from "../../../domain/entities/Game";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import {FavGame} from "../../../domain/entities/FavGame";


const homeViewModel = () => {

    let [listGames, setListGames] = useState<Game[]>([]);
    let [showLoading, setShowLoading] = useState(true);


    const refillSwipeGames = async () => {
        const randomOffset = Math.round(((Math.random()*9100)*100)/100).toFixed(0)
        setListGames([])
        IgdbApiDelivery.post("/games", "fields name, cover.url, genres.name, platforms.abbreviation, rating, release_dates.y; limit 10; where rating > 70; offset "+randomOffset+";")
            .then((response) => {
                setListGames(response.data);
                setShowLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const addGameToFav = async (game: FavGame, userId: number) => {
        await ApiDelivery.post(`/favgames/add/${userId}`, game)
            .then((response) => {
                console.log(response.data?.message);
             })
            .catch((error) => {
                console.log(error);
            })
    }


    const transfromCoverUrl = (url:string) => {
        const cutUrlFirstPart = url.substring(0, 38);
        const cutUrlSecondPart = url.substring(url.lastIndexOf("/") + 1);
        return "https:"+cutUrlFirstPart+"cover_big/"+cutUrlSecondPart;
    }


    return {
        listGames,
        refillSwipeGames,
        setListGames,
        transfromCoverUrl,
        showLoading,
        setShowLoading,
        addGameToFav,
    }
}

export default {homeViewModel}