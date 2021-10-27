import {configureStore, getDefaultMiddleware, createSlice} from "@reduxjs/toolkit";
import {IStore} from "../interfaces";


const middleware = [
    ...getDefaultMiddleware()
];

const state: IStore = {
    user: {email: "", password: "", username: "", id: 0},
    isAuth: false
};

const authSlice = createSlice({
    name: "auth",
    initialState: state,
    reducers: {
        loginSuccess(state, action){
            const userData = action.payload;

            state.isAuth = true;
            state.user.username = userData.username;
            state.user.email = userData.email;

            localStorage.setItem('auth', JSON.stringify(userData))
        }
    }
});

const authReducer = authSlice.reducer;

export const store = configureStore({
   reducer: {
       auth: authReducer
   },
   middleware
});

export const {loginSuccess} = authSlice.actions;
