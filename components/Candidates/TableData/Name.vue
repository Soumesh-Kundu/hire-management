<template>
    <div class="flex items-center px-3 py-5 text-gray-900 w-[170px] truncate">
        <img class="w-10 h-10 rounded-full" :src="content.image ?? defaultImg" alt="Jese image" />

        <p class="pl-3 truncate">{{ content}}</p>
    </div>
</template>

<script setup>
import defaultImg from '~/assets/images/default.jpg'
const {content}=defineProps(['content'])
</script>

<style lang="scss" scoped></style>