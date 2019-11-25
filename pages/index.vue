<template>
  <section class="container">
    <H2 class="title">Book Store</H2>
    <Book v-for="(value, index) in arrBook" :key="index" :book="value" :id="index" :handlerDeleteBook="deleteBook" />
    <router-link to="/create">
      <div class="button__addBook">+</div>
    </router-link>
  </section>
</template>

<script>
import Book from '~/components/book/book.vue';
import testBook from '~/assets/testBook.js';

export default {
  components: {
    Book
  },
  data() {
    return {
      arrBook: []
    }
  },
  mounted() {
    if (localStorage.getItem('books') === null) {
      localStorage.setItem('books', JSON.stringify([testBook]));
      this.arrBook = [testBook];
    } else {
      this.arrBook = JSON.parse(localStorage.getItem('books'))
    }
  },
  methods: {
    deleteBook(id) {
      const newArrBook = this.arrBook.filter((value, index) => id !== index);
      this.arrBook = newArrBook;
      localStorage.setItem('books', JSON.stringify(newArrBook));
      if(JSON.parse(localStorage.getItem('books')).length === 0) {
        localStorage.removeItem('books');
      }
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 30px 0;
}
.title {
  font-size: 32px;
  margin-bottom: 35px;
}
.button__addBook {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  border: 1px solid black;
  border-radius: 50%;
  cursor: pointer;
}
</style>

