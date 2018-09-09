import Search from './model/Search';
import Recipe from './model/Recipe';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import { elements, loader } from './view/base';

/** the global state of the app
 *  - Search object
 *  - Current recipe object
 *  - Shopping list object
 *  - Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
    // 1. Get the query from text input
    const query = searchView.getInput();

    if (query) {
        // 2. If there is a query, add a new Search object to state
        state.search = new Search(query);

        // 3. Change UI to indicate search progress
        searchView.clearInput();
        searchView.clearResults();
        loader.render(elements.searchResults);

        try {
            // 4. Execute search query
            await state.search.executeQuery();
                    
            // 5. Render results to UI
            loader.clear();
            searchView.renderResults(state.search.result);
        } catch(e) {
            console.log(e);
            loader.clear();
        }
        
    }
};

elements.searchButton.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultsPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const destination = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.result, destination);
    }
});

/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async () => {
    // get ID from URL
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        // prepare UI for changes
        recipeView.clearRecipe();
        loader.render(elements.recipe);

        // highlight selected recipe
        if (state.search)
            searchView.highlightSelectedRecipe(id);

        // create new Recipe object
        state.recipe = new Recipe(id);

        try {
            // get recipe data
            await state.recipe.getInput();

            // format ingredients for UI
            state.recipe.parseIngredients();

            // calculate servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();

            // render recipe to UI
            loader.clear()
            recipeView.renderRecipe(state.recipe);
        } catch(e) {
            console.log(e);
        }
    }
};

['hashchange'].forEach(event => window.addEventListener(event, controlRecipe));

// handle change of serving size
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
});