import { configureStore } from '@reduxjs/toolkit'
import nameSlice from './slices/name.slice'
import searchSlice from './slices/search.slice'

export default configureStore({
    reducer: {
        name: nameSlice,
        searchPoke: searchSlice

    }
})