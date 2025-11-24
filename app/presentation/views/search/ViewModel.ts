import  {useState} from "react";
import {Company, Game} from "../../../domain/entities/Game";
import {IgdbApiDelivery} from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";
import {searchMostAnticipatedGamesUseCase} from "../../../domain/usesCases/search/SearchMostAnticipatedGames";
import {searchGamesByUserInputUseCase} from "../../../domain/usesCases/search/SearchGamesByUserInput";
import {searchCompanyByUserInputUseCase} from "../../../domain/usesCases/search/SearchCompanyByUserInput";
import {CompanyDetailsInterface} from "../../../domain/entities/Company";
import {searchUsersUseCase} from "../../../domain/usesCases/search/SearchUsers";
import {GetSearchUserInterface, UpdateUserDTO} from "../../../domain/entities/User";
import {useAnticipatedGames} from "../../hooks/UseAnticipatedGames";
import {useGameDetails} from "../../hooks/UseGameDetails";


const searchViewModel = () => {
    const [searchText, setSearchText] = useState("");
    const [searchUserText, setSearchUserText] = useState("");
    const [gamesDisplayed, setGamesDisplayed] = useState<Game[]>([]);
    const [searchedUsers, setSearchedUsers] = useState<GetSearchUserInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [appliedFilters, setAppliedFilters] = useState<{ category: string | null; platform: string | null }>({
        category: null,
        platform: null,
    });
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
    const [debounceTimeoutUser, setDebounceTimeoutUser] = useState<NodeJS.Timeout | null>(null);

    const {data, isLoading, error} = useAnticipatedGames();

    const searchUsers = async (userParameters: UpdateUserDTO) => {
        setLoading(true);
        if (userParameters.username !== "") {
            const response = await searchUsersUseCase(userParameters);
            setSearchedUsers(response)
        } else {
            setSearchedUsers([]);
        }
        setLoading(false);
    }

    const fetchFilteredGames = async (
        category: string | null,
        platform: string | null,
        page: number = 0
    ): Promise<Game[]> => {
        try {
            const filters: string[] = [];

            if (category) {
                filters.push(`genres.name ~ *"${category}"*`);
            }

            if (platform) {
                filters.push(`platforms.name ~ *"${platform}"*`);
            }

            const whereClause = filters.length > 0 ? `where ${filters.join(" & ")};` : "";
            const offset = `offset ${page * 15};`;

            const query = `
            fields name, 
            rating, 
            platforms.abbreviation,
            genres.name, 
            cover.url, 
            release_dates.y;
            ${whereClause}
            sort popularity desc;
            ${offset}
            limit 15;
        `;

            const response = await IgdbApiDelivery.post("/games", query);

            return response.data;
        } catch (error) {
            console.error("Error fetching filtered games:", error);
            return [];
        }
    };

    const searchMostAnticipatedGames = async () => {
        setLoading(true);
        if (data !== undefined) {
            setGamesDisplayed(data);
        }
        setLoading(false)
    };

    const searchGamesByUserInput = async (input: string, page: number = 1, showLoading: boolean) => {
        setLoading(showLoading);
        const response = await searchGamesByUserInputUseCase(input, page);
        if (page === 1)
            setGamesDisplayed(response);
        else if (page > 1)
            setGamesDisplayed((prevGames) => [...prevGames, ...response]);
        setLoading(false)
    };

    const onSearchTextChange = (text: string) => {
        setSearchText(text);
        if (debounceTimeout) clearTimeout(debounceTimeout);

        const timeout = setTimeout(async () => {
            if (text === "") {
                await searchMostAnticipatedGames();
            } else {
                setPage(1);
                await searchGamesByUserInput(text, 1, true);
            }
        }, 400);

        setDebounceTimeout(timeout);
    };

    const onSearchUserTextChange = async (text: string) => {
        setSearchUserText(text);

        if (debounceTimeoutUser) clearTimeout(debounceTimeoutUser)
        const timeout = setTimeout(async () => {
            await searchUsers({username: text});
        }, 400)
        setDebounceTimeoutUser(timeout);
    }

    const loadMoreGames = async () => {
        if (!loading && gamesDisplayed.length >= 13) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                if (searchText !== "") {
                    searchGamesByUserInput(searchText, nextPage, false);
                } else if (appliedFilters.category || appliedFilters.platform) {
                    fetchFilteredGames(appliedFilters.category, appliedFilters.platform, nextPage)
                        .then((moreGames) => {
                            setGamesDisplayed((prevGames) => [...prevGames, ...moreGames]);
                        });
                }

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
        setSearchText,
        filtersApplied,
        appliedFilters,
        setAppliedFilters,
        setFiltersApplied,
        setSelectedCategory,
        setSelectedPlatform,
        searchedUsers,
        searchUsers,
        searchUserText,
        selectedPlatform,
        selectedCategory,
        onSearchUserTextChange
    }
}
export default {searchViewModel}