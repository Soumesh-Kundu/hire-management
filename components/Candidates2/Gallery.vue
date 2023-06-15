<script setup>
const { data } = defineProps(['data']);
</script>

<template>
  <Candidates2GalleryItem v-for="cand in data" :content="cand" />
</template>
