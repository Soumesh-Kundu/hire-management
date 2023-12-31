<script setup>
import {
  ArrowDownTrayIcon,
  PrinterIcon,
  ChevronDownIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@heroicons/vue/24/solid';
import useGroup from '~/composables/grouping';
import{ Drawer }from 'flowbite'

const {app}=useRealm()
const {resetFilterFields } = useTableData()
const DUMMY_DATA=useState('tableDummyData')
const { getCurrentCandInfo } = useCandidate()
const {setGroup}=useGroup()
const drawer=ref()
const editingId=ref(null)


function seteditingId(index){
  if(editingId.value!==index){
    editingId.value=index
    console.log("different Index",editingId.value)
  }
  else{
    editingId.value=null
    console.log("smae Index" ,editingId.value)
  }
  return editingId.value
}
onMounted( async ()=>{
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
})
onUnmounted(()=>{
  drawer.value.hide()
  resetFilterFields()
  setGroup({
    active:false,
    groupedBy:null
  })
})


const detailsHandler = (rowData) => {
  getCurrentCandInfo(rowData);
  drawer.value.show()
};


const headers = ref([
  { name: "Name", type: 'String', displayName: 'Candidate Name', sortable: true, primaryKey: true },
  { name: "Rating", type: 'Number', displayName: 'Rating', sortable: true, primaryKey: false },
  { name: 'Stages', type: 'String', displayName: 'Stages', sortable: false, primaryKey: false },
  { name: 'Team', type: 'String', displayName: 'Team', sortable: false, primaryKey: false },
  { name: 'Date', type: "Date", displayName: 'Applied Date', sortable: true, primaryKey: false },
  { name: 'Owner', type: 'String', displayName: 'Owner', sortable: false, primaryKey: false }
]);

const queryMap = new Map([
  ['Name', 'name'],
  ['Rating', 'rating'],
  ['Stages', 'stage.state'],
  ['Team', 'team.team'],
  ['Date', 'appliedDate'],
  ['Owner', 'owner.name'],
])

const groupMap = new Map([
  ['Rating', 'rating'],
  ['Stages', 'stage.state'],
  ['Team', 'team.team'],
  ['Owner', 'owner'],
])

const tableRowMap = new Map([
  ['Name', { property: 'name', component: resolveComponent('CandidatesTableDataName'), clickHandler: detailsHandler}],
  ['Rating', { property: 'rating', visibility: 'isRatingVisible', component: resolveComponent('CandidatesTableDataRating') }],
  ['Stages', { property: 'stage', visibility: 'isStagesVisible', component: resolveComponent('CandidatesTableDataStages') }],
  ['Team', { property: 'team', visibility: 'isTeamVisible', component: resolveComponent('CandidatesTableDataTeam') }],
  ['Date', { property: 'appliedDate', visibility: 'isDateVisible', component: resolveComponent('CandidatesTableDataDate') }],
  ['Owner', { property: 'owner', visibility: 'isOwnerVisible', component: resolveComponent('CandidatesTableDataOwner') }],
])
</script>

<template>
  <SideDrawer />
  <div class="flex flex-col h-full lg:h-[91.5vh] px-5 pt-5">
    <header class="mb-10 max-lg:mb-6 max-sm:mb-8">
      <div class="flex items-center justify-between max-xl:flex-col max-xl:items-start max-xl:gap-4 max-sm:flex-row">
        <div class="flex items-center">
          <h3 class="mr-6 text-2xl max-xl:text-xl max-xl:mr-4 max-sm:hidden">
            56 Candidates
          </h3>

          <!-- FILTER Dropdown -->
          <CandidatesFilterDropDown :headers="[...headers]" :queryMap="queryMap" />

          <!-- HIDE Dropdown -->
          <CandidatesHideDropDown :headers="headers.filter(item => !item.primaryKey)" :visiblityMap="tableRowMap" />

          <!-- SORT Dropdown -->
          <CandidatesSortDropDown :headers="headers.filter(item => item.sortable)" :queryMap="queryMap" />

          <CandidatesGroupDropDown :headers="headers.filter(item => !item.primaryKey && item.type !== 'Date')" />
        </div>

        <div class="flex items-center">

          <div v-if="editingId!==null" class="flex items-center gap-3 pr-3 mr-3 border-r border-gray-400 max-md:border-none max-md:mr-0">
            <!-- editing -->
              <button
                class="p-2 text-blue-500 bg-white border border-blue-500 rounded-md hover:bg-gray-100">
                <PencilIcon class="w-6 h-6 font-semibold" />
              </button>
              <!-- deleting -->
              <button
                class="p-2 text-red-500 bg-white border border-red-500 rounded-md hover:bg-gray-100">
                <TrashIcon class="w-6 h-6 font-semibold" />
              </button>
          </div>

          <button
            class="p-2 mr-3 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-500 hover:text-white">
            <ArrowDownTrayIcon class="w-6 h-6 font-semibold" />
          </button>

          <button
            class="p-2 mr-3 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-500 hover:text-white max-md:hidden">
            <PrinterIcon class="w-6 h-6 font-semibold" />
          </button>

          <NuxtLink to="/add-candidate" class="flex items-center gap-1 border-2 rounded-md border-black px-5 py-[.54rem] max-md:p-2" >
            <PlusIcon class="w-4 h-4 font-semibold max-md:w-5 max-md:h-5" />
            <span class="text-sm font-medium max-md:hidden">Add Candidate</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <CandidatesTable :TABLE_DATA="DUMMY_DATA" :key="DUMMY_DATA" :headers="headers" :setEditingId="seteditingId" :queryMap="queryMap" :tableRowMap="tableRowMap" :groupMap="groupMap" :editingId="editingId" />

    <footer class="flex items-center justify-between py-3 mt-auto mb-2">
      <div class="flex items-center gap-4">
        <span class="text-base text-gray-500 max-xl:text-sm max-md:hidden">View</span>

        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
          class="text-gray-600 bg-white hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md text-sm px-4 py-2.5 text-center inline-flex items-center max-xl:px-3 max-xl:py-2"
          type="button">
          10
          <ChevronDownIcon class="w-4 h-4 ml-2" />
        </button>
        <!-- Dropdown menu -->
        <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">1</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">2</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">3</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">4</a>
            </li>
          </ul>
        </div>

        <span class="text-base text-gray-500 max-xl:text-sm max-lg:hidden">Candidates per page</span>
      </div>

      <nav aria-label="Page navigation example">
        <ul class="inline-flex items-center gap-2 -space-x-px">
          <li>
            <div class="flex items-center text-gray-500">
              <ChevronLeftIcon class="w-5 h-5 max-xl:w-4 max-xl:h-4" />
              <a href="#"
                class="py-2 pl-1 pr-2 ml-0 text-base leading-tight rounded-l-lg hover:text-gray-700 max-xl:text-sm">Prev</a>
            </div>
          </li>
          <li>
            <a href="#"
              class="px-2 py-1 font-medium leading-tight bg-yellow-300 rounded-full hover:bg-yellow-400 max-xl:text-sm">1</a>
          </li>
          <li>
            <a href="#" class="px-2 py-1 font-medium leading-tight rounded-full hover:bg-yellow-400 max-xl:text-sm">2</a>
          </li>
          <li>
            <a href="#" class="px-2 py-1 font-medium leading-tight rounded-full hover:bg-yellow-400 max-xl:text-sm">3</a>
          </li>
          <li>
            <a href="#"
              class="px-2 py-1 font-medium leading-tight rounded-full hover:bg-yellow-400 max-xl:text-sm">...</a>
          </li>
          <li>
            <a href="#" class="px-2 py-1 font-medium leading-tight rounded-full hover:bg-yellow-400 max-xl:text-sm">24</a>
          </li>

          <li>
            <div class="flex items-center text-gray-500">
              <a href="#"
                class="py-2 pl-1 pr-2 ml-0 text-base leading-tight rounded-l-lg hover:text-gray-700 max-xl:text-sm">Next</a>
              <ChevronRightIcon class="w-5 h-5 max-xl:w-4 max-xl:h-4" />
            </div>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>
