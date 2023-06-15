<script setup>
import { StarIcon } from '@heroicons/vue/24/solid';
const { content } = defineProps(['content']);
</script>

<template>
  <div
    class="w-full max-w-sm bg-white border border-gray-200 rounded-md shadow"
  >
    <div class="flex flex-col items-center pb-8 pt-4">
      <img
        class="w-20 h-20 mb-2 rounded-full shadow-lg"
        :src="content.candidate.image"
        :alt="content.candidate.name"
      />
      <h5 class="mb-1 text-lg font-medium text-gray-900 dark:text-white">
        {{ content.candidate.name }}
      </h5>
      <p class="text-sm text-gray-500">Owner: Kristin Watson</p>
      <span class="text-sm text-gray-500">{{ content.team.self }}</span>
      <span class="text-sm text-gray-500">{{ content.team.team }}</span>
    </div>

    <div class="px-4 py-2 pl-3">
      <div class="flex items-center justify-between">
        <div
          :class="`border ${content.stages.color} text-white px-2 py-[.2rem] rounded-md text-sm`"
        >
          {{ content.stages.state }}
        </div>

        <div class="flex justify-between">
          <div v-if="content.rating <= 5" class="flex">
            <StarIcon
              v-for="n in content.rating"
              class="w-5 h-5 text-yellow-400"
            />
            <StarIcon
              v-for="n in 5 - content.rating"
              class="w-5 h-5 text-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
