const getparams = async () => {
    const param = new URLSearchParams(window.location.search).get("recipeId");
    if(!param)
    {
        window.location.href = "profile-recipe.html";
    }
    const url = `${API_URL}/profile/recipe/${param}/`;
    const options = {
        method: 'GET',
    };
    try {
        const response = await fetchWithToken(url,options);
        if (response.ok) {
            const data = await response.json();
            console.log('recipe data:', data);
            displayRecipeDetails(data);
        } else {
            console.error('Failed to fetch protected resource', response.status);
        }
    } catch (error) {
        console.error('Error fetching protected resource:', error);
    }
};

const displayRecipeDetails = (data) => {
    document.getElementById("title").value = data.title;
    document.getElementById("description").value = data.description;
    document.getElementById("ingredients").value = data.ingredients;
    document.getElementById("instruction").value = data.instructions;
    document.getElementById("prepare-time").value = data.prepare_time;
    document.getElementById("cooking-time").value = data.cooking_time;
    document.getElementById("serving").value = data.serving;
}


const handleRecipeUpdate = async () => {
    
    const title = getValue("title");
    const description = getValue("description");
    const ingredients = getValue("ingredients");
    const instructions = getValue("instruction");
    const prepare_time = getValue("prepare-time");
    const cooking_time = getValue("cooking-time");
    const serving = getValue("serving");
    const image = document.getElementById("recipe-image").files[0];
    
    const recipeData = new FormData();
    recipeData.append('title', title);
    recipeData.append('description', description);
    recipeData.append('ingredients', ingredients);
    recipeData.append('instructions', instructions);
    recipeData.append('prepare_time', prepare_time);
    recipeData.append('cooking_time', cooking_time);
    recipeData.append('serving', serving);
    if (image) {
        recipeData.append("image", image);
    }

    const id = new URLSearchParams(window.location.search).get("recipeId");

    const url = `${API_URL}/profile/recipe/${id}/`
    const options = {
        method: 'PATCH',
        body: recipeData
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            console.log('Recipe updated successfully');
            window.location.href = "profile-recipe.html";
        } else {
            console.log('Failed to updated recipe');
        }
    } catch (error) {
        console.error('Error updating recipe:', error);
    }
};



const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};


  


getparams();