<script setup lang="ts">
import type { Person } from '@/types/personTypes'

interface Props {
  person: Person
}

const emit = defineEmits<{
  (e: 'setId', id: number): void
}>()

defineProps<Props>()
</script>

<template>
  <div>
    <img
      @click="emit('setId', person.id)"
      class="person-image"
      :src="`https://api.smotrim.ru/api/v1/pictures/${person.picId}/bq/redirect`"
      :alt="person.title"
    />
    <div class="person-info">
      {{ person.name }}<br />
      {{ person.surname }}
    </div>
  </div>
</template>

<style scoped>
.person-image {
  cursor: pointer;
  width: 176px;
  height: 176px;
  border-radius: 50%;
}
.person-info {
  line-height: 20px;
  color: black;
  font-weight: 500;
}
</style>
