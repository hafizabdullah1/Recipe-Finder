const appId = '71baa403';
const appKey = '4895979415fc65315eeb8a3b6effa2e0';

document.getElementById('search-button').addEventListener('click', function() {
    const input = document.getElementById('ingredient-input').value.trim();
    const resultsContainer = document.getElementById('results');

    resultsContainer.innerHTML = '';

    if (input === '') {
        resultsContainer.innerHTML = '<p>Please enter some ingredients to search.</p>';
        return;
    }

    fetchRecipes(input);
});

function fetchRecipes(ingredients) {
    const resultsContainer = document.getElementById('results');
    const query = ingredients.split(',').map(ingredient => ingredient.trim()).join(',');

    fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=0&to=5`)
        .then(response => response.json())
        .then(data => {
            if (data.hits.length > 0) {
                data.hits.forEach(hit => {
                    const recipe = hit.recipe;
                    const recipeCard = document.createElement('div');
                    recipeCard.className = 'recipe-card';
                    recipeCard.innerHTML = `
                        <img src="${recipe.image}" alt="${recipe.label}">
                        <div class="recipe-card-content">
                            <h2>${recipe.label}</h2>
                            <p><strong>Ingredients:</strong> ${recipe.ingredientLines.join(', ')}</p>
                            <a href="${recipe.url}" target="_blank" class="button">View Instructions</a>
                        </div>
                    `;
                    resultsContainer.appendChild(recipeCard);
                });
            } else {
                resultsContainer.innerHTML = '<p>No recipes found with those ingredients.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching the recipes:', error);
            resultsContainer.innerHTML = '<p>There was an error retrieving the recipes. Please try again later.</p>';
        });
}
