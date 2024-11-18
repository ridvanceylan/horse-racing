
import { createStore } from "vuex";
import raceModule from "./modules/race";
const store = createStore({
    modules: {
        race: raceModule,
    },
});

export default store; 
