<template>
  <div>
    <h3 v-if="raceResults.length > 0">Race Results</h3>
    <div v-for="result in raceResults" :key="result.round" class="round-result">
      <template v-if="result.round > 0">
        <h5>Round {{ result.round }} Results :</h5>
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Position</th>
              <th>Horse Name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(horseResult, index) in result.results"
              :key="horseResult.horse.id"
              :class="getPositionClass(index)"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ horseResult.horse.name }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('race', ['raceResults']),
  },
  methods: {
    getPositionClass(index) {
      if (index === 0) return 'first-place'
      if (index === 1) return 'second-place'
      if (index === 2) return 'third-place'
      return ''
    },
  },
}
</script>

<style scoped>
.round-result {
  margin-bottom: 30px;
}

.first-place {
  background-color: #ffcccb;
  font-weight: bold;
}

.second-place {
  background-color: #d3d3d3;
  font-weight: bold;
}

.third-place {
  background-color: #ffd700;
  font-weight: bold;
}

table {
  margin-top: 10px;
  width: 100%;
}

thead {
  background-color: #f8f9fa;
}

th,
td {
  text-align: center;
  vertical-align: middle;
}

th {
  font-weight: bold;
}
</style>
