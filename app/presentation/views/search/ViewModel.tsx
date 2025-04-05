import React, {useState} from "react";
import {Game} from "../../../domain/entities/Game";
import {IgdbApiDelivery} from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";
import {searchMostAnticipatedGamesUseCase} from "../../../domain/usesCases/search/SearchMostAnticipatedGames";
import {searchGamesByUserInputUseCase} from "../../../domain/usesCases/search/SearchGamesByUserInput";

const searchViewModel = () => {
    const [searchText, setSearchText] = useState("");
    const [gamesDisplayed, setGamesDisplayed] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const searchMostAnticipatedGames = async () => {
        setLoading(true);
        const response = await searchMostAnticipatedGamesUseCase()
        setGamesDisplayed(response);
    };

    const searchGamesByUserInput = async (input: string, page: number = 1) => {
        setLoading(true);
        const response = await searchGamesByUserInputUseCase(input, page);
        if (page === 1)
            setGamesDisplayed(response);
        else if (page > 1)
            setGamesDisplayed((prevGames) => [...prevGames, ...response]);
        setLoading(false)
    };

    const onSearchTextChange = async (text: string) => {
           if (text === "") {
               setSearchText("");
               await searchMostAnticipatedGames()
           } else {
               setSearchText(text);
               setPage(1);
               await searchGamesByUserInput(text, 1);
           }
    };

    const loadMoreGames = () => {
        if (!loading && gamesDisplayed.length >= 13) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                searchGamesByUserInput(searchText, nextPage);
                return nextPage;
            });
        }
    };

    return {
        gamesDisplayed,
        setGamesDisplayed,
        loading,
        loadMoreGames,
        onSearchTextChange,
        searchText,
        searchGamesByUserInput,
        searchMostAnticipatedGames,
        setSearchText
    }
}
export default {searchViewModel};