const article = document.querySelector("article");

document
  .querySelectorAll("[data-filter]")
  .forEach((a) => {
    const className = `filter-${a.getAttribute("data-filter").toLowerCase()}`;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      article.className = article.className === className
        ? ""
        : className;
    });
  });
  