

let order = {};

function getMenu() {
    fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.getElementById("sec2-img").style.display = "none";
            const menuList = document.getElementById('menu-list');

            data.forEach(item => {
                const div2 = document.createElement("div");
                div2.innerHTML = `
                    <img src="${item.imgSrc}">
                    <div class="cards"> 
                        <div>
                            <p class="name">${item.name}</p>
                            <p class="price">$${item.price.toFixed(2)}</p>
                        </div>
                        <button class="add-item" data-name="${item.name}" data-price="${item.price}"> + </button>
                    </div>
                `;
                menuList.appendChild(div2);
            });

            // Add event listeners to the "add-item" buttons
            const addButtons = document.querySelectorAll('.add-item');
            addButtons.forEach(button => {
                button.addEventListener("click", function (e) {
                    const itemName = e.target.getAttribute('data-name');
                    const itemPrice = parseFloat(e.target.getAttribute('data-price'));

                    // Update the global order object
                    order[itemName] = itemPrice;
                    console.log('Order:', order);
                });
            });
            // return takeOrder(order);
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
        });
}

console.log(order);

function takeOrder(order) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Order taken:', order);
            resolve(order);
        }, 2500);
    })
    .then(order => orderPrep(order));
}


function orderPrep(order) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const prepStatus = { order_status: true, paid: false };
            console.log('Order preparation complete:', prepStatus);
            resolve(prepStatus);
        }, 1500);
    })
    .then(status => payOrder(status));
}

function payOrder(status) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const paymentStatus = { order_status: true, paid: true };
            console.log('Order paid:', paymentStatus);
            resolve(paymentStatus);
        }, 1000);
    })
   .then(status => thankyouFnc(status));
}

function thankyouFnc(status) {
    if (status.paid) {
        alert('Thank you for eating with us today!');
        // Optionally, you can reset the UI or navigate to another page
    } else {
        console.log('Order not paid. Something went wrong.');
    }
}


