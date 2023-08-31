import { AppDispatch } from "../index"
import axios from "../../axios"
import { gameSlice } from "../slices/gameSlice";


export const fetchGames = (platform: string, category: any, sort: string) => {
    return async (dispatch: AppDispatch) => {
      const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        params: {
          platform: platform,
          category: category,
          'sort-by': sort
        },
        headers: {
          'X-RapidAPI-Key': 'f088d0585amsh62322a3d47fe286p1ec193jsn1c7e268ea8e7',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };

      try {
        dispatch(gameSlice.actions.fetching())
        const response = await axios.request(options);
        dispatch(gameSlice.actions.fetchSuccess({
          games: response.data,
          count: response.data.length
        }
        ))
      } catch (e : any) {
          const errorMessage = e.message || "Произошла ошибка";
          dispatch(gameSlice.actions.fetchError(errorMessage));
      }
    }
}