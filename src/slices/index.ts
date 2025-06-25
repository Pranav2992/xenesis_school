import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import dashboardReducer from "./dashboard/reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer
});

export default rootReducer;