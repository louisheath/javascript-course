import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async executeQuery() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '00b48fa9ed7c59357eef9ecc9a9413e1';
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch(e) {
            console.log(e);
        }
    }
};