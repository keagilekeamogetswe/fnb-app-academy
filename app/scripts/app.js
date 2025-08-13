///Extenal dependencies
import * as Gsap from "https:/unpkg.com/gsap@3.13.0/index.js"
import * as d3 from "https://unpkg.com/d3@7?module";
//Sharing dependencies
export const d3Module = d3
export const GsapModule = Gsap.gsap;

import { D3Operations } from "/scripts/d3.operations.js";
import { AppContext } from "/scripts/app.context.js";
import { ProductManager } from "/scripts/product.manager.js";
import { DashBoardSummary } from "/scripts/DOMscripts/dashboard/dashboard.summary.js";
import { ProductListDomManagement } from "/scripts/DOMscripts/productlisting/product.list.state.management";

// Initial process that occur when content loads
document.addEventListener("DOMContentLoaded", async() => {
  // binding dark mode Buttons
  const toggleBtn = document.querySelector("[toggle-dark-mode]");
  toggleBtn.addEventListener("click", () => {
    const isDark = AppContext.Preferences.toggleDarkMode();
    console.log(`Dark mode is now ${isDark ? "ON" : "OFF"}`);
  });
  //Setting color scheme
  (() => {
    //Setting the switch to have an event listener
    const btnSwitchThemeSpan = document.querySelector("#main-theme-button span")
        //Guaranteed to run once so there's not need to worry about registering the same subscriber to
    AppContext.Preferences.subscribeToDarkMode((darkmode) => {
      if (darkmode) btnSwitchThemeSpan.classList.add("active")
      else btnSwitchThemeSpan.classList.remove("active")
      console.log("active ", (darkmode) ? "is there" : "is remove")
    })

  })()

  // Loading content from ssr json to Product list
  const product_load_status = await ProductManager.loadDefaultProducts()
  console.log("Products Loaded: ", product_load_status)
  // Running Data visualisation
  D3Operations.show()

});
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
  const isDark = e.matches;
  //document.body.classList.toggle("dark", isDark);
});