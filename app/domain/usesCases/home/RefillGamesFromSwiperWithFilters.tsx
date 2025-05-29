import {HomeRepository} from "../../../data/repositories/HomeRepository";


const {refillGamesFromSwiperWithFilters} = new HomeRepository()

export const refillGamesFromSwiperWithFiltersUseCase = async (platform: string | null, genre: string | null) => {
    return await refillGamesFromSwiperWithFilters(platform, genre);
}