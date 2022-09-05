//// selecting elements

const username = document.getElementById('fname');
const lastname = document.getElementById('lname');
const teamdrop = document.querySelector(".teamdown");
const positiondrop = document.querySelector('.tpositiondown');
const useremail = document.getElementById('email');
const usernumber = document.getElementById('number');
const fpagenextbtn = document.getElementById('btn-next');
const photouploadbtn = document.getElementById('upload');
const forteam = document.querySelector('.team');
const coworker = document.querySelector('.coworkercontainer');
const team = document.querySelector('.teamscontainer')
const position = document.querySelector('.positionscontainer');
const teamslabel = document.querySelector('.labelofteams');
const positionlabel = document.querySelector('.labelofpositions');
const form = document.getElementById('myform');




//////////// save input values in localstorage

const setLocalStorage = function () {

    ////get values
    const usernameValue = username.value;
    const lastnameValue = lastname.value;
    const emailValue = useremail.value;
    const numberValue = usernumber.value;
    const userteamvalue = team.value;
    const userposvalue = position.value;

    ///// set page 1 values in localstorage
    localStorage.setItem('username', usernameValue);
    localStorage.setItem('lastname', lastnameValue);
    localStorage.setItem('email', emailValue);
    localStorage.setItem('number', numberValue);
    localStorage.setItem('team', userteamvalue);
    localStorage.setItem('position', userposvalue);
};




/////  get values  from localstorage

const getLocalStorage = function () {
    ////first page
    username.value = localStorage.getItem('username');
    lastname.value = localStorage.getItem('lastname');
    useremail.value = localStorage.getItem('email');
    usernumber.value = localStorage.getItem('number');

};

//// get input values after reload

window.addEventListener('load', function (e) {
    e.preventDefault();
    getLocalStorage();

});

//// save input values if page refreshes
window.onbeforeunload = function (e) {
    e.preventDefault();
    setLocalStorage();
    getLocalStorage();

};



///// get teams from API and display on user interface / save in localstorage

const showpteams = async function () {
    try {
        const posres = await fetch('https://pcfy.redberryinternship.ge/api/teams');
        const data = await posres.json();
        console.log(data);

        if (!posres.ok) throw new Error(`$data.message (${posres.status})`);

        const list = document.querySelector('.teamscontainer');

        Object.values(data.data).forEach(value => list.innerHTML += `
            <option>${value.name}${value.id}</option>
            `);

        const getteamvalue = function () {

            team.value = localStorage.getItem('team');

        };
        getteamvalue();

    } catch (err) {
        alert(err);
    }
};
showpteams();


const teamitem = localStorage.getItem('team');
if (teamitem) {
    teamslabel.style.visibility = 'hidden';
};





//// get positions and display on user interface / save in localstorage

const showpositions = async function () {
    try {
        const posres = await fetch('https://pcfy.redberryinternship.ge/api/positions');
        const data = await posres.json();

        console.log(data);

        if (!posres.ok) throw new Error(`$data.message (${posres.status})`);

        const list2 = document.querySelector('.positionscontainer');
        const listforid = document.getElementById('teamidcont');

        Object.values(data.data).forEach(value => list2.innerHTML += `
            <option>${value.name}</option>
            `);


        const getposvalue = function () {

            position.value = localStorage.getItem('position');


        };
        getposvalue();

    } catch (err) {
        alert(err);
    }
};
showpositions();

const positem = localStorage.getItem('position');
if (positem) {
    positionlabel.style.visibility = 'hidden';
};





/////////////////////////// inputs validation


const validateform = function () {
    const usernamevalue = document.getElementById('fname').value.trim();
    const userlnamevalue = document.getElementById('lname').value.trim();
    const userteamvalue = document.querySelector('.teamscontainer').value;
    const userpositionvalue = document.querySelector('.positionscontainer').value;
    const useremailvalue = document.getElementById('email').value.trim();
    const usernumbervalue = document.getElementById('number').value.trim();
    const nameinfo = document.querySelector('.nameinfo');
    const lnameinfo = document.querySelector('.lastnameinfo');
    const emailinfo = document.querySelector('.emailinfo');
    const numberinfo = document.querySelector('.numberinfo');
    const nameregax = /^[ა-ჰ]+$/;
    const emailend = "@redberry.ge";
    const numbercontainer = document.querySelector('.numbers');




    /// username validation
    if (usernamevalue.length < 2) {
        nameinfo.textContent = "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს";
        nameinfo.style.color = "red";

    } else if (!nameregax.test(usernamevalue)) {
        nameinfo.textContent = "გამოიყენეთ წართული ასოები";
        nameinfo.style.color = "red";

    } else {
        nameinfo.textContent = "მინიმუმ 2 სიმბოლო, ქართული ასოები";
        nameinfo.style.color = "black";

    };

    ///// lastname validation
    if (userlnamevalue.length < 2) {
        lnameinfo.textContent = "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს";
        lnameinfo.style.color = "red";

    } else if (!nameregax.test(userlnamevalue)) {
        lnameinfo.textContent = "გამოიყენეთ წართული ასოები";
        lnameinfo.style.color = "red";

    } else {
        lnameinfo.textContent = "მინიმუმ 2 სიმბოლო, ქართული ასოები";
        lnameinfo.style.color = "black";

    };

    ////team validation
    if (userteamvalue === '') {
        team.style.borderColor = "red";

    } else {
        team.style.borderColor = "black";
    };

    //// position validation

    if (userpositionvalue === '') {
        position.style.borderColor = "red";

    } else {
        position.style.borderColor = "black";
    };


    //// email validation 

    if (useremailvalue === '') {
        emailinfo.textContent = "გთხოვთ, შეიყვანოთ მეილი";
        emailinfo.style.color = "red";



    };

    if (!useremailvalue.endsWith("@redberry.ge")) {
        emailinfo.textContent = " მეილი უნდა მთავრდებოდეს $redberry.ge-ით";
        emailinfo.style.color = "red";
        useremail.style.borderColor = 'red';


    } else {
        emailinfo.style.color = "black";
        useremail.style.borderColor = 'black';

    }

    //// number validation
    const pattern = /^(\+?995)?(79\d{7}|5\d{8})$/;
    if (!pattern.test(usernumbervalue)) {
        numberinfo.style.color = "red";
        usernumber.style.borderColor = 'red';

    } else {
        numberinfo.style.color = "black";
        usernumber.style.borderColor = 'black';

    }




};

//////////// validate inputs on submit event

form.addEventListener('submit', (e) => {
    e.preventDefault();

    validateform();
    const data = new FormData(form);
    const payload = new URLSearchParams(data);

    localStorage.setItem('workerinfo', payload);

    console.log([...payload]);

    window.location.href = "laptopinfo.html";

});



