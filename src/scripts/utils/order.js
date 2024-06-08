document.addEventListener("DOMContentLoaded", function () {
  const order = JSON.parse(localStorage.getItem("order"));

  const orderSummaryElement = document.getElementById("order-summary");
  orderSummaryElement.innerHTML = `
    <h2>Order Details:</h2>
    <p><strong>Name:</strong> ${order.customer.name}</p>
    <p><strong>Email:</strong> ${order.customer.email}</p>
    <p><strong>Phone:</strong> ${order.customer.phone}</p>
    <p><strong>City:</strong> ${order.customer.city}</p>
    <p><strong>Address:</strong> ${order.customer.address}</p>
    <p><strong>Postal Code:</strong> ${order.customer.postalCode}</p>
    <p><strong>Country:</strong> ${order.customer.country}</p>
    <p><strong>Shipping Name:</strong> ${order.shipping.name}</p>
    <p><strong>Shipping Address:</strong> ${order.shipping.address}</p>
    <p><strong>Shipping City:</strong> ${order.shipping.city}</p>
    <p><strong>Shipping Postal Code:</strong> ${order.shipping.postalCode}</p>
    <p><strong>Shipping Country:</strong> ${order.shipping.country}</p>
    <p><strong>Shipping Phone:</strong> ${order.shipping.phone}</p>
    <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
  `;

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirm Order";
  confirmButton.classList.add("confirm-button");
  orderSummaryElement.appendChild(confirmButton);

  confirmButton.addEventListener("click", function () {
    localStorage.removeItem("cart");
    localStorage.removeItem("order");

    const history = {
      customer: order.customer,
      shipping: order.shipping,
      items: order.items,
      total: order.total,
      date: new Date().toLocaleDateString("en-US"),
    };

    const existingHistory = JSON.parse(localStorage.getItem("history")) || [];

    existingHistory.push(history);

    localStorage.setItem("history", JSON.stringify(existingHistory));
    window.location.href = "index.html";
  });
});
