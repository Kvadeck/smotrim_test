<script setup lang="ts">
import { onMounted, ref } from 'vue'
import apiService from '@/services/personsService'
import type { PersonById } from '@/types/personTypes'
import PSpinner from '@/components/PSpinner.vue'

const person = ref<PersonById | null>(null)
const isError = ref('')
const isLoading = ref(false)

interface Props {
  currentPersonId: number | null
}

const emit = defineEmits<{
  (e: 'close'): void
}>()

const props = defineProps<Props>()

const getPerson = async () => {
  isLoading.value = true
  try {
    person.value = await apiService.getPersonById(props.currentPersonId)
  } catch (error: unknown) {
    if (error instanceof Error) {
      isError.value = error.message
    } else {
      isError.value = String(error)
    }
  }
  isLoading.value = false
}

onMounted(() => {
  getPerson()
})
</script>

<template>
  <teleport to="body">
    <div @click="emit('close')" class="backdrop"></div>
    <dialog open>
      <div class="person-modal-wrapper">
        <div class="is-loading" v-if="isLoading">
          <PSpinner />
        </div>
        <div class="is-error" v-else-if="isError">
          <h3>Error: {{ isError }}</h3>
        </div>
        <div class="person-modal" v-else>
          <img
            class="cross-icon"
            @click="emit('close')"
            src="@/assets/cross.png"
            alt="cross_icon"
          />
          <div v-if="person">
            <div class="person-inner">
              <img
                class="person-modal-image"
                :src="person.mdPictureLink"
                :alt="person.name"
              />
              <h3 class="person-modal-full-name">
                {{ person.name }}<br />{{ person.surname }}
              </h3>
            </div>
            <div class="person-anons">
              <div v-if="person.anons">{{ person.anons }}</div>
              <div v-else>Информация отсутствует</div>
            </div>
            <div class="person-body">
              <div v-if="person.body" v-html="person.body"></div>
              <div v-else>Информация отсутствует</div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </teleport>
</template>

<style scoped>
.person-modal-wrapper {
  display: flex;
  font-family: 'Inter', sans-serif;
}
.person-modal {
  padding: 30px 30px;
}
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
.person-anons {
  margin: 25px 0;
}
.person-body {
  max-height: 340px;
  overflow-y: auto;
}
.person-inner {
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-family: 'Inter', sans-serif;
}

.person-modal-full-name {
  font-size: 28px;
  font-weight: 500;
  line-height: 34px;
}
.cross-icon {
  width: 26px;
  height: 26px;
  cursor: pointer;
  position: absolute;
  right: 20px;
}
@media screen and (min-width: 1280px) {
  .person-inner {
    flex-direction: row;
    align-items: center;
  }
  .person-modal-full-name {
    font-size: 40px;
    line-height: 48px;
  }
}

.person-modal-image {
  width: 200px;
  height: 200px;
  border-radius: 8px;
}
dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 600px;
  min-height: 300px;
  z-index: 100;
  border-radius: 16px;
  border: none;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}
</style>
