import {IgdbApiDelivery} from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";
import {useState} from "react";
import {Game, Genre, GenreDTO} from "../../../domain/entities/Game";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import {FavGame} from "../../../domain/entities/FavGame";
import viewModel from "../fav/ViewModel";


const homeViewModel = () => {

    let [listGames, setListGames] = useState<Game[]>([]);
    let [showLoading, setShowLoading] = useState(true);
    let [showMessageLoading, setMessageLoading] = useState(false);
    const {favListGames} = viewModel.favScreenViewModel();


    const refillSwipeGames = async () => {
        setShowLoading(true)
        const randomOffset = Math.round(((Math.random()*9100)*100)/100).toFixed(0)
        setListGames([]);
        await IgdbApiDelivery.post("/games", "fields name, cover.url, genres.name, platforms.abbreviation, rating, release_dates.y; limit 10; where rating > 70; offset "+randomOffset+";")
            .then((response) => {
                setListGames(response.data);
                setShowLoading(false);
                setMessageLoading(false);
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

    const transformGameIntoFavGameInterface =(item: Game) => {
        const genreListDTO: GenreDTO[] = []
        item.genres.forEach((genre: Genre) => {
                const genreDTO: GenreDTO = {
                    genreName: genre.name,
                }
                genreListDTO.push(genreDTO)
            }
        )
        const favGameDTO: FavGame = {
            name: item.name,
            ratingScore: Math.round((item.rating * 100) / 100),
            releaseYear: item.release_dates ? item.release_dates[0].y : 0,
            imageUrl: item.cover ? transfromCoverUrl(item.cover.url) : "",
            listPlatforms: item.platforms,
            listGenres: genreListDTO
        }

        return favGameDTO;
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
        showMessageLoading,
        setMessageLoading,
        transformGameIntoFavGameInterface
    }
}

export default {homeViewModel}