# My Social Network's roadmap

- Fix: Overlay s'adapte au conteneur parent
- Fix: Select se place sur l'input
- Création d'une page /post qui affiche un post spécifique (pour pouvoir le partager)

+ Création d'une page /profile
+ - Avatar, description, adresse (pays, ville), date de création du compte, nombre de publications
+ - Afficher les posts créés par l'utilisateur
- - Possibilité de modifier ces informations si l'utilisateur est sur son profil
+ - Possibilité de rediriger sur la page profile/ lors du clic sur un nom d'utilisateur d'un post


+ - Bouton "Follow" / "Unfollow"
+ Sur la page /profile, afficher la liste des followers, le nombre de followers et le nombre de profils suivis
- Sur la page /home, afficher la liste des publications des personnes suivies

- Création d'une page /notifications
- - Affiche les notifications non lues, supprime de la base les notifications déjà lues

+ Composant Pin
+ Composant Drawer
- Composant UserLayout
- - Afficher un menu avec les liens "Home", "Notifications", "Profile"
- - Sur les notifications ajouter un Pin avec le nombre de notifications non lues

+ Envoyer un message depuis la page profil
- Création d'une page /messages

- Fix comportement du composant DatePicker : passage du 31 Aug -> 3 Mar quand on selectionne Feb 

- Sur les posts, ajouter les Tooltip sur les boutons j'aime, les commentaires et le bouton de partage
+ Améliorer le layout du profil

+ Possibilité de publier un commentaire sous un post
- Séparer les responsabilités du composant PostCard
- Gérer l'envoi de champs vides
- Possibilité de supprimer les commentaires (par l'auteur du commentaire)
- Possibilité de supprimer les commentaires (par l'auteur du post)
- Possibilité d'édter les commentaires
- Implémenter le Toaster pour les posts sur /profile
- Implémenter le Toaster pour les messages sur /profile
- Composant Message