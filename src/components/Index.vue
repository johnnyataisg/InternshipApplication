<template>
  <div>

    <v-jumbotron>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3">Welcome to the site</h3>
            <v-divider class="my-3"></v-divider>
            <div class="title mb-3">{{ msg }}</div>
            <div>
              <v-btn :to="{ name: 'PeopleList' }" class="mx-0" color="primary" large>View all people</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>

    <v-layout row justify-center>
      <v-dialog v-model="showForm" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Add a person</v-btn>
        </template>
        <v-form ref="form" v-model="valid" enctype="multipart/form-data" lazy-validation>
        <v-card>
          <v-card-title>
            <span class="headline">Person Information</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="First Name*" v-model="newPerson.firstname" :rules="[rules.required, rules.alpha]"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Last Name*" v-model="newPerson.lastname" :rules="[rules.required, rules.alpha]"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Address*" v-model="newPerson.address" :rules="[rules.required]"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Age*" v-model="newPerson.age" counter maxlength='3' :rules="[rules.required, rules.counter, rules.digits]">
                  </v-text-field>
                </v-flex>
                <input type="file" name="file" ref="file" @change="picture_uploaded()">
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="showForm = false; $refs.form.reset()">Close</v-btn>
            <v-btn color="blue darken-1" flat :disabled="!valid" @click="createUser(); $refs.form.reset()">Save</v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import http from '@/../server/http-common.js'

export default {
  name: 'Index',
  data () {
    return {
      file: null,
      msg: 'Choose what you would like to do',
      showForm: false,
      newPerson: {
        firstname: null,
        lastname: null,
        address: null,
        age: null,
        picture: null
      },
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 3 || 'Max 3 digits',
        digits: value => {
          const pattern = /[0-9]+/
          return pattern.test(value) || 'Only numbers should be entered'
        },
        alpha: value => {
          const pattern = /([A-Z][a-z])+/
          return pattern.test(value) || 'Only letters should be entered'
        }
      },
      valid: false
    }
  },
  methods: {
    picture_uploaded() {
      this.newPerson.picture = this.$refs.file.files[0]
    },
    createUser() {
      const data = new FormData()
      data.append('firstname', this.newPerson.firstname)
      data.append('lastname', this.newPerson.lastname)
      data.append('address', this.newPerson.address)
      data.append('age', this.newPerson.age)
      data.append('file', this.newPerson.picture)

      http.post('/addPerson', data).then(response => {
        console.log(response.data)
        this.showForm = false
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
.modal-form {
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;
  margin-left: 25%;
  margin-right: 25%;
  width: auto;
  background-color: white;
  z-index: 100;
}
</style>
