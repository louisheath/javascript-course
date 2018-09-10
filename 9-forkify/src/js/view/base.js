export const elements = {
    searchButton : document.querySelector('.search'),
    searchInput : document.querySelector('.search__field'),
    searchResultsList : document.querySelector('.results__list'),
    searchResults : document.querySelector('.results'),
    searchResultsPages : document.querySelector('.results__pages'),
    recipe : document.querySelector('.recipe'),
    shopping : document.querySelector('.shopping__list'),
    likesMenu : document.querySelector('.likes__field'),
    likesList : document.querySelector('.likes__list')
};

export const elementStrings = {
    loader : 'loader'
};

export const loader = {
    render : parent => {
        const loader = `
            <div class="${elementStrings.loader}">
                <svg>
                    <use href="img/icons.svg#icon-cw"></use>
                </svg>
            </div>
        `;
        parent.insertAdjacentHTML('afterbegin', loader);
    },
    clear : () => {
        const loader = document.querySelector(`.${elementStrings.loader}`);
        if (loader) {
            loader.parentElement.removeChild(loader);
        }
    }
};