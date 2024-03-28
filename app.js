document.getElementById("btn").addEventListener("click", () => {
    let inputValue = document.getElementById('inputName').value;
    // console.log(inputValue);

    let details = document.getElementById("details") 
    details.innerHTML = ""
    
    // fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`)
        .then(response => response.json())
        .then(data=> {
            const items = document.getElementById("items")
            items.innerHTML = ""
            if(data.meals == null){
                document.getElementById("searchresult").style.display = "block"
            }else{
                document.getElementById("searchresult").style.display = "none"
                data.meals.forEach(meal =>{
                    itemDiv = document.createElement("div")
                    itemDiv.className = "item-1"
                    itemDiv.setAttribute('onclick' , `details('${meal.idMeal}')`)
                    let  itemInfo = `
                    <div class="card " style="width: 12rem;">
                        <img src="${meal.strMealThumb}" class="dish-image" alt="...">
                        <div class="dish-card">
                            <h5 class="dish-name">${meal.strMeal}</h5>
                        </div>
                    </div>
                    `
                    itemDiv.innerHTML = itemInfo
                    items.appendChild(itemDiv)
                })
            }

        })
})

function details(id){
    fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(detail => {
        let meal = detail.meals[0]
        console.log(meal)
        let details = document.getElementById("details")
        details.innerHTML = ""
        let detailsDiv = document.createElement("div")
        let detailsInfo = `
        <div class="card" style="width: 19rem;">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-text">${meal.strMeal}</h3>
            <h6>Ingredients</h6>
            <ul>
                <li>${meal.strIngredient1}</li>
                <li>${meal.strIngredient2}</li>
                <li>${meal.strIngredient3}</li>
                <li>${meal.strIngredient4}</li>
                <li>${meal.strIngredient5}</li>
            </ul>
            <h6>Instructions</h6>
            <p>${meal.strInstructions}</p>
        </div>
    </div>
        `
        detailsDiv.innerHTML = detailsInfo
        details.appendChild(detailsDiv)
    })
     // Hide items when details are displayed
     document.getElementById("items").style.display = "none";

     // Get the cancel icon element
const cancelIcon = document.getElementById("cancelIcon");

// Add event listener to the cancel icon
cancelIcon.addEventListener("click", () => {
    // Remove the details section or hide it based on your requirement
    document.getElementById("details").innerHTML = "";
});

// Show items when cancel button is clicked
            // const cancelIcon = document.getElementById("cancelIcon");
            cancelIcon.addEventListener("click", () => {
                document.getElementById("details").innerHTML = "";
                document.getElementById("items").style.display = "flex";
            });

}
function generateIngredientList(meal) {
    let ingredientList = '';
    for (let i = 1; i <= 10; i++) { // Assuming maximum of 10 ingredients
        let ingredientKey = 'strIngredient' + i;
        if (meal[ingredientKey]) {
            ingredientList += `<li>${meal[ingredientKey]}</li>`;
        } else {
            break; // Exit the loop if no more ingredients are found
        }
    }
    document.getElementById('ingredient-list').innerHTML = generateIngredientList(meal);
    return ingredientList;
}

