import { createSlice } from '@reduxjs/toolkit';

export interface stateLoader {
	isLoader: boolean
}

const initialState: stateLoader = {
	isLoader: false
};

export const stateLoader = createSlice({
	name: 'loader',
	initialState,
	reducers: {
		onLoad: (_, action) => {
			const isLoader = action.payload;
			return {
				isLoader
			}
		},
	},
});

export const { onLoad } = stateLoader.actions;

export default stateLoader.reducer;