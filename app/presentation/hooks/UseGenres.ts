import {useQuery} from "@tanstack/react-query";
import {IgdbApiDelivery} from "../../data/sources/remote/igdbAPI/IgdbApiDelivery";
import {Platform} from "../../domain/entities/Game";

const loadGenres = async (): Promise<Platform[]> => {
    try {
        console.log("llamando api...")
        const response = await IgdbApiDelivery.post('genres', 'fields name, id; limit 30;');
        return Promise.resolve(response.data);
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
}

export const useGenres = () => {
    return useQuery({
        queryKey: ["genres"],
        queryFn: async () => await loadGenres(),
    })
}