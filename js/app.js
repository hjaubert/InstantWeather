const TypeCarte = {
    TMin: "T° Min",
    TMax: "T° Max",
    Ensoleillement: "Ensoleillement",
    ProbaPluie: "Proba pluie"
}

var latitude = false;
var longitude = false;
var cumulPlui = false;
var moyVent = false;
var directionVent = false;
var nbjour = 1;



const selectionVilles = document.getElementById("selection")
var zoneCodePostal = document.getElementById("zoneCodePostal");
var str = ""
var verifCaractere
let villeChoisie

const token = "71f59f4e95789089e978421273a728812bbff1652370a69215bd899c8e1ec117"
let codeInsee

let body = document.body;
let fond = document.getElementById("fond")
let resultatmeteoLatitude = document.getElementById("resultatmeteoLatitude")
let resultatmeteoLontitude = document.getElementById("resultatmeteoLontitude")
let tempMax = document.getElementById("tempMax")
let tempMin = document.getElementById("tempMin")
let probaPluie = document.getElementById("probaPluie")
let nbHensoleillement = document.getElementById("nbHensoleillement")
let afficheCartes = document.getElementById("listeCarte")
let afficheCartesV2 = document.getElementById("listeCarteV2")
let titreVille = document.getElementById("titreVille")

let choixJour = document.getElementById("choixJour")
let afficheJour = document.getElementById("afficheJour")
let changeLatitude = document.getElementById("changeLatitude")
let changeLongitude = document.getElementById("changeLongitude")
let changeCumulPluie = document.getElementById("changeCumulPluie")
let changeVentMoyen = document.getElementById("changeVentMoyen")
let changeDirectionVent = document.getElementById("changeDirectionVent")
let bouttonValide = document.getElementById("bouttonValide")
bouttonValide.addEventListener("click", changeOption);
let bouttonAnnule = document.getElementById("bouttonAnnule")
bouttonAnnule.addEventListener("click", afficheParamere);
let bouttonParametre = document.getElementById("bouttonParametre")
bouttonParametre.addEventListener("click", chargeParametre);
let copieChoixJour = afficheJour.textContent

function actualisetextJour(){
    afficheJour.innerText = copieChoixJour
    afficheJour.innerText = afficheJour.textContent + choixJour.value
}

function changeOption(){
    window.localStorage.setItem("ValeurLatitude",changeLatitude.checked ) 
    window.localStorage.setItem("ValeurLongitude",changeLongitude.checked )
    window.localStorage.setItem("ValeurCumulPluie",changeCumulPluie.checked )
    window.localStorage.setItem("ValeuVentMoyen",changeVentMoyen.checked )
    window.localStorage.setItem("ValeurDirectionVent",changeDirectionVent.checked )
    window.localStorage.setItem("ValeurJour",choixJour.value )
    chargeVariableLocal()
}

function chargeParametre(){
    if (window.localStorage.getItem("ValeurLatitude") == null){
        window.localStorage.setItem("ValeurLatitude",false )
        latitude = false
    }
    if (window.localStorage.getItem("ValeurLongitude") == null){
        window.localStorage.setItem("ValeurLongitude",false )
        longitude = false
    }
    if (window.localStorage.getItem("ValeurCumulPluie") == null){
        window.localStorage.setItem("ValeurCumulPluie",false )
        cumulPlui = false
    }
    if (window.localStorage.getItem("ValeuVentMoyen") == null){
        window.localStorage.setItem("ValeuVentMoyen",false )
        moyVent = false
    }
    if (window.localStorage.getItem("ValeurDirectionVent") == null){
        window.localStorage.setItem("ValeurDirectionVent",false )
        directionVent = false
    }
    if (window.localStorage.getItem("ValeurJour") == null){
        window.localStorage.setItem("ValeurJour",1)
        nbjour = 1;
    }
    console.log(window.localStorage.getItem("ValeurJour"))
    changeLatitude.checked = validee(window.localStorage.getItem("ValeurLatitude"))
    changeLongitude.checked = validee(window.localStorage.getItem("ValeurLongitude"))
    changeCumulPluie.checked = validee(window.localStorage.getItem("ValeurCumulPluie"))
    changeVentMoyen.checked = validee(window.localStorage.getItem("ValeuVentMoyen"))
    changeDirectionVent.checked = validee(window.localStorage.getItem("ValeurDirectionVent"))
    choixJour.value = window.localStorage.getItem("ValeurJour")
    chargeVariableLocal()
}

function chargeVariableLocal(){
    latitude = validee(window.localStorage.getItem("ValeurLatitude"))
    longitude = validee(window.localStorage.getItem("ValeurLongitude"))
    cumulPlui = validee(window.localStorage.getItem("ValeurCumulPluie"))
    moyVent = validee(window.localStorage.getItem("ValeuVentMoyen"))
    directionVent = validee(window.localStorage.getItem("ValeurDirectionVent"))
    nbjour =  window.localStorage.getItem("ValeurJour")
}

function afficheParamere(){
    alert("a faire")
}

function validee(valeur){
    if (valeur == "true"){
        return true
    }
    return false
}

function changementFond(weatherCode){

    const valeurSoleil = [0,1,2]
    const valeurNuageux = [3,4,5]
    const valeurPluie = [10,11,12,13,14,15,16,30,31,32,40,41,42,43,44,45,46,47,48,70,71,72,73,74,75,76,77,78,
        140,141,210,211,212]
    const valeurNeige = [20,21,22,60,61,62,63,64,65,66,67,68,142,220,221,222,230,231,232,233,234,235]
    const valeurOrage = [100,101,102,103,104,105,106,107,108,120,121,122,123,124,125,126,127,128,130,131,132,133,
        134,135,136,137,138]

    if(valeurSoleil.includes(weatherCode)){
        body.classList.remove("fondNuage")
        body.classList.remove("fondPluie")
        body.classList.remove("fondNeige")
        body.classList.remove("fondOrage")
        body.classList.remove("couleurPluie")
        snow.init(0)
        body.classList.add("fondSoleil")
    }

    if(valeurNuageux.includes(weatherCode)){
        body.classList.remove("fondSoleil")
        body.classList.remove("fondPluie")
        body.classList.remove("fondNeige")
        body.classList.remove("fondOrage")
        body.classList.remove("couleurPluie")
        snow.init(0)
        body.classList.add("fondNuage")
    }

    if(valeurPluie.includes(weatherCode)){
        body.classList.remove("fondSoleil")
        body.classList.remove("fondNuage")
        body.classList.remove("fondNeige")
        body.classList.remove("fondOrage")
        snow.init(0)
        body.classList.add("couleurPluie")
        body.classList.add("fondPluie")
    }

    if(valeurNeige.includes(weatherCode)){
        body.classList.remove("fondSoleil")
        body.classList.remove("fondPluie")
        body.classList.remove("fondNuage")
        body.classList.remove("fondOrage")
        body.classList.remove("couleurPluie")
        snow.init(0)
        body.classList.add("fondNeige")
        snow.init(10);
    }

    if(valeurOrage.includes(weatherCode)){
        body.classList.remove("fondSoleil")
        body.classList.remove("fondPluie")
        body.classList.remove("fondNuage")
        body.classList.remove("fondNuage")
        body.classList.remove("couleurPluie")
        snow.init(0)
        body.classList.add("fondOrage")
    }

}

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
                zoneCodePostal.value = "";
                selectionVilles.innerHTML = "";
                afficheCartes.innerHTML = "";
                afficheCartesV2.innerHTML = "";
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
    } else {
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

        let p = clone.querySelectorAll("p")
        p[0].textContent = data.forecast[i].sun_hours + " h"
        p[1].textContent = data.forecast[i].tmax + " °C"
        p[2].textContent = data.forecast[i].tmin + " °C"
        p[3].textContent = data.forecast[i].probarain + " %"

        let span = clone.querySelectorAll("span")

        if(cumulPlui == true){
            span[4].classList.add("fa-solid", "fa-vial")
            p[4].textContent = data.forecast[i].rr10 + " mm"
        }

        if(moyVent == true){
            span[5].classList.add("fa-solid", "fa-wind")
            p[5].textContent = data.forecast[i].wind10m + " km/h"
        }

        if(directionVent == true){
            span[6].classList.add("fa-solid", "fa-compass")
            p[6].textContent = data.forecast[i].dirwind10m + " °"
        }
        
        divCarte.appendChild(clone)
    }
}

var snow = {

    vent : 0,
    etendueXmax : 100,
    etendueXmin : 10,
    vitesseMax : 2,
    vitesseMin : 1,
    couleur : "#fff",
    caractere : "*",
    tailleMax : 20,
    tailleMin : 8,

    flocons : [],
    LARGEUR : 0,
    TAILLE : 0,

    init : function(nb){
        var o = this,
            frag = document.createDocumentFragment();
        o.getSize();

        

        for(var i = 0; i < nb; i++){
            var flocon = {
                x : o.random(o.LARGEUR),
                y : - o.tailleMax,
                etendueX : o.etendueXmin + o.random(o.etendueXmax - o.etendueXmin),
                vitesseY : o.vitesseMin + o.random(o.vitesseMax - o.vitesseMin, 100),
                vie : 0,
                taille : o.tailleMin + o.random(o.tailleMax - o.tailleMin),
                html : document.createElement("span")
            };

            flocon.html.style.position = "absolute";
            flocon.html.style.top = flocon.y + "px";
            flocon.html.style.left = flocon.x + "px";
            flocon.html.style.fontSize = flocon.taille + "px";
            flocon.html.style.color = o.couleur;
            flocon.html.appendChild(document.createTextNode(o.caractere));

            frag.appendChild(flocon.html);
            o.flocons.push(flocon);
        }

        document.body.appendChild(frag);
        o.animate();
        
        window.onresize = function(){o.getSize();};
    },

    animate : function(){
        var o = this;
        for(var i = 0, c = o.flocons.length; i < c; i++){
            var flocon = o.flocons[i],
                haut = flocon.y + flocon.vitesseY,
                gauche = flocon.x + Math.sin(flocon.vie) * flocon.etendueX + o.vent;
            if(haut < o.TAILLE - flocon.taille - 10 && gauche < o.LARGEUR - flocon.taille && gauche > 0){
                flocon.html.style.top = haut + "px";
                flocon.html.style.left = gauche + "px";
                flocon.y = haut;
                flocon.x += o.vent;
                flocon.vie+= .01;
            }
            else {
                flocon.html.style.top = -o.tailleMax + "px";
                flocon.x = o.random(o.LARGEUR);
                flocon.y = -o.tailleMax;
                flocon.html.style.left = flocon.x + "px";
                flocon.vie = 0;
            }
        }
        setTimeout(function(){
            o.animate();
        },20);
    },

    random : function(range, num){
        var num = num?num:1;
        return Math.floor(Math.random() * (range + 1) * num) / num;
    },

    getSize : function(){
        this.LARGEUR = document.body.clientWidth || window.innerWidth;
        this.TAILLE = document.body.clientHeight || window.innerHeight;
    }

};
