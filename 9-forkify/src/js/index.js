import Search from './model/Search';
import Recipe from './model/Recipe';
import List from './model/List';
import Likes from './model/Likes';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';
import * as likesView from './view/likesView';
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
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );
        } catch(e) {
            console.log(e);
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * LIST CONTROLLER
 */

const controlList = () => {
    if (!state.list) 
        state.list = new List();

    // add each ingredient to the shopping list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

// handle list item events: delete and update count
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    // handle delete
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    // handle count update
    } else if (e.target.matches('.shopping__count--value')) {
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);

        if (val <= 0) {
            state.list.deleteItem(id);
            listView.deleteItem(id);
        }
    }
});

/**
 * LIKES CONTROLLER
 */

const controlLike = () => {
    if (!state.likes)
        state.likes = new Likes();

    const id = state.recipe.id;

    if (!state.likes.isLiked(id)) {
        // add like to state
        const like = state.likes.addLike(
            id,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        // toggle button appearance
        likesView.toggleLikeBtn(true);

        // add like to UI list
        likesView.renderLike(like)
    } else {
        // remove like from state
        state.likes.deleteLike(id);

        // toggle button appearance
        likesView.toggleLikeBtn(false);

        // remove like from UI list
        likesView.deleteLike(id);
    }

    likesView.toggleLikesMenu(state.likes.getNumLikes());
};

// restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();
    
    // restore liked recipes from previous sessions
    state.likes.readStorage();

    // toggle likes menu
    likesView.toggleLikesMenu(state.likes.getNumLikes());

    // render existing likes
    state.likes.likes.forEach(likesView.renderLike);
});

// handle button clicks on recipe
elements.recipe.addEventListener('click', e => {
    // serving increase
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

    // serving decease
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

    // add recipe to shopping list
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();

    // like / unlike recipe
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});