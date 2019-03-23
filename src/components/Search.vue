<template>
    <div>
        <v-text-field
            v-model="searchValue"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            @keyup.enter="search($event)"
        ></v-text-field>
        <div v-if="showLoader" class="overlay">
            <div class="loader"></div>
        </div>
        <v-card v-if="persons.length != 0" light id="searchList">
            <v-list two-line>
                <template v-for="person in persons">
                    <v-list-tile
                        v-if="person"
                        :key="person.id"
                        avatar
                        @click="selectPerson(person)"
                    >
                        <v-list-tile-avatar>
                            <img :src="importPic(person)">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title v-html="person.firstname + ' ' + person.lastname + ', ' + person.age"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="person.address"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-card>
        <v-card v-else light style="margin-top: 25px; padding: 25px;">
            <div>
                No persons matching given criteria found
            </div>
        </v-card>
        <v-layout v-if="persons.length != 0">
            <v-card id="person_card">
                <div>
                    <img :src="importPic(selectedPerson)" style="height: 500px; width: 100%;">
                </div>
                <v-card-title primary-title style="text-align: left;">
                    <div class="personInfoContainer">
                        <h3 class="headline">{{ selectedPerson.firstname + ' ' + selectedPerson.lastname + ', ' + selectedPerson.age }}</h3>
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
        name: 'Search',
        data() {
            return {
                persons: [],
                searchValue: '',
                showLoader: false,
                selectedPerson: null,
                interests: []
            }
        },
        methods: {
            importPic(person) {
                var url = person.picture
                var req = require.context('../assets', false, /\.jpg$/)
                var image
                req.keys().forEach(key => {
                    if (key.includes(url)) {
                        image = req(key)
                    }
                })
                return image
            },
            selectPerson(person) {
                this.selectedPerson = person
                http.get('./getInterestsByPerson?id=' + this.selectedPerson.id).then(response => {
                    this.interests = response.data
                    console.log(response.data)
                }).catch(error => {
                    console.log(error)
                })
            },
            async search(event) {
                var substring = event.target.value
                this.showLoader = true
                await new Promise(resolve => setTimeout(resolve, 2000));
                await http.get('/findPersons?substring=' + substring).then(response => {
                    this.persons = response.data
                    this.selectedPerson = this.persons[0]
                    http.get('./getInterestsByPerson?id=' + this.selectedPerson.id).then(response => {
                        this.interests = response.data
                        console.log(response.data)
                    }).catch(error => {
                        console.log(error)
                    })
                    console.log(response.data)
                }).catch(error => {
                    console.log(error)
                })
                this.showLoader = false
            }
        }
    }
</script>

<style>
    .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
        position: relative;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        margin-top: 40vh;
    }
    .overlay {
        background-color: rgba(128, 128, 128, 0.582);
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 100;
    }
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    #person_card {
        width: 100%;
        margin-top: 25px;
        margin-left: 40px;
        min-height: 70vh;
    }
    #searchList { 
        border: 1px solid rgb(192, 192, 192);
        margin-top: 25px;
        width: 50%;
        float: left;
    }
    .personInfoContainer h3, ul {
        margin-bottom: 10px;
    }
</style>