<template>
  <div class="form">
    <div class="row" v-bind:class="validationTitle">
      <p>Book title</p>
      <input type="text" name="bookTitle" v-model="currentBook.bookTitle">
    </div>
    <div class="row" v-bind:class="validationName">
      <p>Author's name</p>
      <input type="text" name="authorName" v-model="currentBook.authorName">
    </div>
    <div class="row" v-bind:class="validationSurname">
      <p>Surname of the author</p>
      <input type="text" name="authorSurname" v-model="currentBook.authorSurname">
    </div>
    <div class="row" v-bind:class="validationNumberPages">
      <p>Number of pages</p>
      <input type="text" name="numberOfPages" v-model="currentBook.numberOfPages">
    </div>
    <div class="row"  v-bind:class="validationPublisher">
      <p>Publisher</p>
      <input type="text" name="publisher" v-model="currentBook.publisher">
    </div>
    <div class="row" v-bind:class="validationYearPublication">
      <p>Year of publication</p>
      <input type="text" name="yearOfPublication" v-model="currentBook.yearOfPublication">
    </div>
    <div class="row" v-bind:class="validationReleaseDate">
      <p>Release Date</p>
      <input type="date" name="releaseDate" v-model="currentBook.releaseDate">
    </div>
    <div class="row__image-box">
      <label v-if="!currentBook.imageUploaded" class="label__select-file" for="upload-photo">
        <p>Select image...</p>
        <p>Supported formats are JPG, PNG, GIF, WebP, SVG or BMP</p>
      </label>
      <input class="input__select-file" type="file" id="upload-photo" ref="picture" @change="previewImage" multiple />
      <div v-if="currentBook.imageUploaded" class="wrapper__image">
        <img class="image" :src="currentBook.picture" alt="image">
        <p class="message">Invalid file format</p>
        <button class="button__delete-image" @click="deleteImage">x</button>
      </div>
    </div>
    <div v-if="error" class="row error__text">
      <p>Check the data is filled in correctly</p>
    </div>
    <div class="row wrapper__buttons">
      <button class="button__go-back" @click="cancel">back</button>
      <button class="button__save-book" @click="saveBook">save</button>
    </div>
  </div>
</template>

<script>
import FileToBase from '~/plugins/FileToBase.js';
import Validation from '~/plugins/Validation.js';

export default {
  data() {
    return {
      error: false,
      idBook: this.$router.history.current.query.idBook,
      currentBook: {
        bookTitle: 'Any title',
        authorName: 'Any name',
        authorSurname: 'Any surname',
        numberOfPages: 0,
        publisher: '',
        yearOfPublication: '',
        releaseDate: '',
        picture: '',
        imageUploaded: false
      }
    }
  },
  mounted() {
    if(this.idBook !== undefined) {
      this.currentBook = JSON.parse(localStorage.getItem('books'))[this.idBook];
    }
  },
  props: {
    book: Object
  },
  computed: {
    validationTitle: function () {
      return {error: Validation.valLength(this.currentBook.bookTitle, 30, true)}
    },
    validationName: function () {
      return {error: Validation.valLength(this.currentBook.authorName, 20, true)}
    },
    validationSurname: function () {
      return {error: Validation.valLength(this.currentBook.authorSurname, 20, true)}
    },
    validationNumberPages: function () {
      return {error: Validation.valNumber(this.currentBook.numberOfPages, 10000, true, true)}
    },
    validationPublisher: function () {
      return {error: Validation.valLength(this.currentBook.publisher, 30)}
    },
    validationYearPublication: function () {
      return {error: Validation.valNumber(this.currentBook.yearOfPublication, 1800, false, false)}
    },
    validationReleaseDate: function () {
      return {error: Validation.valDate(this.currentBook.releaseDate)}
    },
  },
  methods: {
    async previewImage() {
      this.currentBook.picture = await FileToBase(this.$refs.picture.files[0]);
      this.currentBook.imageUploaded = !this.currentBook.imageUploaded;
    },
    deleteImage() {
      this.currentBook.picture = '';
      this.currentBook.imageUploaded = !this.currentBook.imageUploaded;
    },
    saveBook() {
      this.error = false;
      const bookIsReadyBySave = Validation.generalCheckErrors([
        this.validationTitle,
        this.validationName,
        this.validationSurname,
        this.validationNumberPages,
        this.validationPublisher,
        this.validationYearPublication,
        this.validationReleaseDate]);
      if(bookIsReadyBySave) {
        const newData = JSON.parse(localStorage.getItem('books')) || [];
        if(this.idBook !== undefined) {
          newData[this.idBook] = this.currentBook;
        } else {
          newData.push(this.currentBook);
        }
        localStorage.setItem('books', JSON.stringify(newData));
        this.$router.go(-1);
      } else {
        this.error = true;
      }
    },
    cancel() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="less">
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wrapper__image {
  display: flex;
  width: 220px;
  height: 300px;
  border: 1px solid grey;
  border-radius: 5px;
  position: relative;
}
.image {
  width: 100%;
  object-fit: cover;
  background-color: black;
}
.row {
  width: 50%;
  margin-bottom: 20px;
  & p {
    padding-bottom: 12px;
    font-size: 20px;
  }
  & input {
    height: 40px;
    width: 100%;
    font-size: 28px;
    padding: 0 5px;
  }
}
.row__image-box {
  margin: 40px 0;
}
.input__select-file {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.message {
  position: absolute;
  color: white;
  top: 45%;
  left: 22%;
}
.label__select-file {
  width: 220px;
  height: 300px;
  display: flex;
  border: 1px solid grey;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  & p:first-child {
    font-size: 20px;
    margin-top: 35px;
  }
  & p:last-child {
    font-size: 14px;
    padding: 70px 15px 20px;
    text-align: center;
  }
}
.button__delete-image {
  position: absolute;
  right: -45px;
  padding: 10px;
  text-align: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 50%;
  line-height: 10px;
}
.error {
  position: relative;
  & input {
    border: 1px solid red;
  }
  &:before {
    content: 'Enter the correct data';
    position: absolute;
    bottom: -17px;
    right: 0;
    font-size: 12px;
    color: red;
  }
  &__text {
    color: red;
    font-size: 20px;
    text-align: center;
  }
}
.wrapper__buttons {
  display: flex;
  justify-content: space-around;
}
.button__save-book,
.button__go-back {
  border: 1px solid grey;
  border-radius: 3px;
  padding: 14px 40px;
  cursor: pointer;
}
</style>
