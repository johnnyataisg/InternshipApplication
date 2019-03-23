<template>
    <div>
        <v-card id="datatable">
            <v-card-title>
                All Persons
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="persons"
                :loading="true"
                :search="search"
                class="elevation-1"
            >
                <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
                <template v-slot:items="props">
                    <tr @click="selectPerson(props.item)" style="cursor: pointer;">
                        <td class="text-xs-left">{{ props.item.id }}</td>
                        <td class="text-xs-left">{{ props.item.firstname }}</td>
                        <td class="text-xs-left">{{ props.item.lastname }}</td>
                        <td class="text-xs-left">{{ props.item.address }}</td>
                        <td class="text-xs-left">{{ props.item.age }}</td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>

        <v-layout>
            <v-card id="person_card">
                <div>
                    <img :src="image" style="height: 500px; width: 100%;">
                </div>
                <v-card-title primary-title style="text-align: left;">
                    <div class="personInfoContainer">
                        <h3 class="headline">{{ selectedPerson.firstname + ' ' + selectedPerson.lastname }}</h3>
                        <h3> {{ selectedPerson.address }} </h3>
                        <h3>Interests:</h3>
                        <ul>
                            <li v-for="interest in interests" :key="interest">{{ interest.description }}</li>
                        </ul>
                    </div>
                </v-card-title>
            </v-card>
        </v-layout>
    </div>
</template>

<script>
import http from '@/../server/http-common.js'

export default {
    name: 'PeopleList',
    data() {
        return {
            persons: [],
            headers: [
                { text: 'ID', align: 'left', value: 'id'},
                { text: 'First Name', value: 'firstname' },
                { text: 'Last Name', value: 'lastname' },
                { text: 'Address', value: 'address' },
                { text: 'Age', value: 'age' }
            ],
            search: '',
            selectedPerson: null,
            image: '',
            interests: []
        }
    },
    computed: {
    },
    methods: {
        selectPerson(person) {
            this.selectedPerson = person
            http.get('./getInterestsByPerson?id=' + this.selectedPerson.id).then(response => {
                this.interests = response.data
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
            var url = this.selectedPerson.picture
            var req = require.context('../assets', false, /\.jpg$/)
            req.keys().forEach(key => {
                if (key.includes(url)) {
                    this.image = req(key)
                }
            })
        }
    },
    created() {
        http.get('/getAllPersons').then(response => {
            this.persons = response.data
            this.selectedPerson = this.persons[0]
            http.get('./getInterestsByPerson?id=' + this.selectedPerson.id).then(response => {
                this.interests = response.data
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
            var url = this.selectedPerson.picture
            var req = require.context('../assets', false, /\.jpg$/)
            req.keys().forEach(key => {
                if (key.includes(url)) {
                    this.image = req(key)
                }
            })
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
        
    }
}
</script>

<style>
    #datatable {
        float: left;
        width: 50%;
    }
    #person_card {
        width: 100%;
        margin-left: 40px;
        min-height: 70vh;
    }
    .v-table__overflow {
        height: 70vh;
    }
    .personInfoContainer h3, ul {
        margin-bottom: 10px;
    }
</style>