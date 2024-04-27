<template>
  <router-view></router-view>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onBeforeMount(() => {
  // Vous pouvez utiliser `route` ici
})
</script>
