<template>
    <div class="px-3 py-4">
        <div class="text-black">{{ getDateFormat(content) }}</div>
    </div>
</template>


<script setup>
function getDateFormat(date) {
  const newDate=new Date(date)
  const month =
    newDate.getMonth() < 10 ? `0${newDate.getMonth() + 1}` : `${newDate.getMonth() + 1}`;
  const format = `${newDate.getDate()}/${month}/${newDate.getFullYear()}`;
  return format;
};
const {content}=defineProps(['content'])
</script>
