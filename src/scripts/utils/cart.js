document.addEventListener("DOMContentLoaded", function () {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTable = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  let cartTotal = 0;

  function displayCart() {
    cartTable.innerHTML = "";
    cartTotal = 0;

    cartItems.forEach((item, index) => {
      const itemRow = document.createElement("tr");
      itemRow.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
        <td>${item.quantity * item.price}</td>
        <td><button class="delete-button" data-index="${index}">Delete</button></td>
      `;
      cartTable.appendChild(itemRow);
      cartTotal += item.quantity * item.price;
    });

    cartTotalElement.textContent = cartTotal;
  }

  displayCart();

  cartTable.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
      const index = parseInt(event.target.dataset.index);
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems)); 
      displayCart(); 
    }
  });
});
