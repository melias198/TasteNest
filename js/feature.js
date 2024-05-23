const loadRecipeFeature = () => {
    fetch("https://tastenest.onrender.com/community/recipe/")
      .then((res) => res.json())
      .then((data) => { 
        console.log(data);
        displayRecipeFeature(data) })
      .catch((err) => console.log(err));
};

function shuffleRecipe(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const displayRecipeFeature = (recipes) => {
    shuffleRecipe(recipes);
    const limitedRecipes = recipes.slice(0, 3);

    limitedRecipes.forEach((recipe) => {
        const parent = document.getElementById("feature-recipe");

        const a = document.createElement("a");
        a.classList.add("recipe")

        a.href = `recipe-details.html?recipeId=${recipe.id}`;

        a.innerHTML = `
        <img
        src="${recipe.image}"
        class="img recipe-img"
        alt=""
        />
        <h5>${recipe.title}</h5>
        <p>Prep : ${recipe.prepare_time}min | Cook : ${recipe.cooking_time}min</p>
        <p>Chef : ${recipe.chef}</p>
        `;

        parent.appendChild(a);
    });
};

loadRecipeFeature();