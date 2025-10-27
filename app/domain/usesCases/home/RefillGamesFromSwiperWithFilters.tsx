import {HomeRepository} from "../../../data/repositories/HomeRepository";
import {Platform} from "../../entities/Game";


const {refillGamesFromSwiperWithFilters} = new HomeRepository()

export const refillGamesFromSwiperWithFiltersUseCase = async (platform: Platform | null, genre: Platform | null) => {
    return await refillGamesFromSwiperWithFilters(platform, genre);
}