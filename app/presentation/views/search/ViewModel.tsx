import  {useState} from "react";
import {Company, Game} from "../../../domain/entities/Game";
import {IgdbApiDelivery} from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";
import {searchMostAnticipatedGamesUseCase} from "../../../domain/usesCases/search/SearchMostAnticipatedGames";
import {searchGamesByUserInputUseCase} from "../../../domain/usesCases/search/SearchGamesByUserInput";
import {searchCompanyByUserInputUseCase} from "../../../domain/usesCases/search/SearchCompanyByUserInput";
import {CompanyDetailsInterface} from "../../../domain/entities/Company";

const searchViewModel = () => {
    const [searchText, setSearchText] = useState("");
    const [gamesDisplayed, setGamesDisplayed] = useState<Game[]>([]);
    const [companyDisplayed, setCompanyDisplayed] = useState<CompanyDetailsInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [appliedFilters, setAppliedFilters] = useState<{ category: string | null; platform: string | null }>({
        category: null,
        platform: null,
    });
    const [filtersApplied, setFiltersApplied] = useState(false);


    const onApplyFilters = async (filters: { category: string | null; platform: string | null }) => {
        setSearchText("");
        setSelectedCategory(filters.category);
        setSelectedPlatform(filters.platform);
        setAppliedFilters(filters);
        setFiltersApplied(true);
        console.log("Filtros aplicados:", appliedFilters);

        await searchGames(filters.category, filters.platform);

    };
    const searchGames = async (category: string | null, platform: string | null) => {
        setLoading(true);
        try {
            const filteredGames = await fetchFilteredGames(category, platform);
            setGamesDisplayed(filteredGames);
        } catch (err) {
            console.error('Error fetching filtered games:', err);
        } finally {
            setLoading(false);
        }
    };
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
    const searchTopCompany = async () => {
        try {
            setLoading(true);

            const response = await searchCompanyByUserInputUseCase();

            setCompanyDisplayed(response);
        } catch (error) {
            console.error("Error fetching companies:", error);
        } finally {
            setLoading(false);
        }
    };

    const searchMostAnticipatedGames = async () => {
        setLoading(true);
        const response = await searchMostAnticipatedGamesUseCase()
        setGamesDisplayed(response);
        setLoading(false)
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
            setLoading(true)
            setPage((prevPage) => {
                const nextPage = prevPage + 1;

                if (searchText !== "") {
                    searchGamesByUserInput(searchText, nextPage);
                } else if (appliedFilters.category || appliedFilters.platform) {
                    fetchFilteredGames(appliedFilters.category, appliedFilters.platform, nextPage)
                        .then((moreGames) => {
                            setGamesDisplayed((prevGames) => [...prevGames, ...moreGames]);
                            setLoading(false)
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
        onApplyFilters,
        filtersApplied,
        appliedFilters,
        setAppliedFilters,
        setFiltersApplied,
        setSelectedCategory,
        setSelectedPlatform,
        searchTopCompany,
        companyDisplayed
    }
}
export default {searchViewModel}