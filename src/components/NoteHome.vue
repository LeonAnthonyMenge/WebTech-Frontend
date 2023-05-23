<template>
  <header>
    <h1 id="NavH1">Notes</h1>

    <p>Darkmode</p>

    <label class="switch">
      <input type="checkbox" id="toggleswitch" />
      <span class="slider round"></span>
    </label>
  </header>
</template>

<script>
export default {
  name: "NoteHome",
  props: {
    msg: String,
  },
  methods: {
    changeDarkMode(elem) {
      if (this.darkMode) {
        this.darkMode = false;
        elem.style.backgroundColor = "#FFFFFF";
        elem.style.color = "#000000";
      } else {
        this.darkMode = true;
        elem.style.backgroundColor = "#191919";
        elem.style.color = "#FFFFFF";
      }
    },
  },
  data() {
    return {
      darkMode: false,
      input: document.getElementById("toggleswitch"),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background-color: rgb(197, 122, 25);
}
header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}
#changeDarkMode {
  display: flex;
  justify-content: flex-end;
}
#NavH1 {
  margin-right: auto;
  margin-left: auto;
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
