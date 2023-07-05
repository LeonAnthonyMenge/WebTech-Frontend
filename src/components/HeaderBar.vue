<template>
  <body :style="{ color: color }">
  <header>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <a @click="logout" class="plain-link" href="/WebTech-Frontend/">
      <i class="fa fa-home plain-link"></i>
    </a>
    <h1 id="NavH1">{{ header }}</h1>
    <p>Darkmode:</p>

    <label class="switch">
      <input @change="changeDarkMode" type="checkbox" id="toggleswitch" />
      <span class="slider round"></span>
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
        if(!this.create) {
          App.methods.setDarkMode(true);
        }
        document.body.style.backgroundColor = "#191919";
        document.body.style.color = "white";
        this.color = "white";
        this.textcolor = "black";

      }
    },
    logout(){
      App.methods.setIsLoggedIn(false);
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
.fa-home{
  font-size: 40px;
  margin: auto;
}

:hover.fa-home{
  color: rgb(40, 40, 40);
}


header {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
}
#changeDarkMode {
  display: flex;
  justify-content: flex-end;
}
#NavH1 {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin: 1rem;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.plain-link {
  text-decoration: none;
  color: inherit;
}
</style>
