<template>
  <div v-if="!isSubmitted">
    <div class="rating-form bg-custom-color p-6 shadow-md">
      <div class="flex justify-center">
        <img src="../assets/logo-melodyquest.png" class="w-48" />
      </div>
      <br />
      <h3 class="text-xl  font-semibold mb-4 text-white text-center">
        Notez la performance !
      </h3>
      <form @submit.prevent="submitRating" class="space-y-4">
        <div>
          <input
            type="hidden"
            id="playerId"
            v-model="rating.playerId"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div class="my-4">
          <label class="block text-xl font-medium text-white text-center">Donnez une note de 1 à 5 étoiles</label>
          <div class="flex justify-center">
            <template v-for="star in 5">
              <span
                class="cursor-pointer text-7xl"
                :class="{
                  'text-yellow-400': star <= rating.score,
                  'text-gray-300': star > rating.score,
                }"
                @click="setRating(star)"
              >
                ★
              </span>
            </template>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class=" w-52 bg-custom-color-inverse bg-white text-grey font-bold py-2 px-4 rounded"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating: {
        playerId: "",
        score: 0,
      },
      isSubmitted: false,
    };
  },
  async created() {
    try {
      const response = await fetch("http://localhost:3000/last-player");
      const data = await response.json();
      this.rating.playerId = data.lastPlayerId;
    } catch (error) {
      console.error("Error fetching last player ID:", error);
    }
  },
  methods: {
    setRating(star) {
      this.rating.score = star;
    },
    async submitRating() {
      try {
        // Convertissez playerId en UUID avant de l'envoyer
        const playerId = this.rating.playerId
          .toLowerCase()
          .replace(/[^a-f0-9]/g, "");
        const { score } = this.rating; // Destructuration des données d'évaluation
        const response = await fetch("http://localhost:3000/ratings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playerId, score }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.rating = { playerId: "", score: 0 }; // Réinitialisation du formulaire
        this.isSubmitted = true; // Définir isSubmitted sur true
        alert("Votre avis a été enregistré !");
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>

<style scoped>
.bg-custom-color {
  background: linear-gradient(to bottom right, violet, orange);
}
</style
