import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopName: '',
    activation: {},
    productList: [],
    requestedProducts: [],
    requestedProductsCount: 0,
    buttonSettings: {},
    formSettings: {},
    buttonInheritFromTheme: null,
    formInheritFromTheme: null,
    schedule: {},
    displayMessage: {},
    badgeDesign: {}
}

export const requestStockSettingSlice = createSlice({
    name: "requeststock",
    initialState,
    reducers: {
        setShopName: (state, action) => {
            state.shopName = action.payload
        },
        setActivation: (state, action) => {
            state.activation = action.payload
        },
        setProductList: (state, action) => {
            state.productList = action.payload
        },
        setRequestedProducts: (state, action) => {
            state.requestedProducts = action.payload
        },
        setRequestedProductsCount: (state, action) => {
            state.requestedProductsCount = action.payload
        },
        setButtonSettings: (state, action) => {
            state.buttonSettings = action.payload
        },
        setFormSettings: (state, action) => {
            state.formSettings = action.payload
        },
        setSchedule: (state, action) => {
            state.schedule = action.payload
        },
        setDisplayMessage: (state, action) => {
            state.displayMessage = action.payload
        },
        setBadgeDesign: (state, action) => {
            state.badgeDesign = action.payload
        },
        setButtonInheritFromTheme: (state, action) => {
            state.buttonInheritFromTheme = action.payload;
        },
        setFormInheritFromTheme: (state, action) => {
            state.formInheritFromTheme = action.payload
        }
    },
});

export const { 
    setShopName, 
    setActivation, 
    setProductList,
    setRequestedProducts,
    setRequestedProductsCount,
    setButtonSettings,
    setSchedule,
    setDisplayMessage,
    setBadgeDesign,
    setButtonInheritFromTheme,
    setFormInheritFromTheme,
    setFormSettings
} = requestStockSettingSlice.actions;
export default requestStockSettingSlice.reducer;
