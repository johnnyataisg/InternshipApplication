<template>
    <v-card>
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
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.firstname }}</td>
            <td class="text-xs-left">{{ props.item.lastname }}</td>
            <td class="text-xs-left">{{ props.item.address }}</td>
            <td class="text-xs-left">{{ props.item.age }}</td>
            </template>
        </v-data-table>
    </v-card>
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
            search: ''
        }
    },
    mounted() {
        http.get('/getAllPersons').then(response => {
            console.log(response.data)
            this.persons = response.data
        }).catch(error => {
            console.log(error)
        })
    }
}
</script>

<style>
</style>