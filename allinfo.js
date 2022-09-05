
const username = document.getElementById('name');
const team = document.getElementById('team');
const position = document.getElementById('position');
const email = document.getElementById('email');
const number = document.getElementById('number');
const laptopname = document.getElementById('laptopname');
const laptopbrand = document.getElementById('laptopbrand');
const laptopram = document.getElementById('laptopram');
const laptopmemory = document.getElementById('laptopmemory');
const cpu = document.getElementById('cpu');
const cpucore = document.getElementById('cpucore');
const cputhread = document.getElementById('cputhread');
const laptopstate = document.getElementById('laptopstate');
const laptopprice = document.getElementById('laptopprice');
const purchdate = document.getElementById('purchdate');

//// this function will take argument, and pass in API call to take fullinfo relatively of this id

const showfulldata = async function (id) {
    try {
        const url = `https://pcfy.redberryinternship.ge/api/laptop/${id}?token=40c0bd230552133755bbde894730b650`;
        const res = await fetch(url);

        const data = await res.json();

        // data.data.forEach(element => {
        //     username.innerHTML += `
        //     <p>${element.user.name}</p>`
        // });
        console.log(data);
        username.textContent = data.data.user.name + ' ' + data.data.user.surname;
        team.textContent = data.data.user.team_id;
        position.textContent = data.data.user.position_id;
        email.textContent = data.data.user.email;
        number.textContent = data.data.user.phone_number;
        laptopname.textContent = data.data.laptop.name;
        laptopbrand.textContent = data.data.laptop.brand_id;
        laptopram.textContent = data.data.laptop.ram;
        laptopmemory.textContent = data.data.laptop.hard_drive_type;
        cpu.textContent = data.data.laptop.cpu.name
        cpucore.textContent = data.data.laptop.cpu.cores;
        cputhread.textContent = data.data.laptop.cpu.threads;
        laptopstate.textContent = data.data.laptop.state;
        laptopprice.textContent = data.data.laptop.price;
        purchdate.textContent = data.data.laptop.purchase_date;
        imagecontainer.innerHTML += `
             <img src='https://pcfy.redberryinternship.ge${data.data.laptop.image}' width="250px" height="170"px>`;
    } catch (err) {
        alert(err);

    }
};

window.addEventListener('load', function () {
    showfulldata(2433);
})













































































/// test render data from test API


// const getalldata = function (name) {
//     fetch(`https://jsonplaceholder.typicode.com/${name}`).then(function (response) {
//         return response.json();
//     }).then(function (data) {
//         console.log(data);

//         const list = document.querySelector('.gotinfo');

//         Object.values(data).forEach(value => list.innerHTML += `
//             <li>${value.name}</li>
//             `);

//         const list2 = document.querySelector('.anotherinfo');
//         Object.values(data).forEach(value => list2.innerHTML += `
//             <li>${value.id}</li>
//         `);

//     });
// };
// getalldata('users');



// const getphotos = function (name) {
//     fetch(`https://jsonplaceholder.typicode.com/${name}/5`).then(function (response) {
//         return response.json();
//     }).then(function (data) {
//         console.log(data);

//         const list3 = document.querySelector('.photos');

//         Object.values(data).forEach(value => list3.innerHTML += `
//             <li><img url=${value.url}></li>
//             `);
//     });
// };
// getphotos('photos');