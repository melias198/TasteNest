const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("recipeId");
    fetch(`https://tastenest.onrender.com/community/recipe/${param}/`)
      .then((res) => res.json())
      .then((data) => displayDetails(data));
};

const displayDetails = (recipe) => {
    console.log(recipe);
    const parent = document.getElementById("recipe-page");

    const section = document.createElement("section");
    section.classList.add("recipe-hero");

    const img = document.createElement("img");
    img.classList.add("img", "recipe-hero-img");
    img.src = `${recipe.image}`;

    const article = document.createElement("article");
    article.classList.add("recipe-info");

    article.innerHTML = `
    <h2>${recipe.title}</h2>
    <p class="text-muted">Chef: ${recipe.chef}</p>
    <p>
      ${recipe.description}
    </p>
    <div class="recipe-icons">
      <article>
        <i class="fas fa-clock"></i>
        <h5>prep time</h5>
        <p>${recipe.prepare_time} min.</p>
      </article>
      <article>
        <i class="far fa-clock"></i>
        <h5>cook time</h5>
        <p>${recipe.cooking_time} min.</p>
      </article>
      <article>
        <i class="fas fa-user-friends"></i>
        <h5>serving</h5>
        <p>${recipe.serving} servings</p>
      </article>
    </div>
    <p class="recipe-tags">
      Tags : ${recipe.category.map(item => `<a href="#">${item}</a>` )}
    </p>
    `;

    section.appendChild(img);
    section.appendChild(article);

    const section2 = document.createElement("section");
    section2.classList.add("recipe-content");

    section2.innerHTML = `
    <article>
            <h4>instructions</h4>
            <p>${recipe.instructions}</p>
          </article>
          <article class="second-column">
            <div>
              <h4>ingredients</h4>
              <p class="single-ingredient">${recipe.ingredients}</p>
            </div>
    </article>
    `;

    parent.appendChild(section);
    parent.appendChild(section2);
};



getparams();