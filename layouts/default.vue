<template>
  <div>
    <SideBar />
    <div class="p-0 sm:ml-64">
      <StatusBar />

      <div class="relative">
        <main
          class="w-full main-container"
        >
          <slot />
        </main>
        <div class="absolute top-0 right-0 h-screen taskmenu max-lg:hidden">
          <TaskMenu />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {app}=useRealm()
onMounted(async ()=>{
  if(!app.currentUser){
    navigateTo('/login')
  }
  await app.currentUser.refreshAccessToken()
  await fetchCandidate(app.currentUser.accessToken)
})
</script>

