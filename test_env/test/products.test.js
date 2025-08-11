const ProductManager = require("../src/product.maanagement")


describe('Product Manager Test Suite', () => {
  const prod = {
    "code": "d323e1",
    "name": "Big Pens",
    "description": "Smooth-writing ballpoint pens with a comfortable grip. Ideal for everyday use in offices and schools.",
    "quantity": 140,
    "QuantityBaseline": 40,
    "price": 24
  }
  const code = prod.code
  describe("should check if adds product correctly", () => {

    it("should add Product successfully", () => {
      ProductManager.addProd(prod)
      expect(ProductManager.getProduct(code)).toBe(prod)
    })
    it("should not allow to add an item if its code already exists", () => {
      ProductManager.addProd(prod)
      expect(ProductManager.addProd(prod)).toBe(false)
    })
  })
  describe("Updating product together WITH the product code", () => {
  it("should update product code and other properties that need to be modified", () => {
    const newCode = "new123";
    const newName = "Renamed Pens";

    ProductManager.updateItem(code, { code: newCode, name: newName });

    const updated = ProductManager.getProduct(newCode);
    expect(updated.name).toBe(newName);
    expect(ProductManager.getProduct(code)).toBeUndefined(); // old code should be gone

  });

  it("should NOT update ANYTHING since the new code in properties to be modify already exists", () => {
    // Omitted Other params
    const existingProd = {
      code: "existingCode",
      name: "Another Product",
      price: 50
    };
    ProductManager.addProd(existingProd);

    const attemptUpdate = () =>
      ProductManager.updateItem("new123", { code: "existingCode", name: "Clash" });
    expect(attemptUpdate).toThrow("New code already exists");
  });
});


 })