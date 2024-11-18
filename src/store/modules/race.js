import horsesData from '@/assets/horses.json';
export default {
    namespaced: true,
    state: {
        horses: [],
        raceSchedule: [],
        currentRound: 0, // Current round
        raceResults: [],
        isRaceInProgress: false,
    },
    mutations: {
        SET_HORSES(state, horses) {
            state.horses = horses;
        },
        SET_RACE_SCHEDULE(state, schedule) {
            state.raceSchedule = schedule;
        },
        ADVANCE_ROUND(state) {
            state.currentRound += 1;
        },
        ADD_RACE_RESULT(state, result) {
            state.raceResults.push(result);
        },
        RESET_RACE(state) {
            state.currentRound = 0;
            state.raceResults = [];
            state.isRaceInProgress = false;
            state.raceSchedule = [];
        },
        SET_RACE_IN_PROGRESS(state, status) {
            state.isRaceInProgress = status;
        },
    },
    actions: {
        generateHorses({ commit }) {
            commit("SET_HORSES", horsesData);
        },
        generateRaceSchedule({ state, commit }) {
            const raceDistances = [1000, 1200, 1400, 1600, 1800, 2000, 2200];
            const schedule = raceDistances.map((distance) => ({
                distance,
                horses: state.horses
                    .sort(() => Math.random() - 0.5) // Randomize horses
                    .slice(0, 10), // Select 10 horses
            }));
            console.log(schedule);
            commit("SET_RACE_SCHEDULE", schedule);
        },
        async startRace({ state, commit }) {
            if (state.isRaceInProgress || state.currentRound >= state.raceSchedule.length) {
                return;
            }

            commit("SET_RACE_IN_PROGRESS", true);
            const round = state.raceSchedule[state.currentRound];

            setTimeout(() => {
                commit("SET_RACE_IN_PROGRESS", false);
                commit("ADVANCE_ROUND");
            }, 1000);

        },
        resetRace({ commit }) {
            commit("RESET_RACE");
        },
        advanceRound({ commit }) {
            commit("ADVANCE_ROUND");
        },
        addRaceResult({ commit }, result) {
            commit('ADD_RACE_RESULT', result);
        },
    },
    getters: {
        horses: (state) => state.horses,
        raceSchedule: (state) => state.raceSchedule,
        currentRound: (state) => state.currentRound,
        raceResults: (state) => state.raceResults,
        isRaceInProgress: (state) => state.isRaceInProgress,
    },
};

