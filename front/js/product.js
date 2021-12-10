const produit = window.location.search.split("?id=").join("");
console.log(produit);

main();

function main() {
  fetchProduit();
}

function fetchProduit() {
  fetch(`http://localhost:3000/api/products/${produit}`)
    .then(function (res) {
      return res.json();
    })

    .catch((error) => {
      /* si on a une erreur, alors on affiche un message */
      console.log("Impossible d'accéder aux canapés, vérifiez le serveur.");
    })
    /* si on a le resultat correct par l'API alors */
    .then((resultatAPI) => {
      const articles =
        resultatAPI; /* on initialise une constante dont la valeur est le résultat de l'API*/
      let canap_name = document.querySelector("#title");
      let canap_price = document.querySelector("#price");
      let canap_description = document.querySelector("#description");
      let canap_img = document.querySelector(".item__img img");
      canap_name.textContent = `${articles.name}`; /* nom du canapé */
      canap_price.textContent = `${articles.price.toString()}`; // prix
      canap_description.textContent = `${articles.description}`; // description
      canap_img.setAttribute("src", `${articles.imageUrl}`); //image
      canap_img.setAttribute("alt", `${articles.altTxt}`); //alt
      let couleur = document.getElementById("colors"); //couleur
      let couleurs = articles.colors;

      couleurs.forEach((element) => {
        // boucle qui parcourt la liste des couleurs
        let couleur_test = document.createElement("option");
        couleur_test.textContent = `${element}`;
        couleur.appendChild(couleur_test);
        couleur_test.setAttribute("value", element); // attribut value de la couleur
      });
      const btn_envoyerPanier = document.querySelector(`#addToCart`);
      btn_envoyerPanier.addEventListener("click", (event) => {
        event.preventDefault(); // bouton pour envoyer au panier

        const idForm = document.getElementById("colors"); // selection de l'id du formulaire
        const choixForm = idForm.value; // choix de l'utilisateur dans une variable
        console.log(choixForm);

        // quantité des produits
        const idQuantity = document.getElementById("quantity");
        const choixQuantity = idQuantity.value;

        // Récupération des valeurs du formulaire
        let optionsProduit = {
          panierID: articles._id,
          panierName: articles.name,
          panierPrix: articles.price.toString(),
          panierDescription: articles.description,
          panierImg: articles.imageUrl,
          panierCouleurs: choixForm,
          panierQuantity: choixQuantity,
        };

        console.log(optionsProduit);

        // JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet javaScript
        let produitEnregistreDansLocalStorage = JSON.parse(
          // Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
          localStorage.getItem("produit")
        );

        // message pour la confirmation de l'ajout au panier
        const popupconfirmation = () => {
          window.confirm(
            `${articles.name} option: ${choixForm} a été ajouté au panier !`
          );
        };

        //ajout dans le tableau de l'objet avec les valaurs choisi par l'utilisateur
        const ajoutProduitLocalStorage = () => {
          //la transformation en format JSON et l'envoyer dans la key "produit" du localStorage
          produitEnregistreDansLocalStorage.push(optionsProduit);

          localStorage.setItem(
            "produit",
            JSON.stringify(produitEnregistreDansLocalStorage)
          );
        };

        if (!produitEnregistreDansLocalStorage) {
          produitEnregistreDansLocalStorage = [];
        }

        ajoutProduitLocalStorage();
        // S'il n'y a pas de produit d'enregristré dans le local storage
        popupconfirmation();
      });
    });
}
