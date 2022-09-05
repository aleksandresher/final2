
const moreinfo = document.getElementById('morebtn');

const showdata = async function () {
    try {
        const res = await fetch('https://pcfy.redberryinternship.ge/api/laptops?token=40c0bd230552133755bbde894730b650');

        const data = await res.json();


        console.log(data);

        data.data.forEach(element => {
            const username = document.getElementById('ownername');
            const lapname = document.getElementById('lapname');
            const laptopimage = document.getElementById('lapimg');
            const imagecontainer = document.getElementById('imgcontainer');
            const ownersurname = document.getElementById('surname');
            const userid = document.getElementById('id');
            username.innerHTML += `
                <p>${element.user.name}</p>
            `;
            lapname.innerHTML += `
             <p>${element.laptop.name}</p>`;
            imagecontainer.innerHTML += `
             <img src='https://pcfy.redberryinternship.ge${element.laptop.image}' width="250px" height="170"px>`;
            ownersurname.innerHTML += `
             <p>${element.user.surname}</p>`
            userid.innerHTML += `
            <p>${element.laptop.id}</p>`


        });


    } catch (err) {
        alert(err);
    }
};
showdata();

const userid = document.getElementById('id');

moreinfo.addEventListener('click', function () {
    localStorage.setItem('id', userid.textContent);
    window.location.href = 'allinfo.html';

})
