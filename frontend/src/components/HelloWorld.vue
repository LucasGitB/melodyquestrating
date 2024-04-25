<template>
  <div class="rating-form">
    <h3>Donnez votre avis</h3>
    <form @submit.prevent="submitRating">
      <div>
        <label for="performer">Nom du chanteur:</label>
        <input type="text" id="performer" v-model="rating.performer" required>
      </div>
      <div>
        <label for="score">Note:</label>
        <select id="score" v-model="rating.score" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        <label for="comment">Commentaire:</label>
        <textarea id="comment" v-model="rating.comment" required></textarea>
      </div>
      <button type="submit">Envoyer</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating: {
        performer: '',
        score: '5',
        comment: ''
      }
    };
  },
  methods: {
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
        this.rating = { performer: '', score: '5', comment: '' }; // Reset form
        alert('Votre avis a été enregistré !');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
</script>

<style scoped>
.rating-form {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
