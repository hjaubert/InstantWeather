const TypeCarte = {
    TMin: "T° Min",
    TMax: "T° Max",
    Ensoleillement: "Ensoleillement",
    ProbaPluie: "Proba pluie"
}

var latitude = false;
var longitude = false;
var cumulPlui = true;
var moyVent = true;
var directionVent = true;
var nbjour = 7;



const selectionVilles = document.getElementById("selection")
var zoneCodePostal = document.getElementById("zoneCodePostal");
var str = ""
var verifCaractere
let villeChoisie

const token = "71f59f4e95789089e978421273a728812bbff1652370a69215bd899c8e1ec117"

let afficheCartes = document.getElementById("listeCarte")
let titreVille = document.getElementById("titreVille")

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
        if(data.length <= 0){   
            alert("Attention le code postale n'existe pas")
        }
        data.forEach((commune) => {
            if(commune.nom.includes("'")){
                selectionVilles.innerHTML += "<button class='villeChoisie' value= " + commune.code + " >" + commune.nom + "</button>";
            } else {
                selectionVilles.innerHTML += "<button class='villeChoisie' value= '" + commune.code + "' >" + commune.nom + "</button>";
            }
        })

        villeChoisie = document.querySelectorAll(".villeChoisie");

        villeChoisie.forEach((bouton) => {
            bouton.addEventListener('click', () => {
                selectionVilles.innerHTML = "";
                afficheCartes.innerHTML = "";
                titreVille.innerText = "";
                titreVille.innerText = bouton.textContent
                afficheMeteo(bouton.value)
            });
        });
    });
}

function afficheMeteo(code){
    fetch("https://api.meteo-concept.com/api/forecast/daily?token=" + token + "&insee=" + code)
    .then(reponse => {
    if(!reponse.ok){
        throw new Error("Network response was not ok");
    }
        return reponse.json();
    })
    .then(data => {
        creationCarte(data)
    })
    .catch(error => {
        alert("Attention meteo bug")
    });
}

function creationCarte(data){
    if(nbjour == 1){
        creationCarteV1(TypeCarte.Ensoleillement,data.forecast[0].sun_hours)
        creationCarteV1(TypeCarte.TMax,data.forecast[0].tmax)
        creationCarteV1(TypeCarte.TMin,data.forecast[0].tmin)
        creationCarteV1(TypeCarte.ProbaPluie,data.forecast[0].probarain)
    }else {
        creationCarteV2(data);
    }
}

function creationCarteV1(TypeCarte, valeur){
    const template = document.getElementById("templateCarte")
    let clone = document.importNode(template.content, true)

    let span = clone.querySelector('span')


    let h2 = clone.querySelectorAll("h2")
    let h3 = clone.querySelectorAll("h3")
    

    switch (TypeCarte) {
        case "Ensoleillement":
            span.classList.add("fa-regular", "fa-sun")
            h2[0].textContent = TypeCarte
            h3[0].textContent = valeur + " h" 
            break;
        
            
        case "T° Min":
            span.classList.add("fa-solid", "fa-temperature-low")
            h2[0].textContent = TypeCarte
            h3[0].textContent = valeur + " °C"
            break;
        
        case "T° Max":
            span.classList.add("fa-solid", "fa-temperature-high")
            h2[0].textContent = TypeCarte
            h3[0].textContent = valeur + " °C"
            break;
    
        case "Proba pluie":
            span.classList.add("fa-solid", "fa-cloud-rain")
            h2[0].textContent = TypeCarte
            h3[0].textContent = valeur + " %"
            break;
    }

    let divCarte = document.querySelector("#listeCarte")
    divCarte.appendChild(clone)

}

const jours=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
var date = new Date()

function creationCarteV2(data){

    for (let i = 0; i < nbjour; i++){
        let divCarte = document.querySelector("#listeCarteV2")
        const template = document.getElementById("templateCarteV2")
        let clone = document.importNode(template.content, true)
    
        let h4 = clone.querySelectorAll("h4")
        if(i == 0){
            h4[0].textContent = "Aujourd'hui"
        }else {
            h4[0].textContent = jours[(date.getDay() + i)%7]            
        }

        let h3 = clone.querySelectorAll("h3")
        h3[0].textContent = data.forecast[i].sun_hours + " h"
        h3[1].textContent = data.forecast[i].tmax + " °C"
        h3[2].textContent = data.forecast[i].tmin + " °C"
        h3[3].textContent = data.forecast[i].probarain + " %"

        let span = clone.querySelectorAll("span")

        if(cumulPlui == true){
            span[4].classList.add("fa-solid", "fa-vial")
            h3[4].textContent = data.forecast[i].rr10 + " mm"
        }

        if(moyVent == true){
            span[5].classList.add("fa-solid", "fa-wind")
            h3[5].textContent = data.forecast[i].wind10m + " km/h"
        }

        if(directionVent == true){
            span[6].classList.add("fa-solid", "fa-compass")
            h3[6].textContent = data.forecast[i].dirwind10m + " °"
        }
        
        divCarte.appendChild(clone)
    }
}