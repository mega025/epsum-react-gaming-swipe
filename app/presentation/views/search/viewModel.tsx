import {useEffect, useState} from "react";
import {Game} from "../../../domain/entities/Game";
import {IgdbApiDelivery} from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";

const searchViewModel = () => {
    const [searchText, setSearchText] = useState("");
    const [games, setGames] =useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);


    const searchGames = async (text: string = "", page: number = 1) => {
        setLoading(true);
        try {
            const offset = page > 1 ? `offset ${page * 15};` : "";
            const res = await IgdbApiDelivery.post<Game[]>(
                "/games",
                `fields name, rating, platforms.abbreviation, genres.name, cover.url, release_dates.y; limit 15; search "${text}"; ${offset}`
            );
            const query = text
            ? 'search "${text}";'
                : `sort rating desc; limit 15; ${offset}`;

            if (page === 1) {
                setGames(res.data);
            } else {
                setGames((prevGames) => [...prevGames, ...res.data]);
            }
        } catch (error) {
            console.error("Error al buscar juegos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        searchGames();
    }, []);

    const SearchTextChange = (text: string) => {
        setSearchText(text);
        setPage(1);
        searchGames(text, 1);
        setLoading(true);

    };

    const LoadMoreGame = () => {
        if (!loading) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                searchGames(searchText, nextPage);
                return nextPage;
            });
        }
    };

    return {games, setGames, loading, LoadMoreGame, SearchTextChange,searchText}

}
export default {searchViewModel};