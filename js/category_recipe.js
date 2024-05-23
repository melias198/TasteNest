const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("categoryId");
    fetch(`https://tastenest.onrender.com/community/recipe/?category=${param}`)
      .then((res) => res.json())
      .then((data) => displayCategoryPage(data));
};

const displayCategoryPage = (categories) => {
    if (!categories || categories.length === 0) {
        window.location.href = "404.html";
    }

    categories.forEach((recipe) => {
        const parent = document.getElementById("recipe-category-page");
        
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


getparams();