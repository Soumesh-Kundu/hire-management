<template>
  <SideDrawer />
  <main class="mb-8">
    <header
      class="flex items-center justify-between mx-6 mt-6 max-md:flex-col max-md:items-start max-md:gap-4 max-md:mt-8">
      <div>
        <h2 class="text-xl font-semibold capitalize">
          senior product designer
        </h2>
        <p class="text-sm text-gray-600">Purwokerto. Full time</p>
      </div>
      <div>
        <button type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Share and Promote
        </button>
        <button type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Published
        </button>
      </div>
    </header>
    <div class="flex items-center justify-between mx-6 mt-8">
      <h3 class="text-base font-medium capitalize">
        total candidates:
        <span class="p-1 ml-1 font-semibold text-white bg-green-700 rounded-sm">
          {{ DUMMY_DATA?.length }}</span>
      </h3>

      <label id="tooltipBtn" class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="isKanbanNotVisible" class="sr-only peer" />
        <div
          class="w-[2.95rem] h-[1.6rem] bg-gray-300 peer-focus:outline-none peer rounded-sm peer-checked:after:translate-x-full peer-checked:after:border-none after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border after:border-gray-300 after:h-5 after:w-5 after:rounded-sm after:transition-all peer-checked:bg-green-600">
        </div>
      </label>

      <div id="tooltipContent" role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-xs font-normal text-white transition-opacity duration-300 bg-gray-700 rounded-lg shadow-sm opacity-0 tooltip">
        Toggle view
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>

    <section v-if="!isKanbanNotVisible"
      class="grid grid-cols-4 gap-8 mx-6 mt-8 max-lg:grid-cols-2 max-lg:gap-y-12 max-md:grid-cols-1 max-md:mt-8">
      <Candidates2Kanban :data="DUMMY_DATA" :key="DUMMY_DATA" :detailsHandler="detailsHandler" />
    </section>
    <Candidates2Gallery v-else :data="DUMMY_DATA" :detailsHandler="detailsHandler" />
  </main>
</template>

<script setup>
import { Drawer, Tooltip } from 'flowbite'

const { resetFilterFields } = useTableData();
const DUMMY_DATA=useState('tableDummyData')
const {  getCurrentCandInfo } = useCandidate();
const detailsHandler = (rowData) => {
  getCurrentCandInfo(rowData);
  drawer.value.show();
};

const drawer = ref();

const isKanbanNotVisible = ref(false);

onMounted(() => {
  const $targetEl = document.getElementById('tooltipContent');

  // set the element that trigger the tooltip using hover or click
  const $triggerEl = document.getElementById('tooltipBtn');
  const $drawerElement = document.querySelector('#drawer-right');
  // set modal options

  const drawerOptions = {
    placement: 'right',
    backdrop: true,
    bodyScrolling: false,
    edge: false,
    edgeOffset: '',
    backdropClasses:
      'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
  };

  // create a new modal instance
  if ($drawerElement) {
    drawer.value = new Drawer($drawerElement, drawerOptions);
  }

  // options with default values
  const options = {
    placement: 'bottom',
    triggerType: 'hover',
  };

  const tooltip = new Tooltip($targetEl, $triggerEl, options);
});
onUnmounted(() => {
  drawer.value.hide();
  resetFilterFields()
});
</script>
