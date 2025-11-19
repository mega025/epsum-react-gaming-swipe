import {HomeRepository} from "../../../data/repositories/HomeRepository";
import {Platform} from "../../entities/Game";


const {refillGamesFromSwiperWithFilters} = new HomeRepository()

export const refillGamesFromSwiperWithFiltersUseCase = async (platforms: Platform[], genres: Platform[], rating: number) => {
    return await refillGamesFromSwiperWithFilters(platforms, genres, rating);
}