import Search from './model/Search';
import * as searchView from './view/searchView';
import { elements, loader } from './view/base';

/** the global state of the app
 *  - Search object
 *  - Current recipe object
 *  - Shopping list object
 *  - Liked recipes
 */
const state = {};

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

        // 4. Execute search query
        await state.search.executeQuery();
        
        // 5. Render results to UI
        loader.clear();
        searchView.renderResults(state.search.result);
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