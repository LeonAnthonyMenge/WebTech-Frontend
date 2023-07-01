<template>
  <button v-if="authState && authState.isAuthenticated" v-on:click="logout()">Logout</button>
    <router-view />
</template>

<script>
export default {
  name: 'app',
  methods: {
    async logout () {
      await this.$auth.signOut()
    }
  }
}
</script>

<style scoped>

</style>
