var mls=document.getElementById('meals');
var detls=document.getElementById('det');
var xCategories=document.getElementById('Categories');
var catgcont=document.getElementById('catgcont');
var melfltr=document.getElementById('mealfilter');
var xArea=document.getElementById('Area');
var areacont=document.getElementById('areacont');
var areafilter=document.getElementById('areafilter');
var ingrdcont=document.getElementById('ingrdcont');
var ingrdfilter=document.getElementById('ingrdfilter');
var xIngredients=document.getElementById('Ingredients');
var searchcontainer=document.getElementById('search-container');
var contact=document.getElementById('contact');



let nvwidth=$('.nav').outerWidth();
if ($('.nvbr').css('left')=='0px') {
    document.getElementById('open').innerHTML = `<i class="fa fa-align-justify fa-times fs-3"></i>`;
}
else{
    document.getElementById('open').innerHTML = `<i class="fa fa-align-justify fs-3"></i>`;
}
function close(){
    document.getElementById('open').innerHTML = `<i class="fa fa-align-justify fs-3"></i>`;
    $('.nvbr').animate({left:`-${nvwidth}`},700);
    $('.appear').animate({top: '50%',},300)
        $('.l1').animate({opacity:'0',padding:'0'},250)
        $('.l2').animate({opacity:'0',padding:'0'},300)
        $('.l3').animate({opacity:'0',padding:'0'},350)
        $('.l4').animate({opacity:'0',padding:'0'},400)
        $('.l5').animate({opacity:'0',padding:'0'},450)
}
function open(){
    document.getElementById('open').innerHTML = `<i class="fa fa-align-justify fa-times fs-3"></i>`;
    $('.nvbr').animate({left:`0px`},600,function(){
    $('.appear').animate({top: '5%',},1000)
    $('.l1').animate({opacity:'1',padding:'15% 0'},300)
    $('.l2').animate({opacity:'1',padding:'15% 0'},500)
    $('.l3').animate({opacity:'1',padding:'15% 0'},700)
    $('.l4').animate({opacity:'1',padding:'15% 0'},900)
    $('.l5').animate({opacity:'1',padding:'15% 0'},1000)
    });   
}
$('.open').click(function(){
    if ($('.nvbr').css('left')=='0px') {
        close();
    }
    else{
        open();
    }
})


async function display() {

    var apiresponse=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    var finalresult=await apiresponse.json();
    cartoona=``;
    for(let i=0; i<finalresult.meals.length; i++ ){
       cartoona+=`
       <div class="col-md-3 photo gx-4 gy-4" onclick=" details(${finalresult.meals[i].idMeal})">
       <img src="${finalresult.meals[i].strMealThumb}" alt="" class="rounded-1">
       <div class="layer d-flex align-items-center rounded-1">
       <div class="info p-2">
           <h2>${finalresult.meals[i].strMeal}</h2>
       </div>
   </div>
       </div> 
       `
    }
    document.getElementById('content').innerHTML=cartoona;
}
var fload=document.getElementById('floading')
var load=document.getElementById('loading')
fload.classList.replace('d-none','d-flex');
$(document).ready(function(){
    $('#floading').animate({opacity:'0'},1000,function(){
        fload.classList.replace('d-flex','d-none');
    });
})
display();


async function details(id){
    load.classList.replace('d-none','d-flex');
    $('.loading').css('opacity','1')

    $(document).ready(function(){
        $('#loading').animate({opacity:'0'},1000,function(){
            load.classList.replace('d-flex','d-none');
        });
    })
    mls.classList.replace('d-flex','d-none');
    xCategories.classList.replace('d-flex','d-none');
    xIngredients.classList.replace('d-flex','d-none');
    xArea.classList.replace('d-flex','d-none');
    catgcont.classList.replace('row','d-none');
    melfltr.classList.replace('row','d-none');
    areacont.classList.replace('row','d-none');
    areafilter.classList.replace('row','d-none');
    ingrdcont.classList.replace('d-flex','d-none');
    ingrdfilter.classList.replace('row','d-none');
    searchcontainer.classList.add('d-none');
    contact.classList.replace('d-flex','d-none');
    clearform();
    letter.value=''
    word.value=''

    var apiresponse=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    var finalresult=await apiresponse.json();
    cartoona=`
    <div class="mealimg col-md-4 text-center">
    <img src="${finalresult.meals[0].strMealThumb}" alt="" class="w-100">
    <h2 class="text-white">${finalresult.meals[0].strMeal}</h2>
    </div>
    <div class="mealdesc col-md-8 text-white">
    <h2>Instructions</h2>
    <p>${finalresult.meals[0].strInstructions}</p>
    <h5 class="pb-2"><b class="fw-bolder">Area :</b>${finalresult.meals[0].strArea}</h5>
    
    <h5><b class="fw-bolder">Category : </b>${finalresult.meals[0].strCategory}</h5>
    <h3 class="pt-2">Recipes :</h3> 
    <div class="row pt" id="recipes">
    </div>
    <h3 class="pt-4 pb-2">Tags :</h3>
    <div class="d-flex">
    `
    var tgs=[];
    if(finalresult.meals[0].strTags!=null){
        tgs=finalresult.meals[0].strTags.split(",");
        for(var f=0; f<tgs.length; f++){
            cartoona+=`<span class="btn my-3 mx-1 px-2 p-1 mb-4 rounded text-black text-center" id="tags">${tgs[f]}</span><br>`
        }
    }
    cartoona+=`
    </div>
    <a class="btn btn-success text-white" target="_blank" href="${finalresult.meals[0].strSource}">Source</a>
    <a class="btn youtube text-white" target="_blank" href="${finalresult.meals[0].strYoutube}">Youtub</a>
    </div>
    `
    document.getElementById('details').innerHTML=cartoona;

    cartoona2=``
    const recValues = Object.values(finalresult.meals[0]);
    var k=29;
    for(var j=9; j<30; j++){
        if(recValues[j]=="") break;
        else{
            cartoona2+=`
            <h3 class="list-unstyled col-md-2 my-3 mx-1 rounded text-black d-flex align-items-center p-1">${recValues[k]} ${recValues[j]}</h3>
            `
            k++;
        }
    }
    document.getElementById('recipes').innerHTML=cartoona2;
    detls.classList.replace('d-none','d-flex');


}



var meal=[]
$('.Categories').click(async function(){
    close();
    meal=[];
    load.classList.replace('d-none','d-flex');
    $('.loading').css('opacity','1')

    $(document).ready(function(){
        $('#loading').animate({opacity:'0'},1000,function(){
            load.classList.replace('d-flex','d-none');
        });
    })
    mls.classList.replace('d-flex','d-none');
    detls.classList.replace('d-flex','d-none');
    melfltr.classList.replace('row','d-none');
    areacont.classList.replace('row','d-none');
    areafilter.classList.replace('row','d-none');
    ingrdcont.classList.replace('d-flex','d-none');
    ingrdfilter.classList.replace('row','d-none');
    xCategories.classList.replace('d-none','d-flex');
    xIngredients.classList.replace('d-flex','d-none');
    xArea.classList.replace('d-flex','d-none');
    searchcontainer.classList.add('d-none');
    clearform();
    letter.value=''
    word.value=''
    contact.classList.replace('d-flex','d-none');
    catgcont.classList.replace('d-none','row');



    var apiresponse=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    var finalresult=await apiresponse.json();
    cartoona=``;
    for(let i=0; i<finalresult.categories.length; i++){
        meal.push(finalresult.categories[i].strCategory);
       cartoona+=`
       <div class="col-md-3 photo gx-4 gy-4" id="catgnams" onclick="filterbyCategory(${i})">
       <img src="${finalresult.categories[i].strCategoryThumb}" alt="" class="rounded-1 w-100">
       <div class="layer d-flex align-items-center rounded-1">
       <div class="info p-2">
           <h2>${finalresult.categories[i].strCategory}</h2>
           <p>${finalresult.categories[i].strCategoryDescription.split(" ").splice(0,20).join(' ')}</p>
       </div>
   </div>
       </div> 
       `
    }
  
    document.getElementById('catgcont').innerHTML=cartoona;
})

async function filterbyCategory(mealid) {
    load.classList.replace('d-none','d-flex');
    $('.loading').css('opacity','1')

    $(document).ready(function(){
        $('#loading').animate({opacity:'0'},1000,function(){
            load.classList.replace('d-flex','d-none');
        });
    })
    catgcont.classList.replace('row','d-none');
    melfltr.classList.replace('d-none','row');

    var apiresponse=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal[mealid]}`);
    var finalresult=await apiresponse.json();
    cartoona=``
    for(let i=0; i<finalresult.meals.length; i++){
       cartoona+=`
       <div class="col-md-3 photo gx-4 gy-4" id="catgnams" onclick=" details(${finalresult.meals[i].idMeal})">
       <img src="${finalresult.meals[i].strMealThumb}" alt="" class="rounded-1 w-100">
       <div class="layer d-flex align-items-center rounded-1">
       <div class="info p-2">
           <h2>${finalresult.meals[i].strMeal}</h2>
       </div>
   </div>
       </div> 
       `
    }
    document.getElementById('mealfilter').innerHTML=cartoona;
}

$('.Area').click(async function(){
    close();
    meal=[];
    load.classList.replace('d-none','d-flex');
    $('.loading').css('opacity','1')

    $(document).ready(function(){
        $('#loading').animate({opacity:'0'},1000,function(){
            load.classList.replace('d-flex','d-none');
        });
    })
    mls.classList.replace('d-flex','d-none');
    detls.classList.replace('d-flex','d-none');
    catgcont.classList.replace('row','d-none');
    melfltr.classList.replace('row','d-none');
    areafilter.classList.replace('row','d-none');
    ingrdcont.classList.replace('d-flex','d-none');
    ingrdfilter.classList.replace('row','d-none');
    xCategories.classList.replace('d-flex','d-none');
    xIngredients.classList.replace('d-flex','d-none');
    searchcontainer.classList.add('d-none');
    contact.classList.replace('d-flex','d-none');
    clearform();
    letter.value=''
    word.value=''
    xArea.classList.replace('d-none','d-flex');
    areacont.classList.replace('d-none','row');

    var apiresponse=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    var finalresult=await apiresponse.json();
    cartoona=``;
    for(let i=0; i<20; i++){
        meal.push(finalresult.meals[i].strArea)
       cartoona+=`
       <div class="col-md-3 photo gx-4 gy-4 pb-2 text-center" onclick="filterbyarea(${i})">
                <i class="fa-solid fa-city fa-3x"></i>
                <h2 class="text-white">${finalresult.meals[i].strArea}</h2>
       </div> 
       `
    }
  
    document.getElementById('areacont').innerHTML=cartoona;
})


async function filterbyarea(areaid) {
    load.classList.replace('d-none','d-flex');
    $('.loading').css('opacity','1')

    $(document).ready(function(){
        $('#loading').animate({opacity:'0'},1000,function(){
            load.classList.replace('d-flex','d-none');
        });
    })
    areacont.classList.replace('row','d-none');
    areafilter.classList.replace('d-none','row');
    
    var apiresponse=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${meal[areaid]}`);
    var finalresult=await apiresponse.json();
    console.log(finalresult)
    cartoona=``
    for(let i=0; i<finalresult.meals.length; i++){
       cartoona+=`
       <div class="col-md-3 photo gx-4 gy-4" id="catgnams" onclick=" details(${finalresult.meals[i].idMeal})">
       <img src="${finalresult.meals[i].strMealThumb}" alt="" class="rounded-1 w-100">
       <div class="layer d-flex align-items-center rounded-1">
       <div class="info p-2">
           <h2>${finalresult.meals[i].strMeal}</h2>
       </div>
   </div>
       </div> 
       `
       if(i==19) break;
    }
    document.getElementById('areafilter').innerHTML=cartoona;
}

$('.Ingredients').click(async function(){
    close();
    meal=[];
    load.classList.replace('d-none','d-flex');
    $('.loading').css('opacity','1')

    $(document).ready(function(){
        $('#loading').animate({opacity:'0'},1000,function(){
            load.classList.replace('d-flex','d-none');
        });
    })
    mls.classList.replace('d-flex','d-none');
    detls.classList.replace('d-flex','d-none');
    catgcont.classList.replace('row','d-none');
    melfltr.classList.replace('row','d-none');
    areafilter.classList.replace('row','d-none');
    ingrdfilter.classList.replace('row','d-none');
    areacont.classList.replace('row','d-none');
    xCategories.classList.replace('d-flex','d-none');
    xIngredients.classList.replace('d-none','d-flex');
    xArea.classList.replace('d-flex','d-none');
    searchcontainer.classList.add('d-none');
    contact.classList.replace('d-flex','d-none');
    clearform();
    letter.value=''
    word.value=''
    ingrdcont.classList.replace('d-none','row');

    var apiresponse=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    var finalresult=await apiresponse.json();
    cartoona=``;
    for(let i=0; i<20; i++){
        meal.push(finalresult.meals[i].strIngredient)
       cartoona+=`
       <div class="col-md-3 photo gx-4 gy-4 pb-2 text-center" onclick="filterbyingred(${i})">
       <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h2 class="text-white">${finalresult.meals[i].strIngredient}</h2>
                <p class="text-white">${finalresult.meals[i].strDescription.split(" ").splice(0,20).join(' ')}</p>
       </div> 
       `
    }
  
    document.getElementById('ingrdcont').innerHTML=cartoona;
})

async function filterbyingred(ingredid) {
    load.classList.replace('d-none','d-flex');
    $('.loading').css('opacity','1')

    $(document).ready(function(){
        $('#loading').animate({opacity:'0'},1000,function(){
            load.classList.replace('d-flex','d-none');
        });
    })
    ingrdcont.classList.replace('row','d-none');
    ingrdfilter.classList.replace('d-none','row');
    
    var apiresponse=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal[ingredid]}`);
    var finalresult=await apiresponse.json();
    console.log(finalresult)
    cartoona=``
    for(let i=0; i<finalresult.meals.length; i++){
       cartoona+=`
       <div class="col-md-3 photo gx-4 gy-4" id="catgnams" onclick=" details(${finalresult.meals[i].idMeal})">
       <img src="${finalresult.meals[i].strMealThumb}" alt="" class="rounded-1 w-100">
       <div class="layer d-flex align-items-center rounded-1">
       <div class="info p-2">
           <h2>${finalresult.meals[i].strMeal}</h2>
       </div>
   </div>
       </div> 
       `
       if(i==19) break;
    }
    document.getElementById('ingrdfilter').innerHTML=cartoona;
}


$('.Search').click(function(){
    close();
    load.classList.replace('d-none','d-flex');
    $('.loading').css('opacity','1')

    $(document).ready(function(){
        $('#loading').animate({opacity:'0'},1000,function(){
            load.classList.replace('d-flex','d-none');
        });
    })
    mls.classList.replace('d-flex','d-none');
    detls.classList.replace('d-flex','d-none');
    catgcont.classList.replace('row','d-none');
    melfltr.classList.replace('row','d-none');
    areafilter.classList.replace('row','d-none');
    ingrdfilter.classList.replace('row','d-none');
    areacont.classList.replace('row','d-none');
    xCategories.classList.replace('d-flex','d-none');
    xIngredients.classList.replace('d-none','d-flex');
    xArea.classList.replace('d-flex','d-none');
    ingrdcont.classList.replace('row','d-none');
    ingrdcont.classList.replace('row','d-none');
    contact.classList.replace('d-flex','d-none');
    clearform();
    letter.value=''
    word.value=''
    searchcontainer.classList.remove('d-none');
})
var word=document.getElementById('searchword');
$("#searchword").keyup(async function(){
    
    load.classList.replace('d-none','d-flex');
    $('.loading').css('opacity','1')

    $(document).ready(function(){
        $('#loading').animate({opacity:'0'},1000,function(){
            load.classList.replace('d-flex','d-none');
        });
    })
    var apiresponse=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word.value}`);
    var finalresult=await apiresponse.json();
    cartoona=``;
    for(let i=0; i<20; i++){
        cartoona+=`
        <div class="col-md-3 photo gx-4 gy-4" id="catgnams" onclick=" details(${finalresult.meals[i].idMeal})">
        <img src="${finalresult.meals[i].strMealThumb}" alt="" class="rounded-1 w-100">
        <div class="layer d-flex align-items-center rounded-1">
        <div class="info p-2">
            <h2>${finalresult.meals[i].strMeal}</h2>
        </div>
    </div>
        </div> 
        `
    }
  
    document.getElementById('searchresult').innerHTML=cartoona;
  });
  
var letter=document.getElementById('letter');
$("#letter").keyup(async function(){
    load.classList.replace('d-none','d-flex');
    $('.loading').css('opacity','1')

    $(document).ready(function(){
        $('#loading').animate({opacity:'0'},1000,function(){
            load.classList.replace('d-flex','d-none');
        });
    })
    if(letter.value=='')display();
    else{
        var apiresponse=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter.value}`);
        var finalresult=await apiresponse.json();
    
        if(finalresult.meals==null) display();
        else{
            cartoona=``;
            for(let i=0; i<20; i++){
                cartoona+=`
                <div class="col-md-3 photo gx-4 gy-4" id="catgnams" onclick=" details(${finalresult.meals[i].idMeal})">
                <img src="${finalresult.meals[i].strMealThumb}" alt="" class="rounded-1 w-100">
                <div class="layer d-flex align-items-center rounded-1">
                <div class="info p-2">
                    <h2>${finalresult.meals[i].strMeal}</h2>
                </div>
            </div>
                </div> 
                `
            }
          
            document.getElementById('searchresult').innerHTML=cartoona;
        }
    }
   
  });

  $('.Contact').click(function(){
    close();
    nm=0 ;
    ml=0;
    phn=0;
    ag=0;
    pass=0;
    repass=0;
    btnval();
    $('.d1').slideUp(500);
    $('.d2').slideUp(500);
    $('.d3').slideUp(500);
    $('.d4').slideUp(500);
    $('.d5').slideUp(500);
    $('.d6').slideUp(500);
    nameinput.classList.remove('is-invalid');
    nameinput.classList.remove('is-valid');
    mailinput.classList.remove('is-invalid');
    mailinput.classList.remove('is-valid');
    phoneinput.classList.remove('is-invalid');
    phoneinput.classList.remove('is-valid');
    ageinput.classList.remove('is-invalid');
    ageinput.classList.remove('is-valid');
    passinput.classList.remove('is-invalid');
    passinput.classList.remove('is-valid');
    repassinput.classList.remove('is-invalid');
    repassinput.classList.remove('is-valid');
    load.classList.replace('d-none','d-flex');
    $('.loading').css('opacity','1')

    $(document).ready(function(){
        $('#loading').animate({opacity:'0'},1000,function(){
            load.classList.replace('d-flex','d-none');
        });
    })
    mls.classList.replace('d-flex','d-none');
    detls.classList.replace('d-flex','d-none');
    catgcont.classList.replace('row','d-none');
    melfltr.classList.replace('row','d-none');
    areafilter.classList.replace('row','d-none');
    ingrdfilter.classList.replace('row','d-none');
    areacont.classList.replace('row','d-none');
    xCategories.classList.replace('d-flex','d-none');
    xIngredients.classList.replace('d-none','d-flex');
    xArea.classList.replace('d-flex','d-none');
    ingrdcont.classList.replace('row','d-none');
    ingrdcont.classList.replace('row','d-none');
    searchcontainer.classList.add('d-none');
    contact.classList.replace('d-none','d-flex');
    clearform();
    letter.value=''
    word.value=''
})

function clearform(){
    nameinput.value="";
    mailinput.value="";
    phoneinput.value="";
    ageinput.value="";
    passinput.value="";
    repassinput.value="";
}

var namerejex=/^[ a-z]+$/;
var nameinput=document.getElementById('name');
var nm=0;
var mailregex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var mailinput=document.getElementById('email');
var ml=0;
var phoneregex=/^01[0125][0-9]{8}$/;
var phoneinput=document.getElementById('phone');
var phn=0;
var ageregex=/^(\d?[1-9]|[1-9]0)$/; //range from 1 to 99 years
var ageinput=document.getElementById('age');
var ag=0;
var passworregex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
var passinput=document.getElementById('password');
var pass=0;
var repassinput=document.getElementById('rePassword');
var repass=0

$('#name').keyup(function(){
    if(namerejex.test(nameinput.value)==true){
        nameinput.classList.remove('is-invalid');
        nameinput.classList.add('is-valid');
        $('.d1').slideUp(500);
        nm=1;
    }
    else{
        nameinput.classList.remove('is-valid');
        nameinput.classList.add('is-invalid');
        $('.d1').slideDown(500);
        nm=0;
    }
    btnval()
})
$('#email').keyup(function(){
    if(mailregex.test(mailinput.value)==true){
        mailinput.classList.remove('is-invalid');
        mailinput.classList.add('is-valid');
        $('.d2').slideUp(500);
        ml=1;
    }
    else{
        mailinput.classList.remove('is-valid');
        mailinput.classList.add('is-invalid');
        $('.d2').slideDown(500);
        ml=0;

    }
    btnval()
})
$('#phone').keyup(function(){
    if(phoneregex.test(phoneinput.value)==true){
        phoneinput.classList.remove('is-invalid');
        phoneinput.classList.add('is-valid');
        $('.d3').slideUp(500);
        phn=1;
    }
    else{
        phoneinput.classList.remove('is-valid');
        phoneinput.classList.add('is-invalid');
        $('.d3').slideDown(500);
        phn=0;

    }
    btnval()
})
$('#age').keyup(function(){
    if(ageregex.test(ageinput.value)==true){
        ageinput.classList.remove('is-invalid');
        ageinput.classList.add('is-valid');
        $('.d4').slideUp(500);
        ag=1;
    }
    else{
        ageinput.classList.remove('is-valid');
        ageinput.classList.add('is-invalid');
        $('.d4').slideDown(500);
        ag=0;

    }
    btnval()
})
$('#password').keyup(function(){
    if(passworregex.test(passinput.value)==true){
        passinput.classList.remove('is-invalid');
        passinput.classList.add('is-valid');
        $('.d5').slideUp(500);
        pass=1;
    }
    else{
        passinput.classList.remove('is-valid');
        passinput.classList.add('is-invalid');
        $('.d5').slideDown(500);
        pass=0;

    }
    btnval()
})
$('#rePassword').keyup(function(){
    if(passinput.value===repassinput.value){
        repassinput.classList.remove('is-invalid');
        repassinput.classList.add('is-valid');
        $('.d6').slideUp(500);
        repass=1;
    }
    else{
        repassinput.classList.remove('is-valid');
        repassinput.classList.add('is-invalid');
        $('.d6').slideDown(500);
        repass=0;

    }
    btnval()
})
function btnval(){
    if(nm==1 && ml==1 && phn==1 && ag==1 && pass==1 && repass==1){
        $( "#submitBtn" ).prop( "disabled", false);
    }
    else{
        $( "#submitBtn" ).prop( "disabled", true);
    
    }
}

 

