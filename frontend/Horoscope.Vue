<template>
    <div>
      <h1>今天的運勢</h1>
      <p>星座：{{ zodiacSign }}</p>
      <p v-if="horoscope">{{ horoscope }}</p>
      <p v-else>正在獲取運勢...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['zodiacSign'], // 接收路由參數作為 props
    data() {
      return {
        horoscope: '',
      };
    },
    mounted() {
      this.fetchHoroscope();
    },
    methods: {
      async fetchHoroscope() {
        try {
          const response = await axios.post('http://localhost:8000/api/horoscope/', {
            zodiac_sign: this.zodiacSign,
          });
  
          if (response.data.horoscope) {
            this.horoscope = response.data.horoscope;
          } else {
            this.horoscope = '無法獲取運勢，請稍後再試。';
          }
        } catch (error) {
          console.error('Error fetching horoscope:', error);
          this.horoscope = '無法獲取運勢，請稍後再試。';
        }
      },
    },
  };
  </script>
  
