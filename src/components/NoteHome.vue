<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="input">
    <input v-model="notefield" placeholder="new Note" type="text" @keyup.enter="save()">
    <button type="button" @click="save()">Save</button>
  </div>
  <tr v-if="notes.length === 0">
    <td colspan="2">No notes yet</td>
  </tr>
  <tr v-for="note in notes" :key="note.id">
    <td id="noteTr">{{ note.name }}</td>
    <td id="delTr"><button type="button" @click="del(note.id)" style="font-size:12px" >Delete <i class="fa fa-trash-o"></i></button></td>
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
      baseUrl: "http://localhost:8080/note",
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
      const baseUrl = this.baseUrl
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
          this.$router.go(0);
        })
        .catch(error => console.log('error', error))
    },
    del (id){
      console.log("delete:", id);
      const baseUrl = this.baseUrl;
      const endpoint = `${baseUrl}/${id}`;
      const data = {
        id: id,
      }
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
          // Authorization: 'Bearer ' + this.accessToken
        },
        body: JSON.stringify(data)
    }
    fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data)
          this.$router.go(0);
        })
        .catch(error => console.log('error', error))
        this.$router.go(0);
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
#delTr{
  margin-left: auto;
  margin-right: 2rem;
}

#noteTr{
  margin-left: auto;
  text-align: center;
}

</style>
