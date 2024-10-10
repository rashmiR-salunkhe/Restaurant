async function getMenu() {
    try {
        const response = await fetch('food.json');
        const menuItems = await response.json();

        const menuContainer = document.getElementById('menu-items');
        menuContainer.innerHTML = ''; 

        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.setAttribute('data-id', item.id);

            menuItem.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price}/-</p>
                <button onclick="addToOrder(${item.id})">+</button>
            `;

            menuContainer.appendChild(menuItem);
        });

        setupSearch(menuItems); 
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}

function setupSearch(menuItems) {
    const searchInput = document.querySelector('.search-container input');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredItems = menuItems.filter(item => item.name.toLowerCase().includes(query));
        
        const menuContainer = document.getElementById('menu-items');
        menuContainer.innerHTML = ''; 

        filteredItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.setAttribute('data-id', item.id);

            menuItem.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price}/-</p>
                <button onclick="addToOrder(${item.id})">+</button>
            `;

            menuContainer.appendChild(menuItem);
        });
    });
}

function TakeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const burgers = ["Classic Burger", "Cheese Burger", "Bacon Burger", "Veggie Burger", "Chicken Burger"];
            const order = {
                items: burgers.sort(() => 0.5 - Math.random()).slice(0, 3) 
            };
            resolve(order);
        }, 2500);
    });
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}


function thankyouFnc() {
    alert("Thank you for eating with us today!");
}


async function restaurantProcess() {
    await getMenu(); 

    const order = await TakeOrder(); 
    console.log('Order:', order);

    const orderStatus = await orderPrep(); 
    console.log('Order Status:', orderStatus);

    const paymentStatus = await payOrder(); 
    console.log('Payment Status:', paymentStatus);

    if (paymentStatus.paid) {
        thankyouFnc(); 
    }
}

function addToOrder(itemId) {
    console.log(`Item with ID ${itemId} added to order.`);
}

window.onload = restaurantProcess;