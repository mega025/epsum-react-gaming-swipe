import React, {useState} from "react";
import {Game} from "../../../domain/entities/Game";
import {IgdbApiDelivery} from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";

const searchViewModel = () => {
    const [searchText, setSearchText] = useState("");
    const [gamesDisplayed, setGamesDisplayed] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const searchPopularGames = async (page: number = 1) => {
        setLoading(true);
        try {
            const res = await IgdbApiDelivery.post<Game[]>(
                "/games",
                `fields name, rating, platforms.abbreviation, genres.name, cover.url, release_dates.y; limit 10; 
                sort hypes desc; where total_rating_count = null & release_dates.y >= 2025;`
            );

            setGamesDisplayed(res.data);

        } catch (error) {
            console.error("Error al buscar juegos:", error);
        } finally {
            setLoading(false);
        }
    };

    const searchGamesByUserInput = async (text: string = "", page: number = 1) => {
        setLoading(true);
        try {
            const offset = page > 1 ? `offset ${page * 15};` : "";
            const res = await IgdbApiDelivery.post<Game[]>(
                "/games",
                `fields name, rating, platforms.abbreviation, genres.name, cover.url, release_dates.y; limit 15; search "${text}"; ${offset}`
            );

            if (page === 1)
                setGamesDisplayed(res.data);
            else if (page > 1)
                setGamesDisplayed((prevGames) => [...prevGames, ...res.data]);

            setLoading(false)

        } catch (error) {
            console.error("Error al buscar juegos:", error);
        }
    };

    const onSearchTextChange = async (text: string) => {
           if (text === "") {
               setSearchText("");
               await searchPopularGames(1)
           } else {
               setSearchText(text);
               setPage(1);
               await searchGamesByUserInput(text, 1);
           }

    };

    const loadMoreGames = () => {
        if (!loading && gamesDisplayed.length > 14) {
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
        searchPopularGames,
        setSearchText
    }
}
export default {searchViewModel};