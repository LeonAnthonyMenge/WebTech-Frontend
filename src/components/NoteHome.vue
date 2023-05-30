<template>
  <div class="input">
    <input v-model="notefield" placeholder="new Note" type="text" @keyup.enter="save()">
    <button type="button" @click="save()">Save</button>
  </div>
  <tr v-if="notes.length === 0">
    <td colspan="2">No notes yet</td>
  </tr>
  <tr v-for="note in notes" :key="note.id">
    <td>{{ note.name }}</td>
  </tr>
  <tr>
    <td>{{ notefield }}</td>
  </tr>

</template>

<script>
export default {
  name: "NoteHome",
  data() {
    return {
      color: "black",
      notefield: "",
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
    save () {
      const baseUrl = "http://localhost:8080/note"
      const endpoint = baseUrl
      const data = {
        string: this.notefield,
      }
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Authorization: 'Bearer ' + this.accessToken
        },
        body: JSON.stringify(data)
      }
      if(this.notefield === '') {
        console.log("empty field");
        return;
      }  
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data)
        })
        .catch(error => console.log('error', error))
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
<style scoped>
body {
}  
.input{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
}
button{
  margin:0.5rem;
}
tr{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
  border-bottom: 1px solid rgb(100, 100, 100);
}
</style>
