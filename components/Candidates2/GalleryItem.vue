<script setup>
import { StarIcon, ChevronDownIcon } from '@heroicons/vue/24/solid';

const { content } = defineProps(['content']);
const colorMap = new Map([
  ['Screening', 'green-800'],
  ['New Applied', 'emerald-400'],
  ['Design Challange', 'orange-400'],
  ['Interview', 'violet-400']
])
</script>

<template>
  <div
    class="w-full max-w-sm bg-white border border-gray-200 rounded-md shadow"
  >
    <div class="flex flex-col items-center pb-8 pt-4">
      <div class="relative">
        <img
          class="w-20 h-20 mb-2 rounded-full shadow-lg"
          :src="content.candidate.image"
          :alt="content.candidate.name"
        />

        <div
          class="flex items-center gap-1 shadow-md px-2 rounded-full absolute bg-white bottom-1 left-0 right-0 justify-center"
        >
          <StarIcon v-if="content.rating > 0" class="w-3 h-3 text-yellow-300" />
          <StarIcon v-else class="w-3 h-3 text-gray-300" />
          <span
            :class="`text-sm ${
              content.rating > 0 ? 'text-black' : 'text-gray-600'
            }`"
            >{{ content.rating }}.0</span
          >
        </div>
      </div>
      <h5 class="mb-1 text-lg font-medium text-gray-900 dark:text-white">
        {{ content.candidate.name }}
      </h5>
      <p class="text-sm text-gray-500">Owner: Kristin Watson</p>
      <span class="text-sm text-gray-500">{{ content.team.self }}</span>
      <span class="text-sm text-gray-500">{{ content.team.team }}</span>
    </div>

    <div class="px-4 py-2 pl-3">
      <div class="flex items-center justify-between">
        <div :class="`border bg-${colorMap.get(content.stages.state)} text-white px-2 py-[.2rem] rounded-md text-sm`">
          {{ content.stages.state }}
        </div>
      </div>
    </div>
  </div>
</template>
