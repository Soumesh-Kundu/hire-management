<template>
    <div class="max-w-2xl mx-5 my-20 sm:mx-10 md:mx-auto">
        <h1 class="text-3xl font-semibold text-green-900">Add Candidate</h1>

        <form class="grid w-full grid-cols-1 gap-6 mt-5 md:grid-cols-2" @submit.prevent="addCandidate">
            <div class="md:col-span-2">
                <label for="first_name" class="block mb-2 text-sm font-bold ">
                    Full Name</label>
                <input type="text" id="first_name" v-model="data.fullname"
                    class="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-gray-300 block w-full p-2.5 placeholder:font-semibold"
                    placeholder="Enter name">
            </div>

            <div class="col-span-1">
                <label for="email" class="block mb-2 text-sm font-bold ">
                    Email</label>
                <input type="email" id="email" v-model="data.email"
                    class="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-gray-300 block w-full p-2.5 placeholder:font-semibold"
                    placeholder="Enter email">
            </div>
            <div class="col-span-1">
                <label for="password" class="block mb-2 text-sm font-bold ">
                    Password</label>
                <input type="password" id="password" v-model="password"
                    class="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-gray-300 block w-full  p-2.5 placeholder:font-semibold"
                    placeholder="Enter password">
            </div>
            <div class="col-span-1">
                <label for="last_name" class="block mb-2 text-sm font-bold">Stage</label>
                <select type="text" id="last_name" v-model="data.stage.state"
                    class="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-gray-300 block w-full p-2.5 font-semibold "
                    placeholder="">
                    <option value="Enter stage">None</option>
                    <option value="New Applied">New Applied</option>
                    <option value="Screening">Screening</option>
                    <option value="Design Challenge">Design Challenge</option>
                    <option value="Interview">Interview</option>
                </select>
            </div>
            <div class="col-span-1">
                <label for="Job_Type" class="block mb-2 text-sm font-bold">Job Type</label>
                <select type="text" id="Job-Type"
                    class="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-gray-300 block w-full p-2.5 font-semibold " v-model="data.team.self">
                    <option value="Enter stage">None</option>
                    <option value="Junior UI Designer">Junior UI Designer</option>
                    <option value="UX Researcher">UX Researcher</option>
                    <option value="Senior UI Designer">Senior UI Designer</option>
                </select>
            </div>
            <div class="col-span-1">
                <label for="Job_Type" class="block mb-2 text-sm font-bold">Team</label>
                <select type="text" id="Job-Type" v-model="data.team.team"
                    class="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-gray-300 block w-full p-2.5 font-semibold ">
                    <option value="Enter stage">None</option>
                    <option value="Design Team">Design Team</option>
                    <option value="Developer Team">Developer Team</option>
                    <option value="Marketing Team">Marketing Team</option>
                </select>
            </div>
            <div class="col-span-1">
                <label for="company" class="block mb-2 text-sm font-bold ">Applied Date</label>
                <input type="date" id="company" v-model="data.appliedDate"
                    class="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-gray-300 block w-full p-2.5 placeholder:font-semibold font-semibold"
                    placeholder="dd/mm/yyyy" required>
            </div>
            <div class="">
                <label for="Job_Type" class="block mb-2 text-sm font-bold">Owner</label>
                <select type="text" id="Job-Type" v-model="data.owner"
                    class="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-gray-300 block w-full p-2.5 font-semibold ">
                    <option value="Enter stage">None</option>
                    <option value="Kristin Watson">Kristin Watson</option>
                    <option value="Albert Flores">Albert Flores</option>
                    <option value="Dianne Russell">Dianne Russell</option>
                </select>
            </div>
            <div class="flex items-center col-span-1 md:col-span-2">
                <button type="submit" data-tabs-target="#Application" role="tab" aria-controls="Application"
                    aria-selected="false"
                    class="focus:outline-none text-white bg-green-800 w-36 flex iteme-center gap-2 justify-center focus:ring-4 mt-5 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2">
                    <PlusIcon class="w-5 h-5 text-white" /> Add
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
definePageMeta({
    layout: 'login'
})
const {app,mongo}=useRealm()
const userCollection=mongo?.db('hire-management').collection('users')

const freshCopy={
    fullname:'',
    email:'',
    stage:{
        state:'None',
        value:1
    },
    team:{
        team:"None",
        self:"None"
    },
    appliedDate:'',
    owner:'',
    rating:0
}
const password=ref("")
const data=ref({...freshCopy,stage:{...freshCopy.stage},team:{...freshCopy.team}})

async function addCandidate(){
    const registerPromise=app.emailPasswordAuth.registerUser({email:data.value.email,password:password.value})
    const userPromise=userCollection.insertOne({...data.value,appliedDate:new Date(data.value.appliedDate).toISOString()})
    await Promise.all([registerPromise,userPromise])
    navigateTo('/candidates')
}
</script>