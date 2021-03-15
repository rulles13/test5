let totalPanier = 0;

/* ---- test if local storage exist ----- */
if(localStorage.getItem("panierOrinoco")){
    
    // Lecture du Local Storage
    var panier_json = localStorage.getItem("panierOrinoco");
    var panier = JSON.parse(panier_json);
    console.log("le panier existe");
        
    //first ligne table
    let monPanier = document.getElementById("monPanier");    
    monPanier.innerHTML="<tr> <td>Appareil</td> <td>optique</td> <td>prix</td><td>Quantité</td></tr>"
            

    //article ligne table
    for (let i in panier){
        const tr = document.createElement("tr");
        monPanier.appendChild(tr);

        const tdAppareil = document.createElement("td");
        tdAppareil.textContent = panier[i].name;
        tr.appendChild(tdAppareil);

        const tdOptique = document.createElement("td");
        tdOptique.textContent = panier[i].lens;
        tr.appendChild(tdOptique);

        const tdPrice = document.createElement("td");
        tdPrice.textContent = panier[i].price/100;
        tr.appendChild(tdPrice);

        const tdQuantity = document.createElement("td");
        tdQuantity.textContent = 1;
        tr.appendChild(tdQuantity); 
    }  
    console.log(panier);

    let idArray = panier.map(camera => camera.id) //creation d'un tableau simplifié pour POST
    console.log(idArray);
//to do: calculate total
    for (let i in panier){
    totalPanier += panier[i].price/100;

    console.log(panier[i].price/100);
    }
    const total = document.getElementById("totalPanier");
    total.textContent ="Le total de votre panier est: " + totalPanier + " €";

}

/* ----- if local storage don't exist ----- */
else{
console.log("Il n'ya pas d'article dans le panier");
} 

/***********************************/
/*           Formulaire            */
/***********************************/

// objet : formulaire + tableau de produit

const commande = {
    contact: {},
    products: [],
}

document.getElementById("formulaire").addEventListener("submit", function (envoi){
    envoi.preventDefault();//

    //Avant d'envoyer un formulaire, vérification que le panier n'est pas vide.
    if (panier.length == 0){
        alert("Attention, votre panier est vide.");
    }
    else {
        //Récupération des champs
        let nomForm = document.getElementById("Nomform").value;
        let prenomForm = document.getElementById("Prénom").value;
        let emailForm = document.getElementById("Email").value;
        let adresseForm = document.getElementById("Adresse").value;
        let villeForm = document.getElementById("Ville").value;
        let codePostalForm = document.getElementById("Codepostal").value;

        //Création de l'objet formulaireObjet
        commande.contact = {
            firstName: prenomForm,
            lastName: nomForm,  
            address: adresseForm,
            city: villeForm,
            email: emailForm,
        }    
        
        //Création du tableau des articles
        panier.forEach(articlePanier =>
            commandeUser.products.push(articlePanier._id)
        )

        //Envoi des données récupérées
        const optionsFetch = {
            headers:{
                'Content-Type': 'application/json',
            },
            method:"POST",
            body: JSON.stringify(commandeUser),         
        }     

        fetch(urlOrder, optionsFetch).then(function(response) {
            response.json().then(function(text) {
              console.log(text.orderId);
              window.location = `./confirmation.html?id=${text.orderId}&name=${prenomForm}&prix=${total}`
            });
        });
        localStorage.clear()       
    }
})