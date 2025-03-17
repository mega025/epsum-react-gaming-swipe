import {AuthRepository} from "../../../data/repositories/AuthRepository";
import {HomeRepository} from "../../../data/repositories/HomeRepository";


const {refillGamesFromSwiper} = new HomeRepository();

export const refillGamesFromSwiperUseCase= async () => {
    return await refillGamesFromSwiper();
}