<template>
    <PostcodeSearchBox
        v-model="postcode"
        @submit="handleSearch"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PostcodeSearchBox from './PostcodeSearchBox.vue'

const postcode = ref('')

const handleSearch = (value: string) => {
  console.log('Searching for:', value)
}
</script>
