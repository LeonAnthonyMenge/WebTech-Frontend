<template>
  <HeaderBar header="Login" />

  <div id="login">
    <label for="email">E-Mail:</label>
    <br>
    <input type="email" id="email" v-model="email">
    <br>
    <label for="password">Passwort:</label>
    <br>
    <input type="password" id="password" v-model="password">
    <div class="link-container">
      <p>No Account yet?  </p>
      <a href="./signup"> Sign Up!</a>
    </div>
    <button @click="login">Login</button>
    <p v-if="registrationError" style="color: red;">Registration failed. Please check your information and try again.</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { defineComponent } from 'vue';
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
      encode_email: '',
      encode_password: '',
      loggingIn: true,
      registrationError: false
    };
  },
  methods: {
    ...mapMutations(['setIsLoggedIn']),
    encodeCredentials() {
      this.encode_email = btoa(this.email);
      this.encode_password = btoa(this.password);
    },
    async login() {
      try {
        await this.encodeCredentials();
        const response = await axios.post(this.baseUrl + '/api/login', {
          email: this.encode_email,
          password: this.encode_password
        });
        console.log(response);
        if (response.data.success && this.loggingIn) {
           App.methods.setIsLoggedIn(true);
            this.loggingIn = false;
            App.methods.setUserId(response.data.id);
            await this.$router.push(`./page/${response.data.id}`);
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
#login {
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

.label {
  font-weight: bold;
  margin-bottom: 10px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
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

.link-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

p {
  margin: 0;
}
</style>

