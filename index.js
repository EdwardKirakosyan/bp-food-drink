import { menuArray } from "./data.js"

const allItems = document.getElementById("all-items")
const yourOrder = document.getElementById("your-order")
const formDiv = document.getElementById("form-div")

document.addEventListener("click", pushToArray)
document.addEventListener("click", removeFromArray)
document.addEventListener("click", completeOrder)

const orderArray = []

formDiv.addEventListener("submit", function (e) {
  e.preventDefault()
  const loginFormData = new FormData(form)
  const name = loginFormData.get("full-name")
  formDiv.innerHTML = ""
  yourOrder.innerHTML = `<p class="thanks">
                            Thank you for your order, <span>${name}</span>!
                        </p>`
  orderArray.length = 0
})

function renderOrderArray() {
  let orderHtml = ""
  let list = ""
  let total = Number("")

  if (!list) {
    orderArray.forEach(function (order) {
      list += `<div class="list" id="list">
                <p>${order.name}</p>
                <button data-remove="list">x</button>
                <p>$${order.price}</p>
              </div>`
      total += Number(order.price)
    })

    if (!orderHtml) {
      orderHtml += `<div class="main-order">
                      <h1>Your Order</h1>
                        ${list}
                      <p class="total">Total price: $${total}</p>
                      <button id="complete-btn" data-complete="${formDiv}">Complete Order</button>
                    </div>`
    }
  }
  return (yourOrder.innerHTML = orderHtml)
}

function pushToArray(e) {
  if (e.target.dataset.name) {
    orderArray.push({
      name: e.target.dataset.name,
      price: e.target.dataset.price,
    })
    renderOrderArray()
  }
}

function removeFromArray(e) {
  if (e.target.dataset.remove) {
    orderArray.pop(e.target.dataset.remove)
    renderOrderArray()
  }
}

function completeOrder(e) {
  if (e.target.dataset.complete) {
    formDiv.innerHTML = `<form id="form" class="form">
                          <button id="close-btn">x</button>
                          <p>Card details</p>
                          <input 
                            type="text" 
                            name="full-name" 
                            id="full-name" 
                            placeholder="Enter your name"
                            />
                          <input 
                            type="number" 
                            name="card" 
                            id="card" 
                            placeholder="Card number"
                            />
                          <input 
                            type="password" 
                            name="cvv" 
                            id="cvv"
                            placeholder="CVV"
                            />
                          <button 
                            class="pay-button"
                            type="submit" 
                            id="pay-btn" 
                            data-pay="${formDiv}">
                            PAY
                            </button>
                            </form>`
    renderOrderArray()
  }
}

function renderMenu() {
  let contHtml = ""
  menuArray.forEach(function (item) {
    contHtml += `<div id="${item.id}" class="each-item">
                      <p class="item-emo">${item.emoji}</p>
                      <div class="inner-div">
                        <h1 class="item-name">${item.name}</h1>
                        <p class="item-ing">${item.ingredients}</p>
                        <p class="item-price">$${item.price}</p>
                      </div>
                      <button id="ad-btn" class="add-btn" data-name="${item.name}" data-price="${item.price}">+</button>
                  </div>
                  `
  })
  return (allItems.innerHTML = contHtml)
}
renderMenu()

const closeBtn = document.getElementById("close-btn")
closeBtn.addEventListener("click", () => {
  if (formDiv.innerHTML !== "") {
    formDiv.innerHTML = ""
  }
})
