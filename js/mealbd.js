const searchFood = () => {
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    // console.log(searchText);
    searchFiled.value = '';

    // Search meal by name
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
}

// search results displayed
const displaySearchResult = meals => {
    // console.log(meals);
    const searchResult = document.getElementById('search-result');
    // remove previous search result
    searchResult.innerHTML = '';

    // if not available the food then
    if (meals.length == 0) {
        document.getElementById('search-not-found').innerHTML = "this is invalid name";
        // searchNotFound.innerText.style.display = 'block';
    }

    meals.forEach(meal => {
        console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadSingleMealDetails(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
             <div class="card-body">
                 <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
             </div>
        </div>
        `
        searchResult.appendChild(div);
    })
}

// display single meal results

const loadSingleMealDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySingleMealDetails(data.meals[0]))
}

const displaySingleMealDetails = meal => {
    console.log(meal);

    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
            </div>
    `
    mealDetails.appendChild(div);
}