let panier = [];

function ajouterAuPanier(nom, prix) {
  panier.push({ nom, prix });
  afficherNotification(`${nom} a été ajouté au panier ✅`);
  afficherPanier(); // Affiche le panier avec animation
}

function afficherPanier() {
  const panierDiv = document.getElementById("panier");
  const liste = document.getElementById("liste-panier");

  // ✅ Appliquer l'animation
  panierDiv.classList.add("visible");

  liste.innerHTML = "";

  panier.forEach((article, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      ${article.nom} - ${article.prix} FCFA 
      <button onclick="supprimerDuPanier(${index})">❌</button>
    `;
    liste.appendChild(item);
  });

  const total = panier.reduce((somme, article) => somme + article.prix, 0);
  const totalEl = document.createElement("p");
  totalEl.innerHTML = `<strong>Total :</strong> ${total} FCFA`;
  liste.appendChild(totalEl);
}
function supprimerDuPanier(index) {
  panier.splice(index, 1);
  afficherPanier();
}

// ✅ Validation commande vers WhatsApp
document.getElementById("form-commande").addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = document.getElementById("nom-commande").value.trim();
  const email = document.getElementById("email-commande").value.trim();
  const tel = document.getElementById("telephone").value.trim();
  const loc = document.getElementById("localisation").value.trim();

  // ✅ Vérifier que les champs sont remplis
  if (!nom || !email || !tel || !loc) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  if (panier.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  // ✅ Construction du message WhatsApp
  let message = `Nouvelle commande :\n`;
  message += `👤 Nom : ${nom}\n📧 Email : ${email}\n📞 Téléphone : ${tel}\n📍 Localisation : ${loc}\n🛒 Articles :\n`;

  panier.forEach((a) => {
    message += `- ${a.nom} : ${a.prix} FCFA\n`;
  });

  const numeroWhatsApp = "2250719410086";
  const lien = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;

  window.open(lien, "_blank");

  panier = [];
  this.reset();
  document.getElementById("liste-panier").innerHTML = "";
  alert("Commande envoyée avec succès sur WhatsApp !");
});

// ✅ Formulaire de contact vers WhatsApp
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = document.getElementById("nom-contact").value.trim();
  const email = document.getElementById("email-contact").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!nom || !email || !message) {
    alert("Veuillez remplir tous les champs du formulaire de contact.");
    return;
  }

  const numero = "2250719410086";
  const texte = `Nom : ${nom}\nEmail : ${email}\nMessage : ${message}`;
  const lienWhatsApp = `https://wa.me/${numero}?text=${encodeURIComponent(texte)}`;

  window.open(lienWhatsApp, "_blank");
  this.reset();
});
function afficherNotification(message) {
  const notif = document.getElementById("notif-panier");
  notif.textContent = message;
  notif.classList.add("active");

  // Retirer après 3 secondes
  setTimeout(() => {
    notif.classList.remove("active");
  }, 3000);
}