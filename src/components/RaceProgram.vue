<template>
  <div>
    <h3 v-if="raceSchedule.length > 0">Race Program</h3>
    <div v-for="round in raceSchedule" :key="round.round" class="round-program">
      <template v-if="round.distance !== 1000">
        <h4>Race Distance: {{ round.distance }}m</h4>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Horse Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(horse, index) in round.horses" :key="horse.id">
              <td>{{ index + 1 }}</td>
              <td>{{ horse.name }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    raceSchedule() {
      // Example for raceSchedule format; in real case, it comes from Vuex store
      return this.$store.getters['race/raceSchedule']
    },
  },
}
</script>

<style scoped>
.round-program {
  margin-bottom: 20px;
}

table {
  width: 100%;
  margin-top: 10px;
}
</style>
