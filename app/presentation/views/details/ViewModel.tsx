import {loadFavGamesUseCase} from "../../../domain/usesCases/favGames/LoadFavGames";
import {useState} from "react";
import {GameDetailsInterface} from "../../../domain/entities/Game";
import {loadGameDetailsUseCase} from "../../../domain/usesCases/gameDetails/LoadGameDetails";
import {loadCompanyDetailsUseCase} from "../../../domain/usesCases/gameDetails/loadCompanyDetails";
import {CompanyDetailsInterface} from "../../../domain/entities/Company";

export const gameDetailsViewModel = () => {
    const [gameDetails, setGameDetails] = useState<GameDetailsInterface>();
    const [showLoading, setShowLoading] = useState(true);

    const loadGameDetails = async (gameId: number) => {
        const response = await loadGameDetailsUseCase(gameId);
        setGameDetails(response[0]);
        setShowLoading(false);
    }

    return {
        loadGameDetails,
        gameDetails,
        showLoading
    }
}

export const companyDetailsViewModel = () => {
    const [showLoading, setShowLoading] = useState(true);
    const [companyDetails, setCompanyDetails] = useState<CompanyDetailsInterface>();

    const loadCompanyDetails = async (companyId: number) => {
        const response = await loadCompanyDetailsUseCase(companyId);
        setCompanyDetails(response[0]);
        console.log(response[0]);
        setShowLoading(false);
    }

    const transformLogoUrlCompany = (url:string) => {
        const cutUrlFirstPart = url.substring(0, 38);
        const match = url.match(/\/([^\/]+)\.\w+$/);
        if (match) {
            const code = match[1];
            console.log(code)
            return "https:"+cutUrlFirstPart+"logo_med/"+code+".png";
        }
    }

    return {
        showLoading,
        loadCompanyDetails,
        companyDetails,
        transformLogoUrlCompany
    }
}

export default {gameDetailsViewModel, companyDetailsViewModel}