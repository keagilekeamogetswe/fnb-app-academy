const AppContext = (() => {
  let darkmode = false
  if (darkmode) document.body.classList.add("dark")

  return {
    Preferences: {
      toggleDarkMode: () => {
        darkmode = !darkmode
        if (darkmode) document.body.classList.add("dark")
        else document.body.classList.remove("dark")

        return darkmode
      }
    },
  }
})()