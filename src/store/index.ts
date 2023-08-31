import { configureStore, combineReducers } from "@reduxjs/toolkit";
import gameReducer from './slices/gameSlice'
import { type } from "os";

const rootReducer = combineReducers({
    game: gameReducer
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']