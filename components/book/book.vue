<template>
  <div class="book">
    <div class="wrapper__image">
      <img v-if="this.book.imageUploaded" class="image" :src="this.book.picture" alt="image">
      <div v-if="!this.book.imageUploaded" class="image image__damp"></div>
    </div>
    <div class="description">
      <h3 class="description__title">{{ this.book.bookTitle }}</h3>
      <p>{{ this.book.authorName }} {{ this.book.authorSurname }}</p>
      <p v-if="this.book.publisher !== ''">Publisher: {{ this.book.publisher }}</p>
      <p v-if="this.book.yearOfPublication !== ''">Published in {{ this.book.yearOfPublication }} году</p>
      <p v-if="this.book.releaseDate !== ''">Released in {{ this.book.releaseDate }}</p>
      <p>Number of pages {{ this.book.numberOfPages }}</p>
    </div>
    <div class="wrapper__controls">
      <a @click="handlerDeleteBook(idBook)" class="control">x</a>
      <a @click="editBook" class="control" to="/edit">e</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idBook: this.id
    }
  },
  mounted() {
    console.log(this.book.releaseDate);
  },
  props: {
    id: Number,
    book: Object,
    handlerDeleteBook: {
      type: Function
    }
  },
  methods: {
    editBook() {
      this.$router.push({
        name: `edit`,
        query: { idBook: this.idBook }
      })
    }
  }
}
</script>

<style lang="less">
.book {
  display: flex;
  height: 355px;
  width: 95%;
  padding: 25px;
  border: 1px solid grey;
  border-radius: 10px;
  margin-bottom: 50px;
}
.wrapper__image {
  display: flex;
  width: 220px;
  height: 300px;
}
.image {
  width: 100%;
  object-fit: cover;
}
.image__damp {
  background-color: grey
}
.description {
  width: 635px;
  padding: 0 25px;
  word-wrap: break-word;
  &__title {
    font-size: 32px;
    padding-bottom: 16px;
  }
  & p {
    font-size: 24px;
    padding-bottom: 12px;
  }
}
.wrapper__controls {
  width: 35px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.control {
  border: 1px solid black;
  border-radius: 50%;
  padding: 10px;
  line-height: 10px;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>
