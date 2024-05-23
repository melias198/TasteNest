async function profileRecipeLoad () {
    try {
        const response = await fetchWithToken(`${API_URL}/profile/recipe/`);
        if (response.ok) {
            const data = await response.json();
            console.log('profile data:', data);
            displayRecipeList(data);
        } else {
            console.error('Failed to fetch protected resource', response.status);
        }
    } catch (error) {
        console.error('Error fetching protected resource:', error);
    }
};

const displayRecipeList = (recipes) => {
    recipes.forEach(element => {
        const parent = document.getElementById("profile-recipe-tbody");

        const eventDate = new Date(element.created);
        const formattedDate = eventDate.toLocaleDateString(); 

        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${element.id}</td>
        <td><a href="recipe-details.html?recipeId=${element.id}">${element.title}</a></td>
        <td>${formattedDate}</td>
        <td><a href="recipe-update.html?recipeId=${element.id}" class="btn">Update</a> <hr> <a onclick="handleDeleteRecipe(${element.id})" href="" class="btn btn-danger">Delete</a></td>
        `;

        parent.appendChild(tr);
    });
};


const handleDeleteRecipe = async (id) => {
    const url = `${API_URL}/profile/recipe/${id}/`;
    const options = {
        method: 'DELETE',
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            console.log('Recipe deleted successfully');
        } else {
            console.log('Failed to delete recipe');
        }
    } catch (error) {
        console.error('Error deleting recipe:', error);
    }
};




profileRecipeLoad();