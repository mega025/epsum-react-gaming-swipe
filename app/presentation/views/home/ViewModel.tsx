import {IgdbApiDelivery} from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";
import {useState} from "react";
import {Game} from "../../../domain/entities/Game";


const homeViewModel = () => {

    const [listGames, setListGames] = useState<Game[]>([]);

    const setGames = async () => {
        IgdbApiDelivery.post("/games", "fields name, cover.url, genres.name, platforms.abbreviation, rating, release_dates.y; limit 5; where rating > 80;")
            .then((response) => {
                console.log(response.data)
                setListGames([...listGames, response.data]);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const transfromCoverUrl = (url:string) => {
        const cutUrlFirstPart = url.substring(0, 38);
        const cutUrlSecondPart = url.substring(url.lastIndexOf("/") + 1);
        return "https:"+cutUrlFirstPart+"cover_big/"+cutUrlSecondPart;
    }


    return {listGames, setGames, setListGames, transfromCoverUrl}
}

export default {homeViewModel}