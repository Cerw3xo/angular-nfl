import { Statistics } from "./statistics";
import { GameLog } from "./game-log";
import { News} from "./news";

export interface AthleteOverview {
    statistics: Statistics;
    gameLog: GameLog;
    news: News[];
}