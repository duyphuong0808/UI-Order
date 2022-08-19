import { configureStore } from '@reduxjs/toolkit';
import emailReducer from '../features/login/pages/Login/CheckEmailPage/emailSlice';
import tabsComponentReducer from '../features/homePage/components/TabsComponent/tabsComponentSlice';

const rootReducer = {
  email: emailReducer,
  tabsComponent: tabsComponentReducer,
}

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
