import {Platform} from "react-native";
import {Game} from "./Game";

export interface FavGame {
    name: string;
    ratingScore: number;
    releaseYear: number;
    imageUrl: string;
    listPlatforms: Platform[];
    listGames: Game[];
}