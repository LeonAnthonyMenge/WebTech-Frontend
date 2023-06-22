<template>
  <HeaderBar :header="pageName" />
  <NoteHome/>
</template>

<script>
// @ is an alias to /src
import NoteHome from '@/components/NoteHome.vue'
import HeaderBar from "@/components/HeaderBar.vue";

export default {
  components: {
    NoteHome,
    HeaderBar
  },
  date() {
    return{
      pageName: "Note"
    }
  },
  created() {
    this.pageName = this.$route.params.pageName
  }
}
</script>