function toggleTheme() {
  const body = document.body;

  if (body.classList.contains("blue-theme")) {
    body.classList.remove("blue-theme");
    body.style.background = "linear-gradient(135deg, #FFF6F6, #F7EDE2)";
  } else {
    body.classList.add("blue-theme");
    body.style.background = "linear-gradient(135deg, #E1F7FF, #F0FCFF)";
  }
}

document.getElementById("themeBtn")?.addEventListener("click", toggleTheme);
