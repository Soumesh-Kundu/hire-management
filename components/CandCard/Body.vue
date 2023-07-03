<template>
    <div class="p-2 bg-gray-100 rounded-md" id="button-open">
        <div class="flex items-center gap-2 pb-2 border-b border-b-gray-200">
            <img class="w-10 h-10 rounded-full" :src="content?.candidate?.image ?? defaultImg" alt="cand-img" />
            <p class="font-semibold capitalize">{{ content.name }}</p>
        </div>

        <div class="flex justify-between pt-2">
            <div v-if="content.rating <= 5" class="flex">
                <StarIcon v-for="n in content.rating" class="w-5 h-5 text-yellow-400" />
                <StarIcon v-for="n in 5 - content.rating" class="w-5 h-5 text-gray-300" />
            </div>

            <p>{{ content.days ?? 1 }} day ago</p>
        </div>
    </div>
</template>
  
<script setup>
import { StarIcon } from '@heroicons/vue/24/solid';
import defaultImg from '~/assets/images/default.jpg'
const { content } = defineProps(['content']);
</script>
