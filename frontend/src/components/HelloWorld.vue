<template>
  <div class="rating-form bg-gray-100 p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4">Donnez votre avis</h3>
    <form @submit.prevent="submitRating" class="space-y-4">
      <div>
        <label for="playerId" class="block text-sm font-medium text-gray-700">Player ID (UUID):</label>
        <input type="text" id="playerId" v-model="rating.playerId" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Note:</label>
        <div class="flex">
          <template v-for="star in 5">
            <span class="cursor-pointer" :class="{'text-yellow-400': star <= rating.score, 'text-gray-300': star > rating.score}" @click="setRating(star)">
              ★
            </span>
          </template>
        </div>
      </div>
      <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Envoyer
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating: {
        playerId: '', // playerId vide pour permettre à l'utilisateur de saisir manuellement l'UUID
        score: 0,
      }
    };
  },
  methods: {
    setRating(star) {
      this.rating.score = star;
    },
    async submitRating() {
      try {
        // Convertissez playerId en UUID avant de l'envoyer
        const playerId = this.rating.playerId.toLowerCase().replace(/[^a-f0-9]/g, '');
        const { performer, score, comment } = this.rating; // Destructuration des données d'évaluation
        const response = await fetch('http://localhost:3000/ratings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ playerId, performer, score, comment })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.rating = { playerId: '', performer: '', score: 0, comment: '' }; // Réinitialisation du formulaire
        alert('Votre avis a été enregistré !');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Pas besoin de style ici car nous utilisons Tailwind */
</style>
