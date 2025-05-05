<template>
    <div class="login-container">
      <h2>登入</h2>
      <form @submit.prevent="login">
        <label for="username">用戶名：</label>
        <input type="text" v-model="username" required />
        <br />
        <label for="password">密碼：</label>
        <input type="password" v-model="password" required />
        <br />
        <button type="submit">登入</button>
      </form>

      <p>
        還沒註冊？
        <router-link to="/register">現在註冊</router-link>
      </p>

      <div v-if="errorMessage" class="error">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { useRouter } from "vue-router"; // 用來進行頁面導向
  
  export default {
    name: "LoginView",
    data() {
      return {
        username: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/login/", {
            username: this.username,
            password: this.password,
          });
          // 登入成功，儲存 JWT token（或其他資料）
          localStorage.setItem("token", response.data.access);
          this.$router.push("/form"); // 登入後轉到保護頁面
        } catch (error) {
          this.errorMessage = "登入失敗！請檢查帳號或密碼。";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    padding: 20px;
    border: 1px solid #ccc;
    width: 300px;
  }
  .error {
    color: red;
  }
  </style>
  
