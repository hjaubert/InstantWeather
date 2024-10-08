let resultatDepartement = document.getElementById("resultatDepartement")
const zoneCodePostal = document.getElementById("zoneCodePostal");
var str = "";
console.log(str);
zoneCodePostal.addEventListener("input", recherche);

function recherche(valeur){
    str = valeur.target.value;
    console.log(str.length);
    if (str.length == 5){
        afficheVille()
    }
    else{
        resultatDepartement.innerText = "resultat :"
    }
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
        resultatDepartement.innerText = resultatDepartement.textContent + ' ' + data[0].nom;
    })
    .catch(error => {
        console.error("il y a un probleme")
    });
}