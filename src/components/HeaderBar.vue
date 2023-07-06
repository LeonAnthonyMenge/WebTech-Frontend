<template>
  <body :style="{ color: color }">
  <header>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <a @click="logout" class="plain-link" href="/WebTech-Frontend/">
      <i class="fa fa-home plain-link"></i>
    </a>
    <h1 id="NavH1">{{ header }}</h1>

    <label class="switch">
      <button id="darkModeButton" @click="changeDarkMode">Darkmode: On/Off</button>
    </label>
  </header>
  </body>
</template>

<script>

import App from "@/App";

export default {
  props: ['header'],
  data() {
    return {
      create: true,
      color: "black",
      darkMode: App.methods.getDarkMode(),
      textcolor: "black"
    };
  },
  methods: {
    changeDarkMode() {
      if (App.methods.getDarkMode()) {
        App.methods.setDarkMode(false);
        this.textcolor = "black";
        document.body.style.backgroundColor = "#FFFFFF";
        this.color = "black";
        document.body.style.color = "black";
      } else {
        App.methods.setDarkMode(true);
        document.body.style.backgroundColor = "#191919";
        document.body.style.color = "white";
        this.color = "white";
        this.textcolor = "black";

      }
    },
    logout(){
      App.methods.setIsLoggedIn(false);
      App.methods.setUserId(0);
    },
    createDarkMode(){
      if(App.methods.getDarkMode()){
        document.body.style.backgroundColor = "#191919";
        document.body.style.color = "white";
        this.color = "white";
        this.textcolor = "black";
      }else{
        this.textcolor = "black";
        document.body.style.backgroundColor = "#FFFFFF";
        this.color = "black";
        document.body.style.color = "black";
      }
    }
  },
  created() {
    this.createDarkMode();
  }
};
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 200;
}
.fa-home{
  font-size: 40px;
  margin: auto;
}

:hover.fa-home{
  color: rgb(40, 40, 40);
}
#darkModeButton{
  background: #4caf50;
  width: 86px;
  border-radius: 4px;
}
.switch {
  margin-right: 1rem;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
}

#NavH1 {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
}

.plain-link {
  text-decoration: none;
  color: inherit;
}
</style>
