<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title ">
        testapp
      </h1>
      <kv-button variant="primary">
        Primary Button
      </kv-button>
      <kv-button variant="primary" :loading="true">
        Primary Loading
      </kv-button>
      <kv-button variant="secondary">
        Secondary Button
      </kv-button>
      <kv-button variant="danger">
        Danger Button
      </kv-button>
      <kv-button variant="danger" :disabled="true">
        Danger Disabled
      </kv-button>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import KvButton from 'kv-components/vue/KvButton.vue'

export default {
  components: {
    KvButton,
    Logo
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
