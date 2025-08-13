import { ProductManager } from "/scripts/product.manager.js"

export const ProductListDomManagement = (() => {
   function createNode(tag, text, className) {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (className) el.className = className;
    return el;
  }

  function createElement(product) {
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
      const product_list_node = document.querySelector("#product-container .list")
      ProductManager.getAllProducts().forEach(product => {
        // List Item Generation

        // Appending an item to its HTML

        //
      })

      category_map.keys().forEach(category => {
        const category_element = createElement(category, category_map.get(category))
        product_list_node.appendChild(category_element)
      })

    }
  )
})()