<template>
  <body :style="{ color: color }">
    <header>
      <h1 id="NavH1">Notes</h1>

      <p>Darkmode</p>

      <label @click="changeDarkMode()" class="switch">
        <input @change="changeDarkMode" type="checkbox" id="toggleswitch" />
        <span @change="changeDarkMode" class="slider round"></span>
      </label>
    </header>
    <router-view />
  </body>
</template>

<script>
export default {
  data() {
    return {
      color: "black",
      darkMode: false,
    };
  },
  methods: {
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
  },
};
</script>

<style scoped>
body {
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
</style>
