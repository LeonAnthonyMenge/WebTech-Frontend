<template>
  <tr v-if="notes.length === 0">
    <td colspan="2">No notes yet</td>
  </tr>
  <tr v-for="note in notes" :key="note.id">
    <td>{{ note.name }}</td>
  </tr>
</template>

<script>
export default {
  name: "NoteHome",
  props: {
    msg: String,
  },
  data() {
    return {
      color: "black",
      notes: [],
      claims: "",
      accessToken: "",
      darkMode: false,
      input: document.getElementById("toggleswitch"),
    };
  },
  methods: {
    loadThings() {
      console.log("load");
      const baseUrl = "http://localhost:8080/note";
      const endpoint = baseUrl;
      const requestOptions = {
        method: "GET",
        redirect: "follow",
        // headers: {
        //   Authorization: 'Bearer ' + this.accessToken
        // }
      };
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((result) =>
          result.forEach((note) => {
            this.notes.push(note);
          })
        )
        .catch((error) => console.log("error", error));
    },
    changeDarkMode() {
      if (this.darkMode) {
        this.darkMode = false;
        document.body.style.backgroundColor = "#FFFFFF";
        this.color = "black";
      } else {
        this.darkMode = true;
        document.body.style.backgroundColor = "#191919";
        this.color = "white";
      }
    },
    async setup() {
      if (this.$root.authenticated) {
        this.claims = await this.$auth.getUser();
        // this.accessToken = await this.$auth.getAccessToken()
      }
    },
  },
  async created() {
    await this.setup();
    this.loadThings();
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
