let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
};

generateCart = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket
            .map((x)=> {
                let { id, item} = x;
                let search = shopItemsData.find((y)=>y.id===id) || [];
                return `
                <div class="cart-item">
                    <img width= "100" src=${search.img} alt="">
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${search.name}</p>
                                <p class="cart-item-price">$ ${search.price}</p>
                            </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                        <div class="incr-buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>

                        <h3>$ ${item * search.price}</h3>

                    </div>
                </div>
                `
            }).join(""))
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
            <button class="homeButton">Back to home</button>
        </a>
        `;
    }
    //console.log(cardId)
}

let increment = (id) => {
    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id : selectedItem.id,
            item : 1
        });
    }

    else {
        search.item += 1;
    }

    //console.log(basket);
    //console.log(selectedItem.id)
    update(selectedItem.id);
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
    generateCart();
};

let decrement = (id) => {
    let selectedItem = id;
    
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined){
        return
    }
    else if (search.item === 0) {
        return 
    }
    else {
        search.item -= 1;
    };
    
    //console.log(basket);
    update(selectedItem.id);
    calculation();
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data",JSON.stringify(basket));
    generateCart();
};

let update = (id) => {
    let search = basket.find((x) => x.id == id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
    totalAmount();
    generateCart();        
};

let removeAll = () => {
    basket = [];
    generateCart();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
    if (basket.length !==0) {
        let amount = basket.map((x) => {
            let {item,id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item*search.price;
        })
        .reduce((x,y)=>x+y,0);
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="removeAll()" class="removeAll">Clear Cart</button>
        `
        //console.log(amount);
    } else return;
}

calculation();
generateCart();
totalAmount();