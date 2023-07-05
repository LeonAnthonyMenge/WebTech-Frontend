<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <body>
    
    <table id="listOfNotes">

      <tr id="noNotes" v-if="notes.length === 0 && isLoggedIn">
        <td colspan="2">No notes yet. Create new note</td>
      </tr>

      <tr id="noPages" v-if="isLoggedIn == false">
        <td colspan="2">Please <a href="/WebTech-Frontend/login">Sign in</a>.</td>
      </tr>

      <tr v-for="note in notes" :key="note.id" class="noteRow">
        <div class="noteContent">
          <p class="noteName">{{ note.name }}</p>
          <button class="del" type="button" @click="del(note.id)">
            <i class="fa fa-trash-o"></i>
          </button>
        </div>
      </tr>

      <tr v-if="isLoggedIn">
        <td colspan="2" class="input">
            <input id="newNotes" v-model="notefield" placeholder="new Note" @keyup.enter="save()" type="text">
            <button id="saveNote" class="save" type="button" @click="save()">Save</button>
          </td>
      </tr>

    </table>  

  </body>  

</template>

<script>



import App from "@/App";

export default {
  name: "NoteHome",
  data() {
  return {
    baseUrl: process.env.VUE_APP_BACKEND_BASE_URL,
    pageId: 0,
    isLoggedIn: App.methods.getIsLoggedIn(),
    color: "black",
    notefield: "",
    notes: [],
    claims: "",
    accessToken: "",
    darkMode: false,
  };
},
  methods: {
    loadNotes() {
      console.log("load");
      const baseUrl = this.baseUrl + "/page/notes";
      const endpoint = baseUrl + `/${this.pageId}`;
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
      this.stayLoggedIn();
      const baseUrl = this.baseUrl
      const endpoint = `${baseUrl}/page/note/${this.pageId}`;
      const data = {
        string: this.notefield,
        //pageId: this.pageId,
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
          this.notes.push(data);
          this.notefield = "";
        })
        .catch(error => console.log('error', error))
    },
    del (id){
      this.stayLoggedIn();
      console.log("delete:", id);
      const baseUrl = this.baseUrl;
      const endpoint = `${baseUrl}/deleteById/note/${id}`;
      console.log("DeleteNote endpoint:   " + endpoint);
      const data = {
        id: id
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
        .then(data => {
          console.log('Success:', data)
        })
        .catch(error => console.log('error', error))

        //try to solve better
        if (this.$router && this.$router.go) { // Überprüft, ob this.$router und this.$router.go definiert sind
          this.$router.go(); // Ruft die go()-Methode des Routers auf, um die Seite zu aktualisieren
        }
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
    stayLoggedIn(){
      App.methods.setIsLoggedIn(true);
    },
    setup() {
      if(App.methods.getIsLoggedIn()){
        this.loadNotes();
      }
    },
  },
  async created() {
    if (this.$route && this.$route.params) {
      this.pageId = this.$route.params.pageId;
    }
    console.log("Props:   "+this.props);
    await this.setup();
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
  body {
  display: flex;
  align-items: center;
  width: 100%;
}

#listOfNotes {
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
}

.noteRow {
  text-align: center; 
  height: 2px;
  font-size: 16px;
}

.noteContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(167, 137, 41, 0.329);
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 16px;
  margin-bottom: 16px;
  height: 5vh;
}

.noteName {
  height: 50px;
  line-height: 50px;
  margin: 0;
  padding: 0;
}

.input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(167, 137, 41, 0.329);
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 16px;
  margin-top: 16px;
  height: 5vh;
}

#newNotes{
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: bold;
}

.save {
  margin-left: 10px;
  border: none;
  border-radius: 8px;
  padding: 8px;
  font-weight: 600
}

:hover.save{
  background-color: rgb(141, 137, 137);
}

.del {
  margin-right: 10px;
  background-color: transparent;
  border: none;
  color: #f80000;
  font-size: 24px;
}

:hover.del{
  cursor: pointer;
  color: #ff4f4f;
}


#noNotes{
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

</style>
