import { ProductManager } from "/scripts/product.manager.js"

export const DashBoardSummary = (() => {
  function createNode(tag, text, className) {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (className) el.className = className;
    return el;
  }

  function createElement(category, quantity) {
    const container = createNode("div", null, "category");

    const elements = [
      createNode("small", "Category"),
      createNode("p", category),
      createNode("small", "Quantity"),
      createNode("h1", quantity)
    ];

    elements.forEach(el => container.appendChild(el));
    return container;
  }


  ProductManager.pushSubscription(
    () => {
      const category_list_element = document.querySelector("#categories")
      const category_map = new Map()
      ProductManager.getAllProducts().forEach(product => {
        const quantity = category_map.get(product.category)
        if (quantity)
          category_map.set(product.category, quantity + 1)
        else category_map.set(product.category, 1)
      })

      category_map.keys().forEach(category => {
        const category_element = createElement(category, category_map.get(category))
        category_list_element.appendChild(category_element)
      })

    }
  )
})()