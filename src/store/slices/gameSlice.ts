import { IGame } from "../../models/models"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
    loading: boolean
    error: string
    count: number
    games: IGame[] 
}

const initialState: GameState = {
    loading: false,
    error: '',
    count: 0,
    games: []
}

interface GamePayload {
    games: IGame[]
    count: number
}


export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        fetching(state) {
            state.loading = true
        },
        fetchSuccess(state, action: PayloadAction<GamePayload>) {
            state.loading = false;
            if (action.payload && action.payload.games) {
              state.games = action.payload.games;
              state.count = action.payload.games.length;
            } else {
              state.games = [];
              state.count = 0;
            }
            state.error = '';
        },
        fetchError(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
            state.games = []
        }
    }
})

export default gameSlice.reducer