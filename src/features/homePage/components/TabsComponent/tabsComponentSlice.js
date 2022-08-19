const { createSlice } = require("@reduxjs/toolkit");

const initialTabsComponent = {
    date: "",
    id: 2,
    name: "",
    quantity: 1,
    typeId: 1,
    userId: 1
}

const tabsComponent = createSlice({
    name: 'tabsComponent',
    initialState: initialTabsComponent,
    reducers: {
        setOrder: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});

const { reducer, actions } = tabsComponent;
export const { setOrder } = actions;
export default reducer;