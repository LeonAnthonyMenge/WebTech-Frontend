<template>
  <HeaderBar header="Sign Up" />

  <div class="container">
    <div>
      <label for="firstname">Firstname:</label>
      <br>
      <input type="text" id="firstname" v-model="firstname">
      <br>
      <label for="lastname">Lastname:</label>
      <br>
      <input type="text" id="lastname" v-model="lastname">
      <br>
      <label for="email">E-Mail:</label>
      <br>
      <input type="email" id="email" v-model="email">
      <br>
      <label for="password">Passwort:</label>
      <br>
      <input type="password" id="password" v-model="password">

      <button @click="signup">Signup</button>
      <p v-if="registrationError" style="color: red;">Registration failed. Please check your information and try again.</p>
      <p>Back to <a href="./login">login</a></p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import axios from 'axios';
import HeaderBar from "@/components/HeaderBar.vue";
import App from "@/App";

export default defineComponent({
  components: { HeaderBar },
  name: 'LoginForm',
  data() {
    return {
      baseUrl: process.env.VUE_APP_BACKEND_BASE_URL,
      email: '',
      password: '',
      lastname: '',
      firstname: '',
      encode_email: '',
      encode_password: '',
      encode_lastname: '',
      encode_firstname: '',
      loggingIn: true,
      registrationError: false
    };
  },
  methods: {
    ...mapMutations(['setIsLoggedIn']),
    encodeCredentials() {
      this.encode_email = btoa(this.email);
      this.encode_password = btoa(this.password);
      this.encode_lastname = btoa(this.lastname);
      this.encode_firstname = btoa(this.firstname);
    },
    async signup() {
      if(this.firstname == "" || this.lastname == "" || this.email == "" || this.password == ""){
        this.registrationError = true;
        return;
      }
      try {
        await this.encodeCredentials();
        const response = await axios.post(this.baseUrl + '/api/registration', {
          email: this.encode_email,
          password: this.encode_password,
          lastname: this.encode_lastname,
          firstname: this.encode_firstname
        });

        if (response.data.success && this.loggingIn) {
          App.methods.setIsLoggedIn(true);
          this.loggingIn = false;
          App.methods.setUserId(response.data.id);
          this.$router.push(`./page/${response.data.id}`);
        } else {
          this.registrationError = true;
        }
      } catch (error) {
        console.error(error);
        this.registrationError = true;
      }
    }
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 24rem;
  margin: auto;
  margin-top: 4rem;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

label {
  font-weight: bold;
  margin-bottom: 10px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-top: 10px;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
