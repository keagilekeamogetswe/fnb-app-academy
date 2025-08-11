import { GsapModule } from "/scripts/app.js";
export const GraphInforController = (() => {
  let timeout_id = null
  const timeout = 1500
  const node_created = (() => {
    const container = document.getElementById("graph-container");
    document.createElement("div")
   })()
  return {
    // Infor as a product-item Obj
    show: (infor, [xpos, ypos]) => {
      clearTimeout(timeout_id)
      const element = document.querySelector("#graph-popup")

      timeout_id = setTimeout(() => {
        //Setting the text content of current hovered product
        element.querySelector(".prod-name").textContent = infor.name
        element.querySelector(".prod-des").textContent = infor.description
        element.querySelector(".prod-quantity").textContent = infor.quantity
        element.querySelector(".prod-price").textContent = infor.price
        //animating pop up
        GsapModule.timeline().set("#graph-popup", { x: xpos - 30, y: ypos, scale: 1.3, opacity: 0 })
          .to("#graph-popup", { x: xpos, y: ypos, scale: 1, opacity: 1 })
          .from("#graph-popup .prod-name", { x: 10, opacity: 0 })
          .from("#graph-popup .prod-des", { x: 10, opacity: 0 })
          .from("#graph-popup .col", { y: 5, opacity: 0 })

      },timeout)
    },
    hide: () => {
      clearTimeout(timeout_id)
      const currentY = GsapModule.getProperty("#graph-popup", "y")
      timeout_id = setTimeout(() => {
        GsapModule.timeline()
        .to("#graph-popup", {opacity:0, y: currentY-10, duration:0.5})
      },timeout)
    }
  }
})()