<template>
    <div class="register-container">
      <h2>註冊</h2>
      <form @submit.prevent="register">
        <label for="username">用戶名：</label>
        <input type="text" v-model="username" required />
        <br />
        <label for="email">電子郵件：</label>
        <input type="email" v-model="email" required />
        <br />
        <label for="password">密碼：</label>
        <input type="password" v-model="password" required />
        <br />
        <button type="submit">註冊</button>
      </form>
  
      <div v-if="errorMessage" class="error">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { useRouter } from "vue-router"; // 用來進行頁面導向
  
  export default {
    name: "RegisterView",
    data() {
      return {
        username: "",
        email: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      async register() {
        try {
          // 發送註冊請求
          const response = await axios.post("http://127.0.0.1:8000/api/register/", {
            username: this.username,
            email: this.email,
            password: this.password,
          });
          // 註冊成功，儲存 token 並跳轉
          localStorage.setItem("token", response.data.token);
          this.$router.push("/protected"); // 註冊後自動轉到保護頁面
        } catch (error) {
          this.errorMessage = "註冊失敗！" + (error.response?.data?.error || "");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    padding: 20px;
    border: 1px solid #ccc;
    width: 300px;
  }
  .error {
    color: red;
  }
  </style>
  
