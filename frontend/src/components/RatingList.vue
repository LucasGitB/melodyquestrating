<template>
  <div class="bg-custom-color">
    <div class="flex justify-center">
      <img src="../assets/logo-melodyquest.png" class="w-48" />
    </div>
    <div class="p-6 text-center">
      <h1 class="text-2xl font-bold mb-4">Scores des joueurs</h1>
      <div v-if="scores.length">
        <div
          v-for="(score, index) in scores"
          :key="score.playerId"
          class="mb-2"
        >
          <span :class="getPodiumClass(index)">{{ index + 1 }}.</span>
          <span class="ml-2 text-lg"
            >{{ score.Player.playerName }}: {{ score.totalScore }}</span
          >
        </div>
      </div>
      <p v-else class="text-red-500">Aucun score trouvé</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scores: [],
    };
  },
  methods: {
    getPodiumClass(index) {
      switch (index) {
        case 0:
          return "font-bold text-lg text-gold";
        case 1:
          return "font-bold text-lg text-silver";
        case 2:
          return "font-bold text-lg text-bronze";
        default:
          return "font-bold text-lg";
      }
    },
  },
  async created() {
    try {
      const response = await fetch("http://localhost:3000/total-scores");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.scores = await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération des scores totaux:", error);
    }
  },
};
</script>

<style scoped>
.text-gold {
  color: gold;
}
.text-silver {
  color: silver;
}
.text-bronze {
  color: #cd7f32;
}

.bg-custom-color {
  background: linear-gradient(to bottom right, violet, orange);
}
</style>
