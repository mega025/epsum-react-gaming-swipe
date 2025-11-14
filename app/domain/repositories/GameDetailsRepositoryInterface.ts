import {GameDetailsInterface} from "../entities/Game";
import {CompanyDetailsInterface} from "../entities/Company";


export interface GameDetailsRepositoryInterface {
    loadGameDetails: (gameId: number) => Promise<GameDetailsInterface[]>
    loadCompanyDetails: (companyId: number) => Promise<CompanyDetailsInterface[]>
}