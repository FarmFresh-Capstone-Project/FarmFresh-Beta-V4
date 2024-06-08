function displayCheckoutCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const checkoutTable = document.getElementById("checkout-items");
  let subTotal = 0;

  checkoutTable.innerHTML = "";

  cartItems.forEach((item) => {
    const itemRow = document.createElement("tr");
    itemRow.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price}</td>
    `;
    checkoutTable.appendChild(itemRow);
    subTotal += item.quantity * item.price;
  });

  const subTotalElement = document.getElementById("stotal");
  subTotalElement.textContent = subTotal.toFixed(2);
}

window.onload = displayCheckoutCart;


const defaultCountries = [
  "Indonesia",
  "Inggris",
  "China",
  "Taiwan",
  "Jepang",
  "Korea",
];
const countrySelects = document.querySelectorAll('select[id$="country"]');
countrySelects.forEach((select) => {
  defaultCountries.forEach((country) => {
    const option = document.createElement("option");
    option.text = country.toUpperCase();
    option.value = country.toUpperCase();
    select.add(option);
  });
});

// const sameAsBillingCheckbox = document.getElementById('same-as-billing');
// sameAsBillingCheckbox.addEventListener('change', function() {
//   const billingName = document.getElementById('name').value;
//   const billingEmail = document.getElementById('email').value;
//   const billingPhone = document.getElementById('phone').value;
//   const billingCity = document.getElementById('city').value;
//   const billingAddress = document.getElementById('address').value;
//   const billingPostalCode = document.getElementById('postal-code').value;
//   const billingCountry = document.getElementById('country').value;

//   if (this.checked) {
//     document.getElementById('shipping-name').value = billingName;
//     document.getElementById('shipping-email').value = billingEmail;
//     document.getElementById('shipping-phone').value = billingPhone;
//     document.getElementById('shipping-city').value = billingCity;
//     document.getElementById('shipping-address').value = billingAddress;
//     document.getElementById('shipping-postal-code').value = billingPostalCode;
//     document.getElementById('shipping-country').value = billingCountry.toUpperCase();
//   } else {
//     document.getElementById('shipping-name').value = '';
//     document.getElementById('shipping-email').value = '';
//     document.getElementById('shipping-phone').value = '';
//     document.getElementById('shipping-city').value = '';
//     document.getElementById('shipping-address').value = '';
//     document.getElementById('shipping-postal-code').value = '';
//     document.getElementById('shipping-country').value = '';
//   }
// });

const orderForm = document.getElementById("checkout-order-form");
orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const city = document.getElementById("city").value;
  const address = document.getElementById("address").value;
  const postalCode = document.getElementById("postal-code").value;
  const country = document.getElementById("country").value;
  const shippingName = document.getElementById("shipping-name").value;
  const shippingAddress = document.getElementById("shipping-address").value;
  const shippingCity = document.getElementById("shipping-city").value;
  const shippingPostalCode = document.getElementById(
    "shipping-postal-code"
  ).value;
  const shippingCountry = document.getElementById("shipping-country").value;
  const shippingPhone = document.getElementById("shipping-phone").value;

  const order = {
    customer: {
      name,
      email,
      phone,
      city,
      address,
      postalCode,
      country,
    },
    shipping: {
      name: shippingName,
      address: shippingAddress,
      city: shippingCity,
      postalCode: shippingPostalCode,
      country: shippingCountry,
      phone: shippingPhone,
    },
    items: JSON.parse(localStorage.getItem("cart")) || [],
    total: parseFloat(document.getElementById("stotal").textContent),
  };

  localStorage.setItem("order", JSON.stringify(order));

  window.location.href = "order.html";
});
