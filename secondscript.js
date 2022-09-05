
///// getting elements
const lapname = document.getElementById('lapnameheader');
const lapbrand = document.querySelector('.brandscontainer');
const cpu = document.querySelector('.cpus');
const cpucore = document.getElementById('cpucore');
const cputhread = document.getElementById('cputhread');
const ram = document.getElementById('raminfo');
const buyingdate = document.getElementById('datetime');
const lapprice = document.getElementById('pricenum');
const backpagetwo = document.getElementById('btn-back');
const saveinput = document.getElementById('btn-save');
const btn4 = document.querySelector('.testbtn2');
const imageuploadbtn = document.querySelector('.btn');
const brandslabel = document.querySelector('.labelofbrands');
const brands = document.querySelector('.brandscontainer');
const cpus = document.querySelector('.cpuscontainer');
const cpulabel = document.querySelector('.labelofcpus');
const form2 = document.getElementById('laptopform');



//// save input values in localstorage


const setLocalStorage2 = function () {
    /// page 2 values
    const lapnameValue = lapname.value;
    const lapbrandValue = lapbrand.value;
    const cpuvalue = cpu.value;
    const cpucoreValue = cpucore.value;
    const cputhreadValue = cputhread.value;
    const ramValue = ram.value;
    const buyingdateValue = buyingdate.value;
    const lappriceValue = lapprice.value;

    ////// set page 2 values in localstorage
    localStorage.setItem('lapname', lapnameValue);
    localStorage.setItem('lapbrand', lapbrandValue);
    localStorage.setItem('cpucore', cpucoreValue);
    localStorage.setItem('cpu', cpuvalue);
    localStorage.setItem('cputhread', cputhreadValue);
    localStorage.setItem('ram', ramValue);
    localStorage.setItem('buydate', buyingdateValue);
    localStorage.setItem('price', lappriceValue);


};

////// get input values from localstorage

const getLocalStorage2 = function () {

    /// second page
    lapname.value = localStorage.getItem('lapname');
    lapbrand.value = localStorage.getItem('lapbrand');
    cpucore.value = localStorage.getItem('cpucore');
    cputhread.value = localStorage.getItem('cputhread');
    ram.value = localStorage.getItem('ram');
    buyingdate.value = localStorage.getItem('buydate');
    lapprice.value = localStorage.getItem('price');
    // selectedradio.value = localStorage.getItem('harddrive');

};

///// get value from localsotare after reload

window.addEventListener('load', function (e) {
    e.preventDefault();
    getLocalStorage2();

});

///// save values before reload
window.onbeforeunload = function (e) {
    e.preventDefault();
    setLocalStorage2();

};




//// get brands and display on user interface
const showbrands = async function () {
    try {
        const brandres = await fetch('https://pcfy.redberryinternship.ge/api/brands');
        const data = await brandres.json();

        if (!brandres.ok) throw new Error(`$data.message (${brandres.status})`);
        const list3 = document.querySelector('.brandscontainer');

        Object.values(data.data).forEach(value => list3.innerHTML += `
        <option>${value.name}</option>`);

        const getbrandvalue = function () {

            brands.value = localStorage.getItem('lapbrand');

        };
        getbrandvalue();


    } catch (err) {
        alert(err);
    }
};

/// call showbrands function 

showbrands();



///// get cpus and display on user interface

const showcpus = async function () {
    try {
        const cpures = await fetch('https://pcfy.redberryinternship.ge/api/cpus');
        const data = await cpures.json();

        if (!cpures.ok) throw new Error(`$data.message (${cpures.status})`);

        const list4 = document.querySelector('.cpus');


        Object.values(data.data).forEach(value => list4.innerHTML += `
       <option value ="${value.name}">${value.name}</option>`);


        const getcpuvalue = function () {

            cpu.value = localStorage.getItem('cpu');


        };
        getcpuvalue();

    } catch (err) {
        alert(err);
    }
};
showcpus();

///// check, if cpu is set, if set - remove label

const testitem = localStorage.getItem('cpu');
if (testitem) {
    cpulabel.style.visibility = 'hidden';
};


const testitem2 = localStorage.getItem('lapbrand');
if (testitem2) {
    brandslabel.style.visibility = 'hidden';
};




/////////////////////////////////////upload image / display / save to localstorage


const image_input = document.getElementById('image_input');
let uploaded_image = '';
image_input.addEventListener('change', function (event) {

    let reader = new FileReader();
    reader.addEventListener('load', (event) => {
        uploaded_image = reader.result;
        localStorage.setItem('imageend', reader.result);
        document.querySelector('#display_image').style.backgroundImage = `url(${uploaded_image})`;
        imageuploadbtn.style.visibility = "hidden";
        localStorage.setItem('image8', image_input.files[0].name);
        console.log(reader.result);

        return image_input.files[0];

    });
    reader.readAsDataURL(this.files[0]);
});
















//////////// post data to API

form2.addEventListener('submit', function (e) {
    e.preventDefault()
    const prePayload = new FormData(form2);
    prePayload.append('token', '40c0bd230552133755bbde894730b650')
    prePayload.append('laptop_image', image_input.files[0])
    prePayload.append('laptop_brand_id', 1)
    prePayload.append('team_id', Number(1))
    prePayload.append('position_id', 2)
    prePayload.append('name', localStorage.getItem('username'));
    prePayload.append('surname', localStorage.getItem('lastname'))
    prePayload.append('phone_number', localStorage.getItem('number'));
    prePayload.append('email', localStorage.getItem('email'))
    prePayload.append('laptop_hard_drive_type', 'SSD')
    prePayload.append('laptop_state', 'new')
    prePayload.append('laptop_purchase_date', "")

    fetch('https://pcfy.redberryinternship.ge/api/laptop/create', {
        method: 'POST',
        body: prePayload,
        headers: {
            'accept': 'multipart/form-data',

        },

    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            console.log(data)
            if (data.message = 'Information recorded') {
                 window.location.href = 'list.html';
                console.log('good job');
            }
        }).catch(error => console.error('Error:', error));
});



    // message: 'Information recorded'
