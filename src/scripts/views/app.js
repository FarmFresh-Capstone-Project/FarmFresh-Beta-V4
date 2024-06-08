import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ content }) {
    this._content = content;
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    if (page) {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } else {
      // Handle page not found
      this._content.innerHTML = '<p>Page not found</p>';
    }

    this.renderCart();
  }

  async renderCart() {
    const cartIconCount = document.getElementById('cart-item-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartIconCount.textContent = this.calculateCartItemCount(cart);
  }

  calculateCartItemCount(cart) {
    let totalCount = 0;
    cart.forEach(item => {
      totalCount += item.quantity;
    });
    return totalCount;
  }
}

export default App;
