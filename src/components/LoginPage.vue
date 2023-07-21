<template>
  <div class="login_container">
    <h2>Login</h2>
    <form class="login_form" @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="details.email" required/>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="details.password" required/>
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="errorMessage" class="error_message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      details: {
        email: '',
        password: '',
      },
      errorMessage: '',
    };
  },
  methods: {
    login() {
      const loginEndpoint = 'https://eduthon-api.delwathon.com/api/login';
      const credentials={
        email: this.details.email,
        password: this.details.password,
      };
        axios.post(loginEndpoint, credentials)
        .then(response => {
          const token = response.data.token;

          console.log('Token:', token);
          this.$store.commit('setAuthToken', token);
          this.$router.push('/dashboardPage')
        })
        .catch(error => {
          console.log('Login error:', error);
        });
   
    },
    someMethod() {
    const token = this.$store.state.authToken;
    console.log('Token from Vuex store:', token);
    // You can use the token for subsequent API requests or any other operations.
  },
  },
};
</script>

<style scoped>
.login_container {
  max-width: 400px;
  margin: 10% auto;
  padding: 20px;
 
  width: 500px;
  height: 40vh;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.login_form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}
.login_form div {
  margin-bottom: 20px;
}
.login_form label {
  width: 100px;
  display: inline-block;
  text-align: left;
  font-weight: bold;
  font-size: 13px;
}

.login_form input[type="email"],
.login_form input[type="password"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
}

.login_form button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  width: 150px;
  margin-left: 17%;
}
.error_message {
  color: red;
  margin-top: 10px;
  font-size: 12px;
  margin-left: 20px;
}

@media screen and (max-width: 768px) {
  .login_container {
  width: 400px;
  }
  .login_form label{
    width: 80px;
  }
}
</style>