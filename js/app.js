let resultatCodePostal = document.getElementById("resultatDepartement")
const selectionVilles = document.getElementById("selection")
var zoneCodePostal = document.getElementById("zoneCodePostal");
var str = ""
var verifCaractere
console.log(str);
zoneCodePostal.addEventListener("input", recherche);

function recherche(valeur){
    verifCaractere = valeur.target.value
    if (verifChiffre(verifCaractere.charCodeAt(verifCaractere.length -1)) == false){
        var suprime =  zoneCodePostal.value.replace(/[^0-9\.]/g,'');
        zoneCodePostal.value =  suprime.replace(/\./g,'');
    }
    else {
        str = verifCaractere
        if (str.length == 5){
            afficheVille()
        }
    }
    console.log(str.length)
}

function verifChiffre(chiffre){
    if (chiffre >= 48 && chiffre <= 57){
        return true
    }
    return false
}

function afficheVille(){
    fetch('https://geo.api.gouv.fr/communes?codePostal='+ parseInt(str))
    .then(reponse => {
    if(!reponse.ok){
        throw new Error("Network response was not ok");
    }
        return reponse.json();
    })
    .then(data => {
        selectionVilles.innerHTML = ""
        console.log(data)
        for (i = 0; i < data.length; i++) {
            selectionVilles.innerHTML += "<button>" + data[i].nom +"</button>"
        }
        if(data.length == 0){
            alert("Attention le code postale n'existe pas")
        }
    })
    .catch(error => {
        console.log(10)
        alert("Attention le code postale n'existe pas")
    });
}