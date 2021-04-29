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
         mealList.classList.remove('notFound');
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

// function closeBtn() {
//   // e.preventDefault();
//   document.getElementById("deleteBtn").style.display = "none";
//   // document.getElementById("meal")
// }

// create a modal
function mealRecipeModal(meal){
    // console.log(meal);
    meal = meal[0];
    let html = `  
     
<div class="modal in" id="post-modal" style="display: block;">
   <div class="modal-dialog">
      <div class="modal-content text-center">

               <div class="inline-menu-container">
                    <a id="modal-close" class="close pr-3 pt-3" data-dismiss="modal"><span aria-hidden="true">×</span></a>
               </div>

               <h5 class="modal-title= text-dark" id="exampleModalLongTitle"> ${meal.strMeal}</h5>
               <button class="btn btn-dark mb-3">${meal.strCategory}</button>
               <p class="text-dark">Instructure</p>
               <p class="text-dark"> ${meal.strInstructions}</p>
               <img class="card-img mt-4 mb-4" src= "${meal.strMealThumb}" alt="Card image cap"/>
               <a class="video" href="${meal.strYoutube}" target="blank"><i class="fab fa-youtube"></i></a>
               <h3 class="text-center mb-3">Watch Video</h3>
        </div>
     </div>
  </div>`
       
    ;
    mealDetailsContent.innerHTML = html;
  };
 