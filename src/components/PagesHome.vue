<template>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="input">
    <input v-model="pagename" placeholder="new Page" type="text" @keyup.enter="save()">
    <button type="button" @click="save()">Save</button>
  </div>
  <tr v-if="pages.length === 0">
    <td colspan="2">No notes yet</td>
  </tr>
 
  <tr v-for="page in pages" :key="page.id">
  <a :href="`/page/${page.id}`"> 
    <td id="noteTr">{{ page.name }}</td>
    <td id="delTr"><button type="button" @click="del(page.id)" style="font-size:12px" >Delete <i class="fa fa-trash-o"></i></button></td>
  </a>
  </tr>

  <tr>
    <td>{{ pagename }}</td>
  </tr>
</template>

<script>
export default {
  name: "PagesHome",
  data() {
    return {
      baseUrl: "http://localhost:8080/page",
      color: "black",
      pagename: "",
      pages: [],
      claims: "",
      accessToken: "",
      darkMode: false,
      input: document.getElementById("toggleswitch"),
    };
  },
  methods: {
    loadPages() {
      console.log("load");
      const baseUrl = this.baseUrl;
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
          result.forEach((page) => {
            this.pages.push(page);
          })
        )
        .catch((error) => console.log("error", error));
    },
    save () {
      const baseUrl = this.baseUrl
      const endpoint = baseUrl
      const data = {
        name: this.pagename,
      }
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Authorization: 'Bearer ' + this.accessToken
        },
        body: JSON.stringify(data)
      }
      if(this.pagename === '') {
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
    this.loadPages();
  },
  mounted() {},
};
</script>
