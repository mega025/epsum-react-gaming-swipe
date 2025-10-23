import {IgdbApiDelivery} from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";
import {useState} from "react";
import {Game, GameDetailsInterface, Genre, GenreDTO} from "../../../domain/entities/Game";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import {FavGame} from "../../../domain/entities/FavGame";
import viewModel from "../fav/ViewModel";
import {refillGamesFromSwiperUseCase} from "../../../domain/usesCases/home/RefillGamesFromSwiper";
import {addGameToFavoriteUseCase} from "../../../domain/usesCases/home/AddGameToFavorite";
import {refillGamesFromSwiperWithFiltersUseCase} from "../../../domain/usesCases/home/RefillGamesFromSwiperWithFilters";


export const homeViewModel = () => {

    let [listGames, setListGames] = useState<Game[]>([]);
    let [showLoading, setShowLoading] = useState(true);
    let [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    let [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    let [showMessageLoading, setMessageLoading] = useState(false);
    let [swipesCounter, setSwipesCounter] = useState(0);

    const {favListGames} = viewModel.favScreenViewModel();

    const refillSwipeGames = async () => {
        setShowLoading(true)
        const response = await refillGamesFromSwiperUseCase()
        setListGames((prev) => [...prev, ...response])
        setShowLoading(false)
        setMessageLoading(false);
    }

    const refillSwipeGamesWithFilters = async (filters: { category: string | null; platform: string | null }) => {
        setMessageLoading(true)
        setSelectedPlatform(filters.platform);
        setSelectedGenre(filters.category);
        const response = await refillGamesFromSwiperWithFiltersUseCase(filters.platform, filters.category);
        setListGames(response)
        setMessageLoading(false);
    }

    const addGameToFav = async (game: FavGame | undefined, slug: string) => {
        if (game !== undefined)
            await addGameToFavoriteUseCase(slug, game);
    }

    const transformGameIntoFavGameInterface =(item: Game | GameDetailsInterface | undefined) => {
        if (item !== undefined) {
            const favGameDTO: FavGame = {
                name: item.name,
                rating_score: item.rating ? Math.round((item.rating * 100) / 100) : 0,
                release_year: item.release_dates ? item.release_dates[0].y : 0,
                image_url: item.cover ? transformCoverUrl(item.cover.url) : "",
                platforms: item.platforms,
                genres: item.genres ? item.genres : [],
                id_api: item.id
            }
            console.log(favGameDTO)
            return favGameDTO;
        }
    }


    const transformCoverUrl = (url:string) => {
        const cutUrlFirstPart = url.substring(0, 38);
        const cutUrlSecondPart = url.substring(url.lastIndexOf("/") + 1);
        return "https:"+cutUrlFirstPart+"cover_big/"+cutUrlSecondPart;
    }


    return {
        listGames,
        refillSwipeGames,
        setListGames,
        transformCoverUrl,
        showLoading,
        setShowLoading,
        addGameToFav,
        swipesCounter,
        setSwipesCounter,
        showMessageLoading,
        setMessageLoading,
        refillSwipeGamesWithFilters,
        selectedGenre,
        selectedPlatform,
        transformGameIntoFavGameInterface
    }
}

export default {homeViewModel}