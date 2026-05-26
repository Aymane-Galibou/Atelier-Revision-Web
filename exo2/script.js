class Calculate {
  addition = (a, b) => a + b;
  multiplication = (a, b) => a * b;
  division = (a, b) => (b != 0 ? a / b : "Division Impossible");
  soustraction = (a, b) => a - b;
}

const calc = new Calculate();
const calculate = () => {
  const inputA = document.getElementById("inputA");
  const inputB = document.getElementById("inputB");
  const inputOp = document.getElementById("inputOp");

  const resultDiv = document.getElementById("resultats");

  // S'assurer que les éléments existent bien dans la page
  if (inputA && inputB && resultDiv && inputOp) {
    // verifier les champs
    if (inputA.value === "" || inputB.value === "" || inputOp.value == "") {
      resultDiv.innerHTML = "⚠️ Veuillez remplir les deux champs";
      return;
    }

    const valA = Number(inputA.value);
    const valB = Number(inputB.value);
    const op = inputOp.value;
    let finalValue = 0;

    switch (op) {
      case "1":
        finalValue = calc.addition(valA, valB);
        break;
      case "2":
        finalValue = calc.soustraction(valA, valB);
        break;
      case "3":
        finalValue = calc.multiplication(valA, valB);
        break;
      case "4":
        finalValue = calc.division(valA, valB);
        break;
      default:
        finalValue = calc.addition(valA, valB);
    }

    // Insertion du résultat final
    resultDiv.innerHTML = finalValue;
  }
};
