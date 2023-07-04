<script setup>
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/solid';
import {PencilIcon,TrashIcon} from '@heroicons/vue/24/outline'
import { Dropdown } from 'flowbite';

const { data, headers, tableRowMap, editingId,index } = defineProps([
  'data',
  'headers',
  'tableRowMap',
  'editingId',
  'index'
]);
const emit = defineEmits(['check'])
const rowData = {
  ...data,
};
const { tableTdVisible } = useHideDropDown();

onMounted(()=>{
  const $targetElHide = document.getElementById(`editDropdownMenu${index}`);

  // set the element that trigger the dropdown menu on click
  const $triggerElHide = document.getElementById(`editDropdownBtn${index}`);

  // options with default values
  const options = {
    placement: 'bottom',
    triggerType: 'click',
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300,
  };

  const hideDropdown = new Dropdown($targetElHide, $triggerElHide, options);
})

</script>

<template>
  <td class="w-4 p-4 rounded-tl-md" scope="row">
    <div class="flex items-center">
      <input id="checkbox-table-search-1" type="checkbox" @click="() => {
        emit('check')
      }" :checked="editingId === data._id"
        class="w-5 h-5 text-green-400 bg-gray-100 border-gray-300 focus:ring-white focus:ring-0" />
      <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
    </div>
  </td>
  <template v-for="(header, i) in headers" :key="i">
    <td
      v-if="tableRowMap.get(header.name).visibility === undefined ? true : tableTdVisible[tableRowMap.get(header.name).visibility]">
      <component :is="tableRowMap.get(header.name)?.component" :content="rowData[tableRowMap.get(header.name).property]"
        @click="tableRowMap.get(header.name)?.clickHandler !== undefined ? tableRowMap.get(header.name).clickHandler(rowData) : ''">
      </component>
    </td>
  </template>
  <td class="px-3 py-4 rounded-tr-md">
    <button type="button" :id="`editDropdownBtn${index}`" :data-dropdown-toggle="`editDropdownMenu${index}`">
      <EllipsisHorizontalIcon class="w-6 h-6" />
    </button>
    <div :id="`editDropdownMenu${index}`"
      class="z-10 hidden !-ml-1.5 bg-white divide-y divide-gray-100 rounded-md shadow dark:bg-gray-700 dark:divide-gray-600">
      <ul class="flex flex-col items-start gap-2 px-3 py-2 space-y-1 text-sm text-gray-700 dark:text-gray-200" :aria-labelledby="`hideDropdownBtn${index}`">
        <!-- editing -->
        <li class="flex items-center justify-start gap-1.5 cursor-pointer"><PencilIcon class="w-5 h-5 text-blue-500" /> Edit </li>
        <!-- deleting -->
        <li class="flex items-center justify-start gap-1.5 cursor-pointer" ><TrashIcon class="w-5 h-5 text-red-500" /> Delete</li>
      </ul>
    </div>
  </td>
</template>
