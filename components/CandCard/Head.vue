<template>
    <div :class="`flex justify-between bg-gray-100 px-4 py-3 rounded-md border-t-4 border-t-${colorMap.get(title)}`">
        <h4 class="font-semibold capitalize">{{ title }}</h4>
        <span class="font-semibold">{{ count }}</span>
    </div>
</template>
  
<script setup>
const colorMap=new Map([
    ['Screening','green-800'],
    ['New Applied','emerald-400'],
    ['Design Challange','orange-400'],
    ['Interview','violet-400']
])
const { border, title, count } = defineProps(['border', 'title', 'count']);
</script>