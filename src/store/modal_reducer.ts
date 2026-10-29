import { createSlice } from '@reduxjs/toolkit';

export interface stateModal {
	isOpen: boolean
}

const initialState: stateModal = {
	isOpen: false
};

export const stateModal = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (_, action) => {
			const isOpen = action.payload;
			return {
				isOpen
			}
		},
		closeModal: (_, action) => {
			const isOpen = action.payload;
			return {
				isOpen
			}
		}
	},
});

export const { openModal, closeModal } = stateModal.actions;

export default stateModal.reducer;