# My Social Network's roadmap

+ Composant TextInput
+ Composant PasswordInput
+ Composant DatePicker
+ Composant Select
+ Composant Button
+ Composant Card
+ Fix: focus disabled when clicking icons in TextInput
+ Template page d'accueil: Formulaire d'inscription
+ - Prénom, nom, numéro de téléphone ou email, mot de passe, date de naissance
+ Template page d'accueil: Formulaire de connexion
+ - Numéro de téléphone ou email, mot de passe

+ Ajouter des icônes sur les boutons
+ Composant Toaster
+ Animations whileTaping sur le bouton et l'input
+ Composant Overlay
+ - Relier le Select à l'Overlay
+ Création d'une page /login (ne contient que le formulaire de connexion)
+ Création d'une page /register (ne contient que le formulaire d'inscription)
+ Composant Header: titre, bouton d'inscription et de connexion
+ Création d'une page /about
+ - Implémenter le composant Header
+ Composant Footer: Selection de langue, liens vers page de connexion, inscription et about

- Fix: Overlay s'adapte au conteneur parent
- Fix: Select se place sur l'input
+ Composant Modal
+ Composant TextArea
+ Composant Avatar
+ Création d'une page /home
+ - Card "What's on your mind" clicable
+ - Composant PublishModal: formulaire avec TextArea + Bouton Publier
+ - Lors du clic, ouverture d'une PublishModal
+ - Affichage des posts de la base de donnée sur la page home
+ Composant Post:
+ - Affiche l'auteur, la date, le contenu du post, Buttons liker et commenter
+ - Composant ActionIcon
+ - Composant Dropdown
+ - Lors du clic sur un post, affichage des commentaires
+ - Si il s'agit d'un clic de l'auteur, ajouter des boutons de suppression ou d'édition
+ - Gestion du clic sur un like
+ Composant Comment:
+ - Affiche l'auteur, la date, le contenu du commentaire, Buttons liker et répondre
- Création d'une page /post qui affiche un post spécifique (pour pouvoir le partager)

- Création d'une page /profile
- - Avatar, description, adresse (pays, ville), date de création du compte, nombre de publications
- - Afficher les posts créés par l'utilisateur
- - Possibilité de modifier ces informations si l'utilisateur est sur son profil

- - Bouton "Follow" / "Unfollow"
- Sur la page /profile, afficher la liste des followers, le nombre de followers et le nombre de profils suivis
- Sur la page /home, afficher la liste des publications des personnes suivies

- Création d'une page /notifications
- - Affiche les notifications non lues, supprime de la base les notifications déjà lues

- Composant Pin
- Composant UserLayout
- - Afficher un menu avec les liens "Home", "Notifications", "Profile"
- - Sur les notifications ajouter un Pin avec le nombre de notifications non lues

- Création d'une page /messages

- Fix comportement du composant DatePicker : passage du 31 Aug -> 3 Mar quand on selectionne Feb 
