<template>
  <div class="home">
    <NoteHome msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import NoteHome from "@/components/NoteHome.vue";

export default {
  name: "HomeView",
  components: {
    NoteHome,
  },
};
</script>
