<template>
    <div>
      <h1>Scores des joueurs</h1>
      <ul v-if="scores.length">
        <li v-for="score in scores" :key="score.playerId">
          Joueur {{ score.playerId }}: {{ score.totalScore }}
        </li>
      </ul>
      <p v-else>Aucun score trouvé</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        scores: [],
      };
    },
    async created() {
      try {
        const response = await fetch('http://localhost:3000/total-scores');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.scores = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération des scores totaux:', error);
      }
    },
  };
  </script>
  