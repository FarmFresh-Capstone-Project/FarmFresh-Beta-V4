import "regenerator-runtime";
import App from "./views/app";

document.addEventListener("DOMContentLoaded", () => {
  const app = new App({
    content: document.querySelector("#mainContent"),
  });

  window.addEventListener("hashchange", () => {
    app.renderPage();
  });

  window.addEventListener("load", () => {
    app.renderPage();
  });

  window.addToCart = (idProduct, productName) => {
    const itemElement = document.querySelector(`#vegetable-item-${idProduct}`);
    const priceString = itemElement.getAttribute("data-price"); 
    const price = parseFloat(
      priceString.replace("Rp", "").replace(".", "").replace(",", ".")
    ); 
    const quantity = itemElement.querySelector(
      ".vegetable-item__content__quantity"
    ).value;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((item) => item.idProduct === idProduct);

    if (productIndex >= 0) {
      cart[productIndex].quantity += parseInt(quantity, 10);
    } else {
      cart.push({
        idProduct,
        name: productName,
        quantity: parseInt(quantity, 10),
        price,
      }); 
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
  };

  function updateCartCount() {
    const cartItemCount = document.getElementById("cart-item-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = 0;
    cart.forEach((item) => {
      totalCount += item.quantity;
    });
    cartItemCount.textContent = totalCount;
  }
});
