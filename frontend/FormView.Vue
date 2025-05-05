<template>
    <div class="form-container">
      <h2>輸入個人資料</h2>
      <p v-if="!isLoggedIn">請先登入才能提交資料。</p>
      <form @submit.prevent="submitForm">
        <label>
          姓名：
          <input type="text" v-model="name" required />
        </label>
        <br />
        <label>
          生日：
          <input type="date" v-model="birthday" required />
        </label>
        <br />
        <button type="submit" :disabled="!isLoggedIn">送出</button>
      </form>
  
      <div v-if="responseMessage">
        <p>後端回應：{{ responseMessage }}</p>
        <p v-if="zodiacSign">您的星座是：{{ zodiacSign }}</p>
        <!-- 這裡添加導航到運勢頁面的按鈕 -->
      <router-link :to="{ name: 'Horoscope', params: { zodiacSign: zodiacSign } }">
        查看今日運勢
      </router-link>
      </div>
      <div v-if="errorMessage" style="color: red">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";

  export default {
    name: "HelloForm",
    data() {
      return {
        name: "",
        birthday: "",
        responseMessage: "",
        zodiacSign: "",
        errorMessage: "",
      };
    },
    computed: {
      isLoggedIn() {
        // 檢查 localStorage 中是否有有效的 token
        return !!localStorage.getItem("token");
      },
    },
    methods: {
      async submitForm() {
        const token = localStorage.getItem("token");
  
        if (!token) {
          this.errorMessage = "請先登入，才能提交資料";
          return;
        }
  
        try {
          const response = await axios.post(
            "http://localhost:8000/api/submit/",
            {
              name: this.name,
              birthday: this.birthday,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          this.responseMessage = response.data.message;
          this.zodiacSign = response.data.zodiac;  // ⭐ 把星座存起來
          this.errorMessage = "";
        } catch (error) {
          this.responseMessage = "";
          if (error.response && error.response.status === 401) {
            this.errorMessage = "Token 無效或已過期，請重新登入。";
          } else {
            this.errorMessage = "提交失敗：" + error.message;
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    padding: 20px;
    border: 1px solid #ccc;
    width: 300px;
  }
  </style>
  
