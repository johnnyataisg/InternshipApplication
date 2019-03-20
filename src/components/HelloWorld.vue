<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="createUser">Create User</button>
  </div>
</template>

<script>
import http from '@/http-common'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    createUser() {
      var data = {
        firstname: 'johnny',
        lastname: 'pao'
      }
      http.post('/addPerson', data).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
