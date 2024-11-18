<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Horse</th>
          <th scope="col">Condition</th>
          <th scope="col">Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in horses" :key="horse.id">
          <td>{{ horse.id }}</td>
          <td>{{ horse.name }}</td>
          <td>{{ horse.condition }}</td>
          <td>
            <div
              :style="{
                backgroundColor: horse.color,
                width: '30px',
                height: '30px',
                borderRadius: '50%',
              }"
            ></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('race', ['horses']),
  },
  methods: {
    ...mapActions('race', ['generateHorses']),
  },
  mounted() {
    this.generateHorses()
  },
}
</script>
