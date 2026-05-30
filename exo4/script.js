class Produit {
  constructor(id, nom, prix, categorie) {
    this.id = id;
    this.nom = nom;
    this.prix = prix;
    this.categorie = categorie;
  }
}
let produits = [
  new Produit("1", "Iphone 13 Pro", 4500, "Électronique"),
  new Produit("2", "Clavier Gamer", 450, "Électronique"),
];
let triCroissant = true;

const categories = ["Électronique", "Maison", "Jeux"];

const initTableau = (listeAAfficher = produits) => {
  const tableBody = document.getElementById("table-body");

  if (tableBody) {
    let tableContent = "";
    listeAAfficher.forEach((prod) => {
      tableContent += `
                <tr>
                    <td>${prod.id}</td>
                    <td>${prod.nom}</td>
                    <td>${prod.prix}</td>
                    <td>${prod.categorie}</td>
                    <td>
                    <button onclick="chargerProduit('${prod.id}')" class="btnOp update">editer</button>
                    <button onclick="supprimerEtudiant('${prod.id}')" class="btnOp delete">Supprimer</button>
                    </td>
                    </tr>`;
    });

    // Injection sécurisée dans le corps du tableau
    tableBody.innerHTML = tableContent;
  }
};

const annulerEdition = () => {
  const editForm = document.getElementById("editFormContainer");
  editForm.classList.add("hidden");
};

const lancerListeDeroulante = (inputCategorie) => {
  const select = document.getElementById(inputCategorie);

  if (select) {
    select.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- Sélectionnez une catégorie --";
    select.appendChild(defaultOption);

    categories.forEach((e) => {
      const option = document.createElement("option");
      option.value = e;
      option.textContent = e;
      select.appendChild(option);
    });
  }
};

const ajouterProduit = () => {
  const inputId = document.getElementById("inputId");
  const inputNom = document.getElementById("inputNom");
  const inputPrix = document.getElementById("inputPrix");
  const inputCategorie = document.getElementById("inputCategorie");

  //  validation
  if (inputId && inputNom && inputPrix && inputCategorie) {
    const id = inputId.value;

    const index = produits.findIndex((e) => String(e.id) === String(id));
    if (index !== -1) {
      alert("Cet Produit existe déjà (ID dupliqué) !");
      return;
    }

    const nom = inputNom.value;
    const prix = Number(inputPrix.value);
    const categorie = inputCategorie.value;

    if (id.trim() === "" || categorie.trim() === "" || nom.trim() === "") {
      alert("Veuillez Remplire tous le champs");
      return;
    }
    if (prix <= 0) {
      alert("Le prix doit etre positif");
      return;
    }
    const nouvelProduit = new Produit(id, nom, prix, categorie);
    console.log(nouvelProduit);

    produits.push(nouvelProduit);

    initTableau();
    // nettoyons la forme
    inputId.value = "";
    inputNom.value = "";
    inputPrix.value = "";
    afficherMessageSucces("🎉 Le produit a bien été enregistré !");
  }
};

const chargerProduit = (id) => {
  const produit = produits.find((e) => String(e.id) === String(id));

  if (produit) {
    document.getElementById("editId").value = produit.id;
    document.getElementById("editNom").value = produit.nom;
    document.getElementById("editPrix").value = produit.prix;
    lancerListeDeroulante("editCategorie");

    const selectCategorie = document.getElementById("editCategorie");
    selectCategorie.value = produit.categorie;

    const editForm = document.getElementById("editFormContainer");
    editForm.classList.remove("hidden");
  }
};

const sauvegarderModification = () => {
  const id = document.getElementById("editId").value;
  const nouveauNom = document.getElementById("editNom").value;
  const nouveauPrix = Number(document.getElementById("editPrix").value);
  const nouveauCategorie = document.getElementById("editCategorie").value;

  console.log(nouveauPrix);
  if (nouveauNom.trim() === "" || nouveauCategorie.trim() === "") {
    alert("Le nom et la categorie ne peuvent pas être vides !");
    return;
  }

  if (nouveauPrix <= 0) {
    alert("Le prix doit etre positif");
    return;
  }

  // recuperation et affichage
  console.log({ id, nouveauNom, nouveauPrix, nouveauCategorie });

  // modification de tableau
  const index = produits.findIndex((e) => String(e.id) === String(id));
  if (index !== -1) {
    produits[index].nom = nouveauNom;
    produits[index].prix = nouveauPrix;
    produits[index].categorie = nouveauCategorie;

    initTableau();
    // cacher la formulaire
    annulerEdition();
    afficherMessageSucces("🎉 Le produit a bien été Modifié !");
  }
};

const supprimerEtudiant = (id) => {
  produits = produits.filter((e) => String(e.id) !== String(id));

  const editIdField = document.getElementById("editId");
  if (editIdField && editIdField.value === String(id)) {
    annulerEdition();
  }
  initTableau();
  afficherMessageSucces("🎉 Le produit a bien été supprimé !");
};

const afficherMessageSucces = (message) => {
  const toast = document.getElementById("toast");

  if (toast) {
    // 1. On peut personnaliser le texte dynamiquement si on veut
    toast.textContent = message || "Produit ajouté avec succès !";

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
};

const trierParPrix = () => {
  triCroissant = !triCroissant;

  const prixMax = document.getElementById("searchPrix").value;
  const categorieSelectionnee =
    document.getElementById("searchCategorie").value;

  // On crée la liste correspondante aux filtres actuels
  let listeATrier = produits.filter((prod) => {
    const matchPrix =
      prixMax === "" || parseFloat(prod.prix) <= parseFloat(prixMax);
    const matchCategorie =
      categorieSelectionnee === "" || prod.categorie === categorieSelectionnee;
    return matchPrix && matchCategorie;
  });

  // On trie cette liste spécifique
  listeATrier.sort((a, b) => {
    return triCroissant ? a.prix - b.prix : b.prix - a.prix;
  });

  // On affiche le résultat
  initTableau(listeATrier);
  reglerIconeTri();
};

const reglerIconeTri = () => {
  const icone = document.getElementById("iconeTri");
  if (icone) {
    icone.textContent = triCroissant ? "🔼" : "🔽";
  }
};

const filtrerProduits = () => {
  const prixMax = document.getElementById("searchPrix").value;
  const categorieSelectionnee =
    document.getElementById("searchCategorie").value;

  const produitsFiltres = produits.filter((prod) => {
    const matchPrix =
      prixMax === "" || parseFloat(prod.prix) <= parseFloat(prixMax);

    const matchCategorie =
      categorieSelectionnee === "" || prod.categorie === categorieSelectionnee;

    return matchPrix && matchCategorie;
  });
  // On réutilise TA fonction d'affichage du tableau en lui passant la liste filtrée !
  initTableau(produitsFiltres);
};
initTableau();
lancerListeDeroulante("searchCategorie");
lancerListeDeroulante("inputCategorie");
