<template>
    <router-view />
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      isLoggedIn: false,
      darkMode: false
    };
  },
  methods: {
    setIsLoggedIn(value) {
      this.isLoggedIn = value;
      localStorage.setItem("isLoggedIn", JSON.stringify(value));
    },
    getIsLoggedIn() {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      return isLoggedIn ? JSON.parse(isLoggedIn) : false;
    },
    getDarkMode(){
      const darkMode = localStorage.getItem("darkMode");
      return darkMode ? JSON.parse(darkMode) : false;
    },
    setDarkMode(value){
      this.darkMode = value;
      localStorage.setItem("darkMode", JSON.stringify(value));
    }
  },
  created() {
    this.isLoggedIn = this.getIsLoggedIn();
    this.darkMode = this.getDarkMode();
  },
};

</script>

<style>


</style>
