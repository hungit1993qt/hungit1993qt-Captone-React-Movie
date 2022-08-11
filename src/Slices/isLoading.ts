import { createSlice } from "@reduxjs/toolkit";

export interface State {
    isLoading: boolean;
}

const initialState: State = {
    isLoading: false,
};

const isLoading = createSlice({
    name: "loading",
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true;
            console.log(1233);
        },
        hideLoading: (state) => {
            state.isLoading = false;
        },
    },
});

export const { showLoading, hideLoading } = isLoading.actions;

export default isLoading.reducer