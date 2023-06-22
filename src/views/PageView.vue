<template>
  <HeaderBar header="Notes" />
  <PagesHome/>
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