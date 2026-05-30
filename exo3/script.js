class Etudiant{
    constructor(id,nom,prenom){
        this.id=id ;
        this.nom=nom;
        this.prenom=prenom;
    }
}
let etudiants=[
    new Etudiant(1,"galibou","aymane"),
    new Etudiant(2,"Mernissi","Reda"),
    new Etudiant(3,"Laanigri","Rachid")
]

const annulerEdition=()=>{
        const editForm=document.getElementById("editFormContainer")
        editForm.classList.add("hidden")
}
const initTableau = () => {
    const tableBody = document.getElementById("table-body");
    
    if (tableBody) {
        let tableContent = "";
        etudiants.forEach((etd) => {
            tableContent += `
                <tr>
                    <td>${etd.id}</td>
                    <td>${etd.nom}</td>
                    <td>${etd.prenom}</td>
                    <td>

                    <button onclick="chargerEtudiant('${etd.id}')" class="btnOp update">editer</button>
                    <button onclick="supprimerEtudiant('${etd.id}')" class="btnOp delete">Supprimer</button>
                    </td>
                
                    </tr>`;
        });

        // Injection sécurisée dans le corps du tableau
        tableBody.innerHTML = tableContent;
    }
};

const ajouterEtudiant=()=>{
    const inputId=document.getElementById("inputId")
    const inputNom=document.getElementById("inputNom")
    const inputPrenom=document.getElementById("inputPrenom")

    //  validation 
    if(inputId && inputNom && inputPrenom){
        const id=inputId.value 

        const index=etudiants.findIndex(e => String(e.id) === String(id))
        if(index !==-1){
            alert("Cet étudiant existe déjà (ID dupliqué) !")
            return 
        }
        // recuperation des valeur des champs
        const nom=inputNom.value 
        const prenom = inputPrenom.value
        // verification des valeurs 
        if(id.trim() === ""|| prenom.trim()==="" || nom.trim()===""){
            alert("Veuillez Remplire tous le champs");
            return;
        }
        // instanciation d'une nouveau etudiant
        const nouvelEtudiant=new Etudiant(id,nom,prenom)
        console.log(nouvelEtudiant)
        // ajoute d'etudiant au tableau
        etudiants.push(nouvelEtudiant);

        // reafichage du tableau 
        initTableau()

        // nettoyage de la forme
        inputId.value="";
        inputNom.value="";
        inputPrenom.value="";
    }
}

const chargerEtudiant = (id) => {
    // pour charger les info d'etudiant sur la formulaire on doit d'abord verifier est ce qu'il existe
    const etudiant = etudiants.find((e) => String(e.id) === String(id))

    // cas d'existence on remplit ses info dans la formulaire (experience d'utlisateur)
    if (etudiant) {
        document.getElementById("editId").value = etudiant.id
        document.getElementById("editNom").value = etudiant.nom
        document.getElementById("editPrenom").value = etudiant.prenom
        
        const editForm=document.getElementById("editFormContainer")
        // on supprime la class hidden dedie a masquer la formulaire
        editForm.classList.remove("hidden")
    }
}

const sauvegarderModification=()=>{
    // on recupere les nouveaux informations de l'etudiant
    const id = document.getElementById("editId").value;
    const nouveauNom = document.getElementById("editNom").value;
    const nouveauPrenom = document.getElementById("editPrenom").value;
    // verification des donnnes comme le cas d'ajout
    if (nouveauNom.trim() === "" || nouveauPrenom.trim() === "") {
        alert("Le nom et le prénom ne peuvent pas être vides !");
        return; 
    }
    
    // recuperation et affichage
    console.log({id,nouveauNom,nouveauPrenom})

    // modification du tableau
    const index=etudiants.findIndex(e => String(e.id) === String(id))
    if(index !== -1){
        etudiants[index].nom=nouveauNom;
        etudiants[index].prenom=nouveauPrenom;

    // reaffichage du tableau pour afficher les nouveau mis a jour
        initTableau();
        // cacher la formulaire 
        annulerEdition();
    }
}

const supprimerEtudiant=(id)=>{
    // on cherche d'abord l'etudiant qu'on souhaite supprimer
    etudiants=etudiants.filter(e=>String(e.id) !== String(id))

    // on doit verifier est ce que la formulaire de modification est ouvert
    const editIdField=document.getElementById("editId")
    // pour eviter la modificatio et la suppression a la fois 
    if(editIdField && editIdField.value===String(id)){
        annulerEdition();
    }
    // reaffichage du tableau pour afficher les nouveau mis a jour
    initTableau();

}
initTableau()
