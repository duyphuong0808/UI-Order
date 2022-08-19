const { createSlice } = require("@reduxjs/toolkit");

const email = createSlice({
    name: 'email',
    initialState: 'initialEmail',
    reducers: {
        saveEmail: (state, action) => {
            state = action.payload;
        }
    }
});

const { reducer, actions } = email;
export const { checkEmail } = actions;
export default reducer;