let kanapData = [];

const fetchKanap = async () => {
  await fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((promise) => {
      kanapData = promise;
      console.log(kanapData);
    });
};

const kanapDisplay = async () => {
  await fetchKanap();

  document.getElementById("items").innerHTML = kanapData
    .map(
      (kanap) =>
        `
      <a href="./product.html?id=${kanap._id}">
    <article>
      <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
      <h3 class="productName">${kanap.name}</h3>
      <p class="productDescription">${kanap.description}</p>
    </article>
  </a>
  `
    )
    .join("");
};
kanapDisplay();
