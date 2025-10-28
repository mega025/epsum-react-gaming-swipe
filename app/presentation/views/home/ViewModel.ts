import {IgdbApiDelivery} from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";
import {useState} from "react";
import {Game, GameDetailsInterface, Genre, GenreDTO, Platform} from "../../../domain/entities/Game";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import {FavGame} from "../../../domain/entities/FavGame";
import viewModel from "../fav/ViewModel";
import {refillGamesFromSwiperUseCase} from "../../../domain/usesCases/home/RefillGamesFromSwiper";
import {addGameToFavoriteUseCase} from "../../../domain/usesCases/home/AddGameToFavorite";
import {refillGamesFromSwiperWithFiltersUseCase} from "../../../domain/usesCases/home/RefillGamesFromSwiperWithFilters";
import {transformCoverUrl} from "../../utils/transformCoverUrl";
import {generateNoGamesFoundCard} from "../../utils/noGameFoundWithThisFilters";


export const homeViewModel = () => {

    let [listGames, setListGames] = useState<Game[]>([]);
    let [showLoading, setShowLoading] = useState(true);
    let [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
    let [selectedGenres, setSelectedGenres] = useState<Platform[]>([]);
    let [swipesCounter, setSwipesCounter] = useState(0);

    const {favListGames} = viewModel.favScreenViewModel();

    const refillSwipeGames = async () => {
        setShowLoading(true);
        const response = await refillGamesFromSwiperUseCase()
        setListGames(response)
        setShowLoading(false);
    }

    const refillSwipeGamesWithFilters = async (filters: { genres: Platform[]; platforms: Platform[]}) => {
        setShowLoading(true);
        setSelectedPlatforms(filters.platforms);
        setSelectedGenres(filters.genres);
        const response = await refillGamesFromSwiperWithFiltersUseCase(filters.platforms, filters.genres);
        if (response.length === 0) {
            setListGames([generateNoGamesFoundCard(filters.genres, filters.platforms), generateNoGamesFoundCard(filters.genres, filters.platforms)]);
        } else {
            setListGames(response)
        }
        setShowLoading(false);
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
                platforms: item.platforms ? item.platforms : [],
                genres: item.genres ? item.genres : [],
                id_api: item.id
            }
            console.log(favGameDTO)
            return favGameDTO;
        }
    }

    return {
        listGames,
        refillSwipeGames,
        setListGames,
        showLoading,
        setShowLoading,
        addGameToFav,
        swipesCounter,
        setSwipesCounter,
        refillSwipeGamesWithFilters,
        selectedGenres,
        selectedPlatforms,
        transformGameIntoFavGameInterface
    }
}

export default {homeViewModel}