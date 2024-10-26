<script setup lang="ts">
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import apiService from '@/services/personsService'
import { onMounted, ref } from 'vue'
import PItem from '@/components/PItem.vue'
import { CAROUSEL_BREAKPOINTS } from '@/constants'
import PModal from '@/components/PModal.vue'
import type { Person } from '@/types/personTypes'

const isError = ref('')
const persons = ref<Person[]>([])
const currentPersonId = ref<number | null>(null)
const showModal = ref(false)

const loadPersons = async () => {
  try {
    persons.value = await apiService.getPersons()
  } catch (error: unknown) {
    if (error instanceof Error) {
      isError.value = error.message
    } else {
      isError.value = String(error)
    }
  }
}

const updateId = (id: number) => {
  if (id) {
    currentPersonId.value = id
    showModal.value = true
  }
}

const closeModal = () => {
  showModal.value = false
}

onMounted(() => {
  loadPersons()
})
</script>

<template>
  <div v-if="isError">
    <h3>Error: {{ isError }}</h3>
  </div>
  <div v-else>
    <div class="carousel-wrapper">
      <Carousel
        :items-to-scroll="1"
        :items-to-show="8"
        :mouse-drag="false"
        :breakpoints="CAROUSEL_BREAKPOINTS"
      >
        <Slide v-for="person in persons" :key="person.id">
          <PItem @set-id="updateId" :person="person" />
        </Slide>
        <template #addons>
          <Navigation>
            <template #next>
              <img
                class="next-arrow"
                src="@/assets/arrow.png"
                alt="arrow_next"
              />
            </template>
            <template #prev>
              <img
                class="prev-arrow"
                src="@/assets/arrow.png"
                alt="arrow_prev"
              />
            </template>
          </Navigation>
        </template>
      </Carousel>
    </div>
    <PModal
      v-if="showModal"
      @close="closeModal"
      :current-person-id="currentPersonId"
    />
  </div>
</template>

<style scoped>
.carousel-wrapper {
  position: relative;
  width: 100%;
}
.prev-arrow {
  transform: rotate(-180deg);
  margin-left: -10px;
}
.next-arrow {
  margin-right: -10px;
}
.prev-arrow,
.next-arrow {
  margin-top: -40px;
}
</style>
