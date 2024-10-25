<script setup lang="ts">
import { onMounted, ref } from 'vue'
import apiService from '@/services/personsService'

const person = ref(null)
const isError = ref(null)

interface Props {
  id: number | null
}

const emit = defineEmits<{
  (e: 'close'): void
}>()

const props = defineProps<Props>()

const getPerson = async () => {
  try {
    person.value = await apiService.getPersonById(props.id)
    console.log(person.value.data);
  } catch (error) {
    isError.value = error.message
  }
}

onMounted(() => {
    getPerson()
})
</script>

<template>
  <teleport to="body">
<!--    <div v-if="isError">-->
<!--      <h3>Error: {{ isError }}</h3>-->
<!--    </div>-->
    <div @click="emit('close')" class="backdrop"></div>
    <transition name="dialog">
      <dialog open>
        <section>
<!--          <img-->
<!--            class="person-image"-->
<!--            :src="`https://api.smotrim.ru/api/v1/pictures/${person.data.id}/bq/redirect`"-->
<!--            :alt="person.data.name"-->
<!--          />-->
        </section>
        <div v-if="person">
          {{person.body}}
        </div>
      </dialog>
    </transition>
  </teleport>
</template>

<style scoped>

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(217, 217, 217, 0.7);
  backdrop-filter: blur(12px);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
