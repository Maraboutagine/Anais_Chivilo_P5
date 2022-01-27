// JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet javaScript
let produitEnregistreDansLocalStorage = JSON.parse(
  // Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
  localStorage.getItem("produit")
);
console.log(produitEnregistreDansLocalStorage);

const panier = document.querySelector("#cart__items");
console.log(panier);

let structureProduitPanier = [];

//si le panier est vide
function getCart() {
  if (
    produitEnregistreDansLocalStorage === null ||
    produitEnregistreDansLocalStorage == 0
  ) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    panier.innerHTML = emptyCart;
  } else {
    for (let produit in produitEnregistreDansLocalStorage) {
      // Insertion de l'élément "article"
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute(
        "data-id",
        produitEnregistreDansLocalStorage[produit].panierID
      );

      // Insertion de l'élément "div"
      let productDivImg = document.createElement("div");
      productArticle.appendChild(productDivImg);
      productDivImg.className = "cart__item__img";

      // Insertion de l'image
      let productImg = document.createElement("img");
      productDivImg.appendChild(productImg);
      productImg.src = produitEnregistreDansLocalStorage[produit].panierImg;
      productImg.alt = produitEnregistreDansLocalStorage[produit].altImgProduit;

      // Insertion de l'élément "div"
      let productItemContent = document.createElement("div");
      productArticle.appendChild(productItemContent);
      productItemContent.className = "cart__item__content";

      // Insertion de l'élément "div"
      let productItemContentTitlePrice = document.createElement("div");
      productItemContent.appendChild(productItemContentTitlePrice);
      productItemContentTitlePrice.className =
        "cart__item__content__titlePrice";

      // Insertion du titre h3
      let productTitle = document.createElement("h2");
      productItemContentTitlePrice.appendChild(productTitle);
      productTitle.innerHTML =
        produitEnregistreDansLocalStorage[produit].panierName;

      // Insertion de la couleur
      let productColor = document.createElement("p");
      productTitle.appendChild(productColor);
      productColor.innerHTML =
        produitEnregistreDansLocalStorage[produit].panierCouleurs;
      productColor.style.fontSize = "20px";

      // Insertion du prix
      let productPrice = document.createElement("p");
      productItemContentTitlePrice.appendChild(productPrice);
      let PrixProduit = [];

      showPriceByApi(
        productPrice,
        produitEnregistreDansLocalStorage[produit].panierID
      );
      productPrice.setAttribute(
        "id",
        `prix-${produitEnregistreDansLocalStorage[produit].panierID}`
      );

      // Insertion de l'élément "div"
      let productItemContentSettings = document.createElement("div");
      productItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.className = "cart__item__content__settings";

      // Insertion de l'élément "div"
      let productItemContentSettingsQuantity = document.createElement("div");
      productItemContentSettings.appendChild(
        productItemContentSettingsQuantity
      );
      productItemContentSettingsQuantity.className =
        "cart__item__content__settings__quantity";

      // Insertion de "Qté : "
      let productQte = document.createElement("p");
      productItemContentSettingsQuantity.appendChild(productQte);
      productQte.innerHTML = "Qté : ";

      // Insertion de la quantité
      let productQuantity = document.createElement("input");
      productItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value =
        produitEnregistreDansLocalStorage[produit].panierQuantity;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute(
        "id",
        produitEnregistreDansLocalStorage[produit].panierID
      );
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      // Insertion de l'élément "div"
      let productItemContentSettingsDelete = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.className =
        "cart__item__content__settings__delete";

      // Insertion de "p" supprimer
      let productSupprimer = document.createElement("p");
      productItemContentSettingsDelete.appendChild(productSupprimer);
      productSupprimer.className = "deleteItem";
      productSupprimer.innerHTML = "Supprimer";
    }
  }
}
getCart();

//cette fonction prends en parametre un element html comme source d'affichage et l'id d'un canapé pour recuperer son prix via l'API
async function showPriceByApi(elem, idProduct) {
  var priceToShow = await fetch(
    `http://localhost:3000/api/products/${idProduct}`
  )
    .then(function (res) {
      return res.json();
    })
    .then((promise) => {
      return promise.price;
    });
  elem.textContent = priceToShow + "€";
}

//cette fonction va calculer et afficher le prix total des produits dans le panier en recuperant les prix unitaires dans l'API
async function getTotals() {
  var elemsQtt = document.getElementsByClassName("itemQuantity");
  var myLength = elemsQtt.length;
  var totalQtt = 0;
  /* var productPrice = document.getElementsByClassName("prixpanier");*/
  for (var i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }
  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQtt;
  // Récupération du prix total
  var totalPrice = 0;
  for (var i = 0; i < myLength; ++i) {
    var priceUnit = await fetch(
      `http://localhost:3000/api/products/${elemsQtt[i].id}`
    )
      .then(function (res) {
        return res.json();
      })
      .then((promise) => {
        return promise.price;
      });
    totalPrice += elemsQtt[i].valueAsNumber * priceUnit;
  }
  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
}

getTotals();

// Modification d'une quantité de produit
function modifyQtt() {
  let productPrice = document.getElementsByClassName("prixpanier");
  let qttModif = document.querySelectorAll(".itemQuantity");
  let prix = document.querySelectorAll(".cart__item__content__titlePrice > p");
  console.log(prix);
  for (let k = 0; k < qttModif.length; k++) {
    qttModif[k].addEventListener("change", (event) => {
      //Selection de l'element à modifier en fonction de son id ET sa couleur
      let qttModifValue = event.target.value;
      produitEnregistreDansLocalStorage[k].panierQuantity = qttModifValue;

      localStorage.setItem(
        "produit",
        JSON.stringify(produitEnregistreDansLocalStorage)
      );
      getTotals();
    });
  }
}
modifyQtt();

// Suppression d'un produit
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll(".deleteItem");

  for (let j = 0; j < btn_supprimer.length; j++) {
    btn_supprimer[j].addEventListener("click", (event) => {
      event.preventDefault();

      //Selection de l'element à supprimer en fonction de son id ET sa couleur
      let idDelete = produitEnregistreDansLocalStorage[j].panierID;
      let colorDelete = produitEnregistreDansLocalStorage[j].panierCouleurs;

      produitEnregistreDansLocalStorage =
        produitEnregistreDansLocalStorage.filter(
          (el) => el.panierID !== idDelete || el.panierCouleurs !== colorDelete
        );

      localStorage.setItem(
        "produit",
        JSON.stringify(produitEnregistreDansLocalStorage)
      );

      //Alerte produit supprimé et refresh
      alert("Ce produit a bien été supprimé du panier");
      location.reload();
    });
  }
}
deleteProduct();

//Instauration formulaire avec regex
function getForm() {
  // Ajout des Regex
  let form = document.querySelector(".cart__order__form");

  //Création des expressions régulières
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Ecoute de la modification du prénom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Ecoute de la modification du nom
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Ecoute de la modification de l'adresse
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // Ecoute de la modification de la ville
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // Ecoute de la modification de l'adresse mail
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Ce champ est vide ou mal renseigné";
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}
getForm();
//Envoi des informations client au localstorage
function postForm() {
  const btnEnvoyerFormulaire = document.querySelector("#order");

  btnEnvoyerFormulaire.addEventListener("click", (e) => {
    e.preventDefault();

    const contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };

    let products = [];
    for (let i = 0; i < produitEnregistreDansLocalStorage.length; i++) {
      products.push(produitEnregistreDansLocalStorage[i].panierID);
    }
    let commande = {
      contact: contact,
      products: products,
    };

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commande),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (response) {
        document.location.href = "confirmation.html";
        localStorage.setItem("orderId", JSON.stringify(response.orderId));
      });
  });
}

postForm();
