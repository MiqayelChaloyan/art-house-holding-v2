import { createSlice } from '@reduxjs/toolkit';

export interface statePlayer {
	isPlay: boolean
	path: string
}

const initialState: statePlayer = {
	isPlay: false,
	path: ''
};

export const statePlayer = createSlice({
	name: 'player',
	initialState,
	reducers: {
		onPlay: (state, action) => {
			const isPlay = action.payload;
			return {
				...state,
				isPlay
			}
		},
		setPath: (state, action) => {
			const path = action.payload;
			return {
				...state,
				path
			}
		}
	},
});

export const { onPlay, setPath } = statePlayer.actions;

export default statePlayer.reducer;