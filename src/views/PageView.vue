<template>

    <HeaderBar header="Notes" />

<div class="pages">
  <PagesHome/>
</div>
</template>

<script>
// @ is an alias to /src
import PagesHome from '@/components/PagesHome.vue'
import HeaderBar from "@/components/HeaderBar";

export default {
  components: {
    PagesHome,
    HeaderBar
  }
}
</script>

<style scoped>

.pages{
  text-align: center;
  max-width: 110rem;
  margin-top: 4rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
