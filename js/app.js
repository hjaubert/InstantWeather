let resultatCodePostal = document.getElementById("resultatCodePostal")
let resultatmeteoLatitude = document.getElementById("resultatmeteoLatitude")
let resultatmeteoLontitude = document.getElementById("resultatmeteoLontitude")
var zoneCodePostal = document.getElementById("zoneCodePostal");
var str = ""
var verifCaractere


const token = "7098b091691f53b4ba9f102d5c8a5018c423a36c5eb9e5d061bcfc050d3b0e8b"
let codeInsee

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
            getInsee()
            afficheMeteo()
        }
        else{
            resultatCodePostal.innerText = "resultat :"
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
        console.log(data);
        resultatCodePostal.innerText = resultatCodePostal.textContent + ' ' + data[0].nom;
    })
    .catch(error => {
        alert("Attention le code postale n'existe pas")
    });
}

function getInsee(){
    fetch("https://api.meteo-concept.com/api/location/cities?token=" + token + "&search=" + parseInt(str))
    .then(reponse => {
    if(!reponse.ok){
        throw new Error("Network response was not ok");
    }
        return reponse.json();
    })
    .then(data => {
        codeInsee = data.cities[0].insee
    })
    .catch(error => {
        alert("Attention insee bug")
    });
}

function afficheMeteo(){
    fetch("https://api.meteo-concept.com/api/forecast-day/1?token=" + token + "&insee=" + parseInt(codeInsee))
    .then(reponse => {
    if(!reponse.ok){
        throw new Error("Network response was not ok");
    }
        return reponse.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        alert("Attention meteo bug")
    });
}