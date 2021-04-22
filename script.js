const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');


// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
        
                     <div class="card" data-id = "${meal.idMeal}">
                     <img class="card-img-top" src="${meal.strMealThumb}" alt="Card image cap"/>
                     <div class="card-body">
                       <h5 class="card-title">${meal.strMeal}</h5>
                       <button class="btn btn-danger recipe-btn" data-toggle="modal" data-target="#exampleModalCenter">Get Recipi</button>
                     </div>
                   </div>
                `;
            });
        //  mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal! Please Try Again";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}

// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}



// create a modal
function mealRecipeModal(meal){
    // console.log(meal);
    meal = meal[0];
    let html = `
     
     <!-- USES Modal -->
    
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style="background-color: rgba(231, 74, 12, 0.959);">
        <div class="meal-details">
                <button type="button"  class="recipe-close-btn" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
           </button>
        </div>
          <div class="modal-body text-center">
            <h5  class="modal-title= text-light" id="exampleModalLongTitle"> ${meal.strMeal}</h5>
             <button class="btn btn-light">${meal.strCategory}</button>
             <p class="text-light">Instructure</p>
            <p class="text-light"> ${meal.strInstructions}</p>
          </div>
          <div class="modal-footer m-auto">
              <img class="card-img" src= "${meal.strMealThumb}" alt="Card image cap"/>           
        </div>
        </div>
      </div>

       
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}



// <div class = "recipe-link">
// <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
// </div>
