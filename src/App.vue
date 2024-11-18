<template>
  <div>
    <nav class="navbar bg-warning">
      <div class="container-fluid">
        <a class="navbar-brand">Horse Racing</a>
        <Controls />
      </div>
    </nav>
    <div class="content">
      <HorseList class="horse-list" />
      <RaceTrack class="race-track" />
      <RaceProgram class="race-program" />
      <Results class="results" />
    </div>
  </div>
</template>

<script>
import HorseList from './components/HorseList.vue'
import RaceTrack from './components/RaceTrack.vue'
import Results from './components/Results.vue'
import Controls from './components/Controls.vue'
import RaceProgram from './components/RaceProgram.vue'

export default {
  components: { HorseList, RaceTrack, Results, Controls, RaceProgram },
}
</script>

<style>
.content {
  display: flex;
  height: calc(100vh - 56px);
  gap: 20px; /* Adjust the gap value as needed */
}

.horse-list,
.race-track,
.results,
.race-program {
  flex: 1;
}

.race-track {
  flex: 2;
}

.results {
  flex: 2;
}
</style>
