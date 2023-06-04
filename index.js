import { menuArray } from "/data.js"

const allItems = document.getElementById("all-items")
const yourOrder = document.getElementById("your-order")
const formDiv = document.getElementById("form-div")

document.addEventListener("click", pushToArray)
document.addEventListener("click", removeFromArray)
document.addEventListener("click", completeOrder)

const orderArray = []

function renderOrderArray() {
  let orderHtml = ""
  let list = ""
  let total = Number("")

  if (!list) {
    orderArray.forEach(function (order) {
      list += `<div class="list" id="list">
                <p>${order.name}</p>
                <button data-remove="list">remove</button>
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
                          <p>Enter card details</p>
                          <input type="text" name="full-name" id="full-name" required />
                          <input type="number" name="card" id="card" required />
                          <input type="password" name="cvv" id="cvv" required />
                          <button>pay</button>
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
