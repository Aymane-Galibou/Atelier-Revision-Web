const additionner = (a, b) => a + b;
const multiplier = (a, b) => a * b;

const calculate = (type) => {
    const inputA = document.getElementById("inputA");
    const inputB = document.getElementById("inputB");
    const resultDiv = document.getElementById("resultats");

    // S'assurer que les éléments existent bien dans la page
    if (inputA && inputB && resultDiv) {
        
    // verifier les champs
        if (inputA.value === "" || inputB.value === "") {
            resultDiv.innerHTML = "⚠️ Veuillez remplir les deux champs";
            return;
        }

        const valA = Number(inputA.value);
        const valB = Number(inputB.value);
        let finalValue = 0;

        // Utilisation de tes paramètres (1 pour addition, 2 pour multiplication)
        if (type === 1) {
            finalValue = additionner(valA, valB);
        } else if (type === 2) {
            finalValue = multiplier(valA, valB);
        }
        // Insertion du résultat final
        resultDiv.innerHTML = finalValue  
     }
}

