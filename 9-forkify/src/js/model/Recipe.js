import axios from 'axios';
import { proxy, key } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getInput() {
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch(e) {
            console.log(e);
        }
    }

    calcTime() {
        // assume we need 15 minutes for each three ingredients
        const numIngredients = this.ingredients.length;
        const periods = Math.ceil(numIngredients / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsMap = new Map(
            [
                ['tablespoons', 'tbsp'],
                ['tablespoon', 'tbsp'],
                ['ounces', 'oz'],
                ['ounce', 'oz'],
                ['teaspoons', 'tsp'],
                ['teaspoon', 'tsp'],
                ['cups', 'cup'],
                ['pounds', 'pound'],
                ['kilogram', 'kg'],
                ['gram', 'g']
            ]
        );
        const newIngredients = this.ingredients.map(el => {
            // standardise units
            let ingredient = el.toLowerCase();
            unitsMap.forEach((value, key) => {
                ingredient = ingredient.replace(key, value);
            });

            // remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // parse recipe into count, unit, ingredient
            let ingSplit = ingredient.split(' ');
            let unitIndex = ingSplit.findIndex(el => Array.from(unitsMap.values()).includes(el));
            
            let objIng;
            if (unitIndex > -1) {
                // unit found
                const countArr = ingSplit.slice(0, unitIndex)
                    .map(el => el.replace('-', '+'));
                
                objIng = {
                    count: eval(countArr.join('+')),
                    unit: ingSplit[unitIndex],
                    ingredient: ingSplit.slice(unitIndex+1, ingSplit.length).join(' ')
                };
            } else if (parseInt(ingSplit[0], 10)) {
                // unit not found, but recipe begins with a number
                objIng = {
                    count: parseInt(ingSplit[0], 10),
                    unit: '',
                    ingredient: ingSplit.slice(1).join(' ')
                };
            } else if (unitIndex === -1) {
                // unit not found and recipe does not begin with a number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }

    updateServings(type) {
        // increment or decrement servings count
        let newServings = (type === 'dec') ? this.servings - 1
                                           : this.servings + 1;
        // change ingredient quantities
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
};