  let Search= document.getElementById('Search')
  // 1-  loading
  
  $(document).ready(function(){
  $(".spinner").fadeOut(2000,function(){
    $("#loading").fadeOut(2000,function(){
      $("body").css('overflow','auto')
      $("#loading").remove();
    })
  })
})



// close left
$('#openNav').click(function () { 
  let i =$(".side-nav").innerWidth()
  console.log(i);
  $(".left-nav").animate({'left':'0px'},1000)
  $('#openNav').addClass('d-none')
  $("#closeNav").removeClass('d-none')
  $("#closeNav").click(()=>{
    $(".left-nav").animate({'left':-i},1000)
    $('#openNav').removeClass('d-none')
    $("#closeNav").addClass('d-none')
  })

});


$(".links ul li").click(()=>{
  let i =$(".side-nav").innerWidth()
  $(".left-nav").animate({'left':-i},1000)
  $('#openNav').removeClass('d-none')
  $("#closeNav").addClass('d-none')
})




// 2- Api  1-rowDate
let rowData=document.getElementById("rowData")
 async function getApi() {
  let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`) 
  let finallResponse= await response.json()
  desplay1(finallResponse.meals );
  
 }
 getApi()

function desplay1(meals){

  let box =''
  for(let i=0; i<meals.length;i++){
    box+=`<div class="col-md-3">
    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="img-hov w-100" src="${meals[i].strMealThumb}" alt="">
    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
    <h3>${meals[i].strMeal}</h3>
    </div>
    </div>
    </div>
    `
  }
  rowData.innerHTML=box
}



// 2-categoriesDate


 async function catApi() {
  let response= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`) 
   response= await response.json()
   categories(response.categories );
  
 }


function categories(categories){
  rowData.innerHTML=''
  Search.innerHTML=''
  

  let box =''
  for(let i=0; i<categories.length;i++){
    box+=`<div class="col-md-3">
    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="img-hov w-100" src="${categories[i].strCategoryThumb}" alt="">
    <div class="meal-layer position-absolute text-center text-black p-2">
    <h3>${categories[i].strCategory}</h3>
    <p class="fs-6">${categories[i].strCategoryDescription}</p>
    </div>
    </div>
    </div>
    `
  }
  rowData.innerHTML=box
}



// 3-areaDate

async function getArea() {

  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=`)
  let  finallResponse = await respone.json()
  console.log(finallResponse);

  area(finallResponse.meals)
}



function area(meals) {
  rowData.innerHTML = ''
  Search.innerHTML=''
  
  let box = "";

  for (let i = 0; i < meals.length; i++) {
      box += `
      <div class="col-md-3">
      <div class="text-center rounded-2 cursor-pointer ">
      <i class="fa-solid fa-house-laptop fa-5x text-white"></i>
      <h3 class="text-white ">${meals[i].strArea}</h3>
      </div>
      </div>
      `
  }

  rowData.innerHTML = box
}




// IngredientsDate
async function getIngredients() {
 
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  respone = await respone.json()

  ingredients(respone.meals.slice(0, 20))
}


function ingredients(arr) {
  rowData.innerHTML = ""
  
  let box = "";
  for (let i = 0; i < arr.length; i++) {
      box += `
      <div class="col-md-3">
              <div class="rounded-2 text-center text-white cursor-pointer">
                      <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                      <h3>${arr[i].strIngredient}</h3>
                      <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
              </div>
      </div>
      `
  }

  rowData.innerHTML = box
}




// search
function search(){
  // $("#rowData").addClass("d-none")
  rowData.innerHTML=''

  document.getElementById("Search").innerHTML=` <div class="col-md-6">
  <input onkeyup="searchByName(this.value)" type="text" class="form-control text-white bg-black border-white" placeholder="Search By Name">
</div>
<div class="col-md-6">
<input onkeyup="searchByFLetter(this.value)" type="text"  class="form-control text-white bg-black border-white" placeholder="Search By First Latter">
</div>`
}

async function searchByName(x) {
  $("#rowData").removeClass("d-none")
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
  response = await response.json()

  response.meals ? desplay1(response.meals) : desplay1([])

}
async function searchByFLetter(y) {
  $("#rowData").removeClass("d-none")
  y == "" ? y = "a" : "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${y}`)
  response = await response.json()
  response.meals ? desplay1(response.meals) : desplay1([])
  
}



// 

function showContacts() {
  Search.innerHTML=''
  rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password Minimum eight characters, at least one letter and one number:
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;

  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });
  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });
  document.getElementById("phoneInput").addEventListener("focus", () => {
    phneInputTouched = true;
  });
  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });
  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });
  document.getElementById("repasswordInput").addEventListener("focus", () => {
    passwordRInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let passwordRInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (phneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (passwordRInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    document.getElementById("submitBtn").removeAttribute("disabled");
  } else {
    document.getElementById("submitBtn").setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}