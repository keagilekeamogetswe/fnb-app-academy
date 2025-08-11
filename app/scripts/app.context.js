export const AppContext = (() => {
  let darkmode = false
  if (darkmode) document.body.classList.add("dark")
  //Keeps callbacks of all subscripbers
  //Callbacks take darkmode as a boolean param
  const darkmode_subscription = []
  function toggleDarkMode() {
    darkmode = !darkmode
    if (darkmode) document.body.classList.add("dark")
    else document.body.classList.remove("dark")
    const mode = (darkmode) ? "dark" : "light"
    darkmode_subscription.forEach(callback => {
      callback(darkmode)
    });
    return darkmode
  }
  //Setting event listeners for elements
  document.querySelectorAll("[toogle-color-scheme]").forEach(element => {
    element.addEventListener("click", toggleDarkMode)
  })
  return {
    Preferences: {
      toggleDarkMode,
      subscribeToDarkMode: (callback) => {
        darkmode_subscription.push(callback)
      }
    },
  }
})()
