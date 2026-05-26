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

        const nom=inputNom.value 
        const prenom = inputPrenom.value
        if(id.trim() === ""|| prenom.trim()==="" || nom.trim()===""){
            alert("Veuillez Remplire tous le champs");
            return;
        }
        const nouvelEtudiant=new Etudiant(id,nom,prenom)
        console.log(nouvelEtudiant)

        etudiants.push(nouvelEtudiant);

        initTableau()
        // nettoyons la forme
        inputId.value="";
        inputNom.value="";
        inputPrenom.value="";
    }


}

const chargerEtudiant = (id) => {
    const etudiant = etudiants.find((e) => String(e.id) === String(id))

    if (etudiant) {
        document.getElementById("editId").value = etudiant.id
        document.getElementById("editNom").value = etudiant.nom
        document.getElementById("editPrenom").value = etudiant.prenom
        
        const editForm=document.getElementById("editFormContainer")
        editForm.classList.remove("hidden")
    }
}

const sauvegarderModification=()=>{
    const id = document.getElementById("editId").value;
    const nouveauNom = document.getElementById("editNom").value;
    const nouveauPrenom = document.getElementById("editPrenom").value;
    
    if (nouveauNom.trim() === "" || nouveauPrenom.trim() === "") {
        alert("Le nom et le prénom ne peuvent pas être vides !");
        return; 
    }
    
    // recuperation et affichage
    console.log({id,nouveauNom,nouveauPrenom})

    // modification de tableau
    const index=etudiants.findIndex(e => String(e.id) === String(id))
    if(index !== -1){
        etudiants[index].nom=nouveauNom;
        etudiants[index].prenom=nouveauPrenom;

        initTableau();
        // cacher la formulaire 
        annulerEdition();

    }
}

const supprimerEtudiant=(id)=>{
    etudiants=etudiants.filter(e=>String(e.id) !== String(id))

    const editIdField=document.getElementById("editId")
    if(editIdField && editIdField.value===String(id)){
        annulerEdition();
    }
    initTableau();

}
initTableau()
