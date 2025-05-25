import {loadFavGamesUseCase} from "../../../domain/usesCases/favGames/LoadFavGames";
import {useState} from "react";
import {GameDetailsInterface, SimilarGame} from "../../../domain/entities/Game";
import {loadGameDetailsUseCase} from "../../../domain/usesCases/gameDetails/LoadGameDetails";
import {loadCompanyDetailsUseCase} from "../../../domain/usesCases/gameDetails/loadCompanyDetails";
import {CompanyDetailsInterface} from "../../../domain/entities/Company";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import {GetUserInterface, UserInterface} from "../../../domain/entities/User";
import {getUserDBUseCase} from "../../../domain/usesCases/account/GetUser";
import {FavGame} from "../../../domain/entities/FavGame";
import {loadPlayedGamesUseCase} from "../../../domain/usesCases/favGames/LoadPlayedGames";

export const userDetailsViewModel = () => {
    const [showLoading, setShowLoading] = useState(false);
    const [userDetails, setUserDetails] = useState<GetUserInterface>()
    const [favGames, setFavGames] = useState<FavGame[]>([])
    const [playedGames, setPlayedGames] = useState<FavGame[]>([])

    const loadUserGames = async (slug: string, token: string) => {
        setShowLoading(true)
        const responseFav = await loadFavGamesUseCase(slug, token);
        const responsePlayed = await loadPlayedGamesUseCase(slug, token);
        setFavGames(responseFav)
        setPlayedGames(responsePlayed)
        setShowLoading(false)
    }

    return {
        showLoading,
        userDetails,
        favGames,
        playedGames,
        loadUserGames

    }

}

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
            return "https:"+cutUrlFirstPart+"logo_med/"+code+".png";
        }
        return
    }

    const formatUnixDate = (unixTimestamp: number) => {
        if (unixTimestamp < 10000000000) {
            unixTimestamp *= 1000;
        }

        const date = new Date(unixTimestamp);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };

        return date.toLocaleDateString('en-US', options);
    }

    countries.registerLocale(enLocale);

    const getCountryNameFromNumericCode = (numericCode: string | number, locale: string = 'en') => {
        const code = String(numericCode).padStart(3, '0');

        const entry = Object.entries(countries.getAlpha2Codes()).find(([alpha2]) => {
            const num = countries.alpha2ToNumeric(alpha2);
            return num === code;
        });

        if (entry) {
            const [alpha2] = entry;
            return countries.getName(alpha2, locale) || `Unknown (${numericCode})`;
        }

        return `Unknown code: ${numericCode}`;
    }

    return {
        showLoading,
        loadCompanyDetails,
        companyDetails,
        transformLogoUrlCompany,
        formatUnixDate,
        getCountryNameFromNumericCode,
    }
}

export default {gameDetailsViewModel, companyDetailsViewModel}