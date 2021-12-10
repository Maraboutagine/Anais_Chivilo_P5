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
      productPrice.innerHTML =
        produitEnregistreDansLocalStorage[produit].panierPrix + " €";

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

function getTotals() {
  // Récupération du total des quantités
  var elemsQtt = document.getElementsByClassName("itemQuantity");
  var myLength = elemsQtt.length,
    totalQtt = 0;

  for (var i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQtt;
  console.log(totalQtt);

  // Récupération du prix total
  totalPrice = 0;

  for (var i = 0; i < myLength; ++i) {
    totalPrice +=
      elemsQtt[i].valueAsNumber *
      produitEnregistreDansLocalStorage[i].panierPrix;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}
getTotals();

// Modification d'une quantité de produit
function modifyQtt() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < qttModif.length; k++) {
    qttModif[k].addEventListener("change", (event) => {
      event.preventDefault();

      //Selection de l'element à modifier en fonction de son id ET sa couleur
      let quantityModif = produitEnregistreDansLocalStorage[k].panierQuantity;
      let qttModifValue = qttModif[k].valueAsNumber;

      const resultFind = produitEnregistreDansLocalStorage.find(
        (el) => el.qttModifValue !== quantityModif
      );

      resultFind.panierQuantity = qttModifValue;
      produitEnregistreDansLocalStorage[k].panierQuantity =
        resultFind.panierQuantity;

      localStorage.setItem(
        "produit",
        JSON.stringify(produitEnregistreDansLocalStorage)
      );

      // refresh rapide
      location.reload();
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
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
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
  const btn_commander = document.getElementById("order");

  //Ecouter le panier
  btn_commander.addEventListener("click", (event) => {
    //Récupération des coordonnées du formulaire client
    let inputName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let inputAdress = document.getElementById("address");
    let inputCity = document.getElementById("city");
    let inputMail = document.getElementById("email");

    //Construction d'un array depuis le local storage
    let panierIDs = [];
    for (let i = 0; i < produitEnregistreDansLocalStorage.length; i++) {
      panierIDs.push(produitEnregistreDansLocalStorage[i].panierID);
    }
    console.log(panierIDs);

    const order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputMail.value,
      },
      products: panierIDs,
    };

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((reponse) => reponse.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));

    postForm();
  });
}
