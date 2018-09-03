import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
    elements.searchResultsPages.innerHTML = '';
};

const limitRecipeTitle = (title, limit = '17') => {
    const newTitle = [];
    if (title.length > limit) {
        // we accumulate word lengths in the 'prev' element
        const words = title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length < limit)
                newTitle.push(cur);
            return acc + cur.length;
        }, 0);

        return `${newTitle.join()} ...`;
    }
    return title;
};

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultsList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resultsPerPage) => {
    const pages = Math.ceil(numResults / resultsPerPage);
    let button = '';

    if (pages > 1) {
        if (page != 1)
            button += createButton(page, 'prev');
        if (page != pages)
            button += createButton(page, 'next');
    }
    
    elements.searchResultsPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 2, recipesPerPage = 10) => {
    const start = recipesPerPage * (page - 1);
    const end = recipesPerPage * page;

    if (recipes)
        recipes.slice(start, end).forEach(renderRecipe);

    renderButtons(page, recipes.length, recipesPerPage);
};