<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Classement</h2>
        <ul>
            <li v-for="(item, index) in rankings" :key="index" class="flex items-center justify-between py-2 border-b border-gray-200">
                <span class="text-lg">{{ item.name }}</span>
                <span class="text-lg font-bold">{{ item.rating }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rankings: [
                { name: 'Joueur 1', rating: 4.5 },
                { name: 'Joueur 2', rating: 3.8 },
                { name: 'Joueur 3', rating: 4.2 },
                // Ajoutez d'autres éléments de classement ici
            ]
        };
    }
};
</script>

<style scoped>
/* Ajoutez du style CSS ici si nécessaire */
</style>