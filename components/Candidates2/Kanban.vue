<script setup>
import draggable from 'vuedraggable';

const { data, detailsHandler } = defineProps(['data', 'detailsHandler']);

const byGrouped = computed(() => {
  return arrangeByStages(data, 'stages.state');
});

function arrangeByStages(data, queryString) {
  const keys = queryString.split('.');
  return data?.reduce((acc, user) => {
    let fieldValue = user;
    for (const key of keys) {
      if (fieldValue && fieldValue.hasOwnProperty(key)) {
        fieldValue = fieldValue[key];
      } else {
        fieldValue = undefined;
        break;
      }
    }
    (acc[fieldValue] ||= []).push(user);
    return acc;
  }, {});
}

function changeGroup(list, evt, key) {
  if (evt.added !== undefined) {
    let currentElement = list[evt.added.newIndex];
    let nextElement = list[(evt.added.newIndex + 1) % list.length];
    currentElement[key] = {
      ...nextElement[key],
      value: currentElement[key].value,
    };
  }
}
</script>

<template>
  <div v-for="(candidates, group) in byGrouped" class="flex flex-col gap-4">
    <CandCardHead
      :border="`${candidates[0].stages.border}`"
      :title="group"
      :count="candidates.length"
    />
    <draggable
      :list="candidates"
      group="kanban"
      itemKey="grouped"
      @change="changeGroup(candidates, $event, 'stages')"
      class="flex flex-col gap-4"
    >
      <template #item="{ element: data, index }">
        <CandCardBody
          :content="data"
          class="cursor-grab"
          @click="
            () => {
              detailsHandler({ ...data });
              drawer.toggle();
              console.log(drawer);
            }
          "
        />
      </template>
    </draggable>
  </div>
</template>
