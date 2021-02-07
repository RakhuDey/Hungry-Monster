const button = document.getElementById("search-button");
button.addEventListener("click", getMealItem);

const mealList = document.getElementById("meal-pic-name");

function getMealItem() {
    let searchInput = document.getElementById("search-input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then((res) => res.json())
        .then((data) => {
            let item = "";
            if (data.meals) {
                data.meals.forEach((meal) => {
                    item += `
                    <div class="meal-with-name">
                        <div id="meal-img">
                        <img src="${meal.strMealThumb}">
                        </div>
                        <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        </div>
                        <button class='detail-btn' onclick="displayMealDetails('${meal.idMeal}')" >Details <?button>
                   </div>
                    `;
                });
            } else {
                item = "Sorry! this item is not available";
            }
            mealList.innerHTML = item;
        });
}

const displayMealDetails = (recipe) => {
    const recipeDetails = document.getElementById("meal-pic-name");
    recipeDetails.style.display = "none";
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => renderMealInfo(data));
};
const renderMealInfo = (data) => {
    const mealDetails = data.meals[0];
    console.log(mealDetails);
    const MealDetailsDiv = document.getElementById("final-detail");
    const ul = document.getElementById("ingredient");
    MealDetailsDiv.innerHTML = `
         <div class="final-div">
                <img class="final-pic" src="${mealDetails.strMealThumb}">
                <h1>Ingredients</h1>
                <h3> Name: ${mealDetails.strMeal}</h3>
            <ul id="ingredient">
                    <li>1 Tbsp , ${mealDetails.strIngredient1}</li>
                    <li> 1 Onion , ${mealDetails.strIngredient2}</li>
                    <li>2 Garlic cloves, ${mealDetails.strIngredient3}</li>
                    <li> 120gm chorizo, ${mealDetails.strIngredient4}</li>
                    <li> 2*400gm cans chopped tomatoes, ${mealDetails.strIngredient5}</li>
                    <li> 1 tsp caster sugar, ${mealDetails.strIngredient6}</li>
            </ul>
    
    </div>
    `;
};