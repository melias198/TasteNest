const handleRecipePost = async (event) => {
    event.preventDefault();
    
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
    recipeData.append('image', image);

    const url = "https://tastenest.onrender.com/community/recipe/create/";
    const options = {
        method: 'POST',
        body: recipeData
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            console.log('Recipe uploaded successfully');
            window.location.href = "profile-recipe.html";
        } else {
            console.log('Failed to upload recipe');
        }
    } catch (error) {
        console.error('Error uploading recipe:', error);
    }
};



const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};


  