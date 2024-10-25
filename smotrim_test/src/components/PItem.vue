<script setup lang="ts">
interface Props {
  person: {
    id: number
    name: string
    surname: string
    title: string
    picId: number
  }
}

const emit = defineEmits<{
  (e: 'setId', id: number): void
}>()

const props = defineProps<Props>()
</script>

<template>
  <div class="person-item">
    <img
      @click="emit('setId', props.person.id)"
      class="person-image"
      :src="`https://api.smotrim.ru/api/v1/pictures/${props.person.picId}/bq/redirect`"
      :alt="props.person.title"
    />
    <div class="person-info">
      {{ props.person.name }}<br />
      {{ props.person.surname }}
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
