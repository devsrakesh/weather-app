<template>
  <div>
    hello 
    <input
      v-model="query"
      @keyup.enter="search"
      placeholder="Search for a location"
    />
    <button @click="search" :disabled="isLoading">
      Search
    </button>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <ul v-if="locations.length > 0">
      <li v-for="location in locations" :key="location.name">
        {{ location.name }} ({{ location.lat }}, {{ location.lng }})
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLocationStore } from '@/stores/location';

const query = ref('');
const locationStore = useLocationStore();
const { locations, isLoading, error, searchLocations } = locationStore;

const search = () => {
  if (query.value.trim()) {
    searchLocations(query.value);
  }
};
</script>
