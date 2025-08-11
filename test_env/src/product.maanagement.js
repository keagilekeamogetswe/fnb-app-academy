const ProductManager = (() => {
  const products = new Map();

  return {
    addProd(item) {
      if(products.has(item.code)) return false
      products.set(item.code, item);
      return true
    },
    removeItem(code) {
      return products.delete(code);
    },
    getProduct(code) {
      return products.get(code);
    },
    updateItem(code, item_properties_to_modify) {
      if (!products.has(code)) throw new Error("Product does not exist");

      const currentProduct = products.get(code);
      const newCode = item_properties_to_modify.code;

      // Prevent overwriting another product if new code already exists
      if (newCode && newCode !== code && products.has(newCode)) {
        throw new Error("New code already exists");
      }

      // Merge properties
      const updatedProduct = { ...currentProduct, ...item_properties_to_modify };

      // If code is changing, delete old entry and set new one
      if (newCode && newCode !== code) {
        products.delete(code);
        products.set(newCode, updatedProduct);
      } else {
        products.set(code, updatedProduct);
      }
    }

  };
})();

module.exports = ProductManager;
