const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialisation du client avec sauvegarde de session locale
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Obligatoire pour les serveurs Linux comme Render
    }
});

// Génération du QR Code dans les logs du serveur pour la première connexion
client.on('qr', (qr) => {
    console.log('--- SCANNEZ CE QR CODE AVEC VOTRE TÉLÉPHONE ---');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('🚀 Le support Go Buznes WhatsApp est en ligne et opérationnel !');
});

// Logique des réponses automatiques
client.on('message', async msg => {
    const texte = msg.body.toLowerCase().trim();

    // Réponse aux salutations
    if (texte.includes('bonjour') || texte.includes('salut') || texte.includes('mambo')) {
        msg.reply('👋 Jambo ! Bienvenue sur le support automatique de Go Buznes Goma.\n\n🤖 Je suis le robot d\'assistance. Tapez le numéro de votre choix :\n1️⃣ Je suis Acheteur (Trouver un produit/boutique)\n2️⃣ Je suis Vendeur (Abonnement et Tableau de bord)\n3️⃣ Parler à un conseiller humain');
    } 
    // Menu Acheteur
    else if (texte === '1') {
        msg.reply('🛍️ *Espace Acheteur*\n\nPour découvrir les meilleures offres de Goma sans installer d\'application lourde, ouvrez simplement notre lien officiel :\n🔗 https://gogamenetiqui.github.io/Go-Buznes/home.html\n\nVous pouvez l\'ajouter à votre écran d\'accueil via le menu de votre navigateur !');
    } 
    // Menu Vendeur
    else if (texte === '2') {
        msg.reply('🏪 *Espace Vendeur*\n\nVous souhaitez booster vos ventes à Goma ?\n1. Rendez-vous sur notre site.\n2. Cliquez sur l\'onglet *Vendre* pour configurer votre catalogue.\n\nPour activer ou renouveler votre abonnement mensuel, veuillez envoyer votre preuve de paiement ou votre demande ici, un agent va la valider.');
    } 
    // Option Humain
    else if (texte === '3') {
        msg.reply('⏳ Un conseiller humain de Go Buznes a été notifié. Il prendra le relais dès qu\'il sera connecté. Merci pour votre patience !');
    }
});

client.initialize();
