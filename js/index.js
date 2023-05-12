const searchBtn= document.getElementById("searchBtn");
const mealResult = document.getElementById("meal");
const mealsContent = document.querySelector(".meals-details-content");
const closeBtn = document.querySelector("#recipe-close-btn");
const details = document.querySelector(".meals-deatails")
console.log(mealResult)


searchBtn.addEventListener("click", getMealsList);
//get meal list
function getMealsList(){
    let searchInput= document.getElementById("searchInput").value.trim();
    console.log(searchInput);
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
.then(response => response.json())
.then(data=>{
    let html="";
    if(data.meals){
        data.meals.forEach(meal => {
            // console.log(data)
            html+=`
            
            <div class="col-md-4 col-lg-6">
                <div class="meal-item m-3" data-id = "${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" class="img-fluid" alt="food">

                    </div>
                    <div class="meal-name">
                        <h3 class="text-light">${meal.strMeal}</h3>
                       <button class="btn btn-outline-light mb-3" onclick="getMealRecipe(${meal.idMeal})">getrecipe</button>
                    </div>
                </div>
               
            </div>
           
       
            `;
        });

    }
    else{
        html= "sorry, we didn't find any meals ";
    };
    
    mealResult.innerHTML=html;
});

}
//get recipe of the meal
async function getMealRecipe(id){
   
    console.log(id);
   
       let response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
       let data =await response.json();
       mealRecipeModal(data.meals)
       
}

function mealRecipeModal(meal){
    console.log(meal);
    if(meal.length>0){
        let html='';
         html+=`
        <h2 class="reciepe_title">${meal[0].strMeal}</h2>
                                <p class="reciepe-category">${meal[0].strCategory}</p>
                                <div class="reciepe-instruct">
                                    <h3>instructions:</h3>
                                    <p>${meal[0].strInstructions}</p>
        
                                </div>
                                <div class="reciepe-meal-img">
                                    <img src="${meal[0].strMealThumb}" class="rounded-5 w-25" alt="">
                                </div>
                                <div class="reciepe-link mt-3">
                                    <a href="${meal[0].strYoutube}" target="_blank"class="text-muted" >watch video</a>
                                </div>`;
    
     mealsContent.innerHTML=html;
     $(".meals-deatails").show(100)
    }
    meal = meal[0];
   


}
//hide recipe of the meal
$("#recipe-close-btn").click(function(){
    $(".meals-deatails").hide(100)
})
document.addEventListener("keydown",function(eInfon){
    if(eInfon.key=="Escape"){
        $(".meals-deatails").hide(100)
    }
})