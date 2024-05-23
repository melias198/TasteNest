const loadRecipe = () => {
    fetch("https://tastenest.onrender.com/community/recipe/")
      .then((res) => res.json())
      .then((data) => { 
        console.log(data);
        displayRecipe(data) })
      .catch((err) => console.log(err));
};

function shuffleRecipe(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const displayRecipe = (recipes) => {
    shuffleRecipe(recipes);
    const limitedRecipes = recipes.slice(0, 6);

    limitedRecipes.forEach((recipe) => {
        const parent = document.getElementById("recipes-list");

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


const loadRecipeCategory = () => {
    fetch("https://tastenest.onrender.com/community/recipe/category/")
    .then((res) => res.json())
    .then((data) => displayRecipeCategory(data))
    .catch((err) => console.log(err));
};


const displayRecipeCategory = (categories) => {
    categories.forEach((category) => {
        const parent = document.getElementById("recipe-category");

        a = document.createElement("a");
        a.href = `recipe-category.html?categoryId=${category.id}`;
        a.innerHTML = `${category.name}`;

        parent.appendChild(a);
    });
};


const loadEventCategory = () => {
    fetch("https://tastenest.onrender.com/community/event/category/")
    .then((res) => res.json())
    .then((data) => displayEventCategory(data))
    .catch((err) => console.log(err));
};


const displayEventCategory = (categories) => {
    categories.forEach((category) => {
        const parent = document.getElementById("event-category");

        a = document.createElement("a");
        a.href = `event-category.html?categoryId=${category.id}`;
        a.innerHTML = `${category.name}`;

        parent.appendChild(a);
    });
};
  

loadRecipe();
loadRecipeCategory();
loadEventCategory();
