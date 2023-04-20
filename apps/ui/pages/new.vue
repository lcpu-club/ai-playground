<template>
  <component :is="CreateView" v-if="type" />
  <VContainer v-else>
    <VCard> Bad Type!!! </VCard>
  </VContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const { types } = useSessionTypes()
const type = types[route.query.type as string]
const CreateView = type?.CreateView
</script>
