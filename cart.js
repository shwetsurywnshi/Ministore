let mobdiv=document.querySelector(".mob")
let watchdiv=document.querySelector(".watch")
let cartitemsdiv=document.querySelector(".modal-body")
let totalcartitemsdiv=document.querySelector(".nav-link sup")
let subtotaldiv=document.querySelector(".modal-footer")
let mobiles=[
    {
        id:1,
        name:"IPHONE 10",
        image:"images/product-item1.jpg",
        price:980,
        stock:9,
        qty:0
    },
    {
        id:2,
        name:"IPHONE 11",
        image:"images/product-item2.jpg",
        price:1100,
        stock:10,
        qty:0
    },
    {
        id:3,
        name:"IPHONE 8",
        image:"images/product-item3.jpg",
        price:780,
        stock:8,
        qty:0
    },
    {
        id:4,
        name:"IPHONE 13",
        image:"images/product-item4.jpg",
        price:1500,
        stock:9,
        qty:0
    },
    {
        id:5,
        name:"IPHONE 12",
        image:"images/product-item5.jpg",
        price:1500,
        stock:9,
        qty:0
    }
]
let watches=[
    {
        id:6,
        name:"PINK WATCH",
        image:"images/product-item6.jpg",
        price:870,
        stock:9,
        qty:0
    },
    {
        id:7,
        name:"HEAVY WATCH",
        image:"images/product-item7.jpg",
        price:680,
        stock:10,
        qty:0
    },
    {
        id:8,
        name:"SPOTTED WATCH",
        image:"images/product-item8.jpg",
        price:750,
        stock:8,
        qty:0
    },
    {
        id:9,
        name:"BLACK WATCH",
        image:"images/product-item9.jpg",
        price:650,
        stock:9,
        qty:0
    },
    {
        id:10,
        name:"BLACK WATCH",
        image:"images/product-item10.jpg",
        price:750,
        stock:9,
        qty:0
    }
]
function displaymobiles()
{
    mobiles.map((m,i)=>{
        mobdiv.innerHTML+=`
        <div class="col">
            <div class="card h-100 text-center" style="width: 18rem;">
              <img src=${m.image} class="card-img-top position-relative" alt="...">
              <button type="button" class="btn btn-dark px-5 p-2 mt-4 text-center position-absolute bottom-50 b" onclick="addtocart(${m.id})">ADD TO CART <i class="fa-solid fa-cart-shopping"></i></button>
              <div class="card-body d-flex justify-content-between">
                <h5 class="card-title">${m.name}</h5>
                <h5 class="card-text">$ ${m.price}</h5>
              </div>
            </div>
          </div>
        `
    })
}
displaymobiles()
function displaywatches()
{
    watches.map((w,i)=>{
        watchdiv.innerHTML+=`
        <div class="col">
            <div class="card h-100 text-center" style="width: 18rem;">
              <img src=${w.image} class="card-img-top position-relative" alt="...">
              <button type="button" class="btn btn-dark px-5 p-2 mt-4 text-center position-absolute bottom-50 b" onclick="addtocart(${w.id})">ADD TO CART <i class="fa-solid fa-cart-shopping"></i></button>
              <div class="card-body d-flex justify-content-between">
                <h5 class="card-title">${w.name}</h5>
                <h5 class="card-text">$ ${w.price}</h5>
              </div>
            </div>
          </div>
        `
    })
}
displaywatches()

let cart=JSON.parse(localStorage.getItem("cart")) || []

updatecart()
function addtocart(id)
{
    if(cart.some((c)=>c.id===id))
    {
        changeqty("plus",id)
    }
    else
    {
        let item=mobiles.find((m)=>m.id===id) || watches.find((w)=>w.id===id)
        cart.push({
            ...item,
            qty:1
        })
    }
    updatecart()
}
function updatecart()
{
    rendercartitems()
    rendersubtotal()
    localStorage.setItem("cart",JSON.stringify(cart))
}
function rendercartitems()
{
    cartitemsdiv.innerHTML=""
    cart.map((c,i)=>{
        cartitemsdiv.innerHTML+=`
        <table class="table w-100">
        <tbody>
        <tr>
            <td><img src=${c.image} height=80 width=80></td>
            <td>${c.name}</td>
            <td>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16" onclick="changeqty('minus',${c.id})">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
</svg>
            ${c.qty}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16" onclick="changeqty('plus',${c.id})">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
            </td>
            <td>${c.price}</td>
            <td><i class="fa-solid fa-trash text-danger" onclick="removecartitem(${c.id})"></i></td>
        </tr>
        </tbody>
        </table>
        `
    })
}
function changeqty(action,id)
{
    cart=cart.map((item)=>{
        let qty=item.qty
        if(item.id===id)
        {
            if(action=="minus" && qty>1)
            {
                qty--
            }
            else if(action=="plus" && qty<item.stock)
            {
                qty++
            }
        }
        return ({
            ...item,
            qty
        })
    })
    updatecart()
}
function rendersubtotal()
{
    let totalprice=0,cartitems=0
    cart.forEach((c)=>{
        cartitems+=c.qty
        totalprice+=c.qty*c.price
    })
    totalcartitemsdiv.innerHTML=cartitems
    subtotaldiv.innerHTML=`Subtotal of ${cartitems} items = $ ${totalprice.toFixed(2)}`
}
function removecartitem(id)
{
    cart=cart.filter((item)=>item.id!==id)
    updatecart()
}