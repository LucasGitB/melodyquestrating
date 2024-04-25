<template>
  <div class="rating-form bg-gray-100 p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4">Donnez votre avis</h3>
    <form @submit.prevent="submitRating" class="space-y-4">
      <div>
        <label for="performer" class="block text-sm font-medium text-gray-700">Nom du chanteur:</label>
        <input type="text" id="performer" v-model="rating.performer" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
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
      <div>
        <label for="comment" class="block text-sm font-medium text-gray-700">Commentaire:</label>
        <textarea id="comment" v-model="rating.comment" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
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
        performer: '',
        score: 0, // Initial score set to 0
        comment: ''
      }
    };
  },
  methods: {
    setRating(star) {
      this.rating.score = star;
    },
    async submitRating() {
      try {
        const response = await fetch('http://localhost:3000/ratings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.rating)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.$emit('rating-submitted');
        this.rating = { performer: '', score: 0, comment: '' }; // Reset form
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
