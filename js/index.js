/// <reference types="../@types/jquery"/>
function openNav() {
    $('.side-nav-menu').animate({ left: 0 }, 500)
    $('.open-close-icon').removeClass('fa-align-justify ')
    $('.open-close-icon').addClass('fa-2x fa-x')
    let time = 500;
    for (let i = 0; i < 6; i++) {
        $('.links li').eq(i).animate({ top: 0 }, time)
        time = time + 100
    }
}
closeNav();
function closeNav() {
    let navTabWidth = $('.nav-tap').outerWidth();
    $('.side-nav-menu').animate({ left: -navTabWidth }, 500)
    $('.open-close-icon').removeClass('fa-2x fa-x')
    $('.open-close-icon').addClass('fa-align-justify ')
    $('li').animate({ top: 300 }, 500)

}


$('.nav-header .open-close-icon').on('click', function () {

    if ($('.side-nav-menu').css('left') == '0px') {
        closeNav();
    }
    else {
        openNav();
    }

})



/////////////////////////


let rowData = document.getElementById('rowData');
let search = document.getElementById('search');

search.addEventListener('input', () => {
    
    searchByName('discover/movie');
    
});
async function searchByName(category) {
    var loading = document.querySelector('.loadingScreen');
    loading.classList.remove('d-none');
    loading.style.opacity = '1';

    try {
        let response = await fetch(`https://api.themoviedb.org/3/${category}?api_key=6790e5797d8484b1755479937fcf08f0`);
        let data = await response.json();
        allMovies = data.results;
        displayMovies(data.results);
        
    } catch (error) {
        console.error("Error:", error);
    } finally {
        loading.style.transition = 'opacity 2s';
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.classList.add('d-none');
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    searchByName("movie/now_playing");
});

function displayMovies(arr) {
    let searchValue = search.value;
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].original_title.toLowerCase().includes(searchValue.toLowerCase())) {
            cartoona += `
        
            <div class="col-md-4 p-4 mt-0">
                <div class="item position-relative overflow-hidden rounded-2">
                    <div class="poster">
                        <img class="w-100" src="https://image.tmdb.org/t/p/w500${arr[i].poster_path}" alt="">
                    </div>
                    <div class="movieInfo p-4 position-absolute">
                        <h1 class="movieName text-center fw-light">${arr[i].title}</h1>
                        <p class="movieReview fw-light">${arr[i].overview}</p>
                        <p class="date">Release Date <span class=>: 24-12-2024</span></p>
                        <div class="stars mt-4">
                        ${getStars(arr[i].vote_average)}
                        </div>
                        <h3 class="movieRate mt-2">${(arr[i].vote_average).toString().split("").slice(0, 3).join("")}</h3>
                    </div>
                </div>
            </div>
`
        }


    }
    rowData.innerHTML = cartoona;

}





function getStars(vote) {
    let stars = '';
    const fullStars = Math.floor(vote / 2);
    const halfStars = (vote % 2) >= 0.5 ? 1 : 0;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fa-solid fa-star text-warning fs-6"></i>';
    }
    if (halfStars) {
        stars += '<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>';
    }
    return stars;
}


let nameInput = document.querySelector('#validName')
let emailInput = document.querySelector('#validEmail')
let phoneInput = document.querySelector('#validPhone')
let ageInput = document.querySelector('#validAge')
let passInput = document.querySelector('#validPass')
let repassInput = document.querySelector('#repass')

function validFotm(element) {
    let regex = {
        validName: /^[A-Za-z\s]+$/,
        validEmail: /^[a-zA-Z]+[0-9]*[@](gmail.com)$/,
        validPhone: /^01[0125][0-9]{8}$/,
        validAge: /^(1[6-9]|[2-9][0-9])$/,
        validPass: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
    }
    if (regex[element.id].test(element.value) == true) {
        console.log('match');
        element.classList.remove('border-danger');
        element.nextElementSibling.classList.add('opacity-0')
    }
    else {
        console.log('no match');
        element.classList.add('border-danger');
        element.nextElementSibling.classList.remove('opacity-0')
    }

    if (element.value == "") {
        element.classList.remove('border-danger');
        element.nextElementSibling.classList.add('opacity-0')
    }

}
function checkPass() {
    if (passInput.value == repassInput.value) {
        repassInput.classList.remove('border-danger');
        repassInput.nextElementSibling.classList.add('opacity-0')
    }
    else {
        repassInput.classList.add('border-danger');
        repassInput.nextElementSibling.classList.remove('opacity-0')
    }

    if (element.value == "") {
        element.classList.remove('border-danger');
        element.nextElementSibling.classList.add('opacity-0')
    }
}



function clearInputs(){
 nameInput.value =""
 emailInput.value = ''
 phoneInput.value = ''
 ageInput.value = ''
 passInput.value = ''
 repassInput.value ='' 

}







