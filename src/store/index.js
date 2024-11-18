
import { createStore } from "vuex";
import raceModule from "./modules/race"; // Import your race module

const store = createStore({
    modules: {
        race: raceModule, // Register the race module
    },
});

export default store; // Default export of the store
