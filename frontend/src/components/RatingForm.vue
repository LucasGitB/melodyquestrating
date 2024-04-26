<template>
    <div class="rating-form bg-custom-color p-6 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4 text-white">Notez la performance !</h3>
      <form @submit.prevent="submitRating" class="space-y-4">
        <div class="my-4">
          <label class="block text-sm font-medium text-white">Note:</label>
          <div class="flex">
            <template v-for="star in 5">
              <span class="cursor-pointer" :class="{'text-yellow-400': star <= rating.score, 'text-gray-300': star > rating.score}" @click="setRating(star)">
                ★
              </span>
            </template>
          </div>
        </div>
        <button type="submit" class="w-full bg-custom-color-inverse hover:bg-white text-grey font-bold py-2 px-4 rounded">
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
    .bg-custom-color {
      background: linear-gradient(to bottom right, violet, orange);
    }
  </style>

