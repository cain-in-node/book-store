<template>
  <section class="container">
    <H2 class="title">Create new Book</H2>
    <Form />
  </section>
</template>

<script>
import Form from '~/components/form/form.vue';

export default {
  components: {
    Form
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
</style>
