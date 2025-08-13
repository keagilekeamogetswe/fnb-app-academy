export const ProductManager = (() => {
  const products = new Map();
  const subscribers = []
  function callSubcribers(params) {
    subscribers.forEach((callback) => {
      // Calling subscribers
      callback()
    })
  }

  return {
    pushSubscription: (responseCallback)=> {
      const type_valid = typeof responseCallback === "function"
      if (type_valid)
        subscribers.push(responseCallback)
      else console.error("unexpected type error");
      return type_valid;
    },
    getAllProducts: () =>Array.from(products).map(([code,item])=>item),
    loadDefaultProducts:  async ()=>{
      const data_element = document.getElementById("default-products")
      const data = JSON.parse(data_element.textContent)
      data?.forEach(prod_infor => {
        products.set(prod_infor.code, prod_infor)
      });
      //Emulating an asysnchronous delay
      const promise = await new Promise((resolve, reject) =>
        setTimeout(() => {
          resolve(true)
          //reject(new Error("Could not resolve"))
        }, 0)
      )
        .catch(error => {
          console.log("Promise rejected: ",error.message)
          return false
        });
      //If products are loaded the promise is true else false
      try {
        callSubcribers()
      } catch (error) {
        console.error(error)
      }
      return promise
    },
    addProd(item) {
      if(products.has(item.code)) return false
      products.set(item.code, item);
      callSubcribers()
      return true
    },
    removeItem(code) {
      const status = products.delete(code);
      if(status)callSubcribers();
      return stutus;
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
        const status = products.set(newCode, updatedProduct);
        callSubcribers()
        return status
      } else {
        const status = products.set(code, updatedProduct);
        callSubcribers()
        return status
      }
    }

  };
})();