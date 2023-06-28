<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <body>

      <table id="listOfPages">

        <tr id="noPages" v-if="pages.length === 0">
          <td colspan="2">No pages yet. Create new page</td>
        </tr>

        <tr v-for="page in pages" :key="page.id" class="pageRow" >
          <div class="pageContent">
            <a class="plain-link" :href="`/WebTech-Frontend/page/${page.name}/${page.id}`">
              <h2 class="pageName" >{{ page.name }}</h2>
            </a>
            <button class="del" type="button" @click="del(page.id)">
              <i class="fa fa-trash-o" ></i>
            </button>
          </div>
        </tr>

        <tr>
          <td colspan="2" class="input" >
            <input id="newPage" v-model="pagename" placeholder="new Page (name)" @keyup.enter="save()" type="text">
            <button id="savePage" class="save" type="button" @click="save()" >Save</button>
          </td>
        </tr>

      </table>
   
  </body>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";

export default {
  name: "PagesHome",
  props: ['title'],
  data() {
    return {
      baseUrl: process.env.VUE_APP_BACKEND_BASE_URL + "/page",
      pagename: "",
      pages: [],
      claims: "",
      accessToken: "",
      input: document.getElementById("toggleswitch"),
      textcolor: HeaderBar.data().textcolor
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
    save() {
      const baseUrl = this.baseUrl;
      const endpoint = baseUrl;
      const data = {
        name: this.pagename,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      console.log('requestOptions:', requestOptions);
      if (this.pagename === "") {
        console.log("empty field");
        return;
      }
      fetch(endpoint, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            this.pages.push(data);
            this.pagename = "";
          })
          .catch((error) => console.log("error", error));
    },
    del(id) {
      console.log("delete:  ", id);
      const baseUrl = this.baseUrl;
      const endpoint = `${baseUrl}/${id}`;
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            this.loadPages();
          })
          .catch(error => console.log('error', error));


      //try to solve better
      if (this.$router && this.$router.go) {
        this.$router.go();
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


<style scoped>
body {
  display: flex;
  align-items: center;
  width: 100%;
}

#listOfPages {
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
}

.pageRow {
  text-align: center; 
  height: 2px;
}

.pageContent {
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

.pageName {
  height: 50px;
  line-height: 50px;
  margin: 0;
  padding: 0;
}

:hover.pageName{
  color: rgb(50,50,50);
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

#newPage{
  background-color: transparent;
  border: none;
  font-size: 20px;
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

.plain-link {
  text-decoration: none;
  color: inherit;
}

#noPages{
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

</style>

