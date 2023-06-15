<script setup>
import draggable  from 'vuedraggable'
const { data } = defineProps(['data']);
const local_data = ref(data)
</script>

<template>
  <draggable v-model="local_data" item-key="gallery"
    class="grid grid-cols-4 gap-8 mx-6 mt-8 max-lg:grid-cols-2 max-lg:gap-y-12 max-md:grid-cols-1 max-md:mt-8" tag="section">
    <template #item="{ element: cand }">
      <Candidates2GalleryItem :content="cand" />
    </template>
  </draggable>
</template>
