# WEB AVANCÉ - ÉVALUATION

L’évaluation se porte sous la forme d’une projet à mettre en place. Comme vous avez pu le
faire durant votre formation, le but est de créer une application React simple composée de
deux pages : une page de connexion et un tableau de données avec différentes interactions.
Aucune maquette n’est fournie, c’est à vous de déterminer un design efficace pour ce
besoin. Pensez-bien à l’harmonie des couleurs et des polices, à l’accessibilité et à l’UX.
Vous devez donc penser à mettre en place un routeur pour gérer les deux pages.
La page de connexion

Cette page est très simple. Elle se compose de trois éléments :

- email
- mot de passe
- le bouton de connexion

La vérification de la véracité des identifiants se fera en dur dans le code. N’oubliez pas
d’intégrer la gestion des erreurs notamment si les identifiants ne sont pas corrects.
L’email correct doit être contact@web.fr
Le mot de passe correct doit être azerty
Page de données

Cette page se compose de quatre éléments : un tableau de données, de la pagination, du tri
et des filtres.

Comme vous pourrez le remarquer, l’objectif est d’utiliser les méthodes que nous avons vu
en cours concernant la manipulation de tableau et d’objets comme filter, map, reduce,
Object.keys, etc.
Le tableau de données

Par le moyen que vous souhaitez (fichier json en dure, appel à une API, etc), affichez un
tableau d’au moins 50 entrées sur 5 colonnes minimum.
N’oubliez pas la ligne d’en tête du tableau contenant le nom des colonnes
La pagination

Le tableau ne doit pas afficher tous les éléments à la fois, il faut laisser le choix à l’utilisateur
du nombre d’éléments à afficher grâce à une liste déroulante (afficher 5, 10, 20, 50 éléments
à la fois). Comme tous les éléments ne sont pas affichés, il est nécessaire d’afficher un
système de pagination permettant d’afficher et de naviguer vers de nombreux éléments :

- première page
- page précédente
- 2 pages précédents la page en cours
- 2 pages suivants la page en cours
- page suivante
- dernière page

Au clic sur un de ces éléments, il sera nécessaire d’afficher les données correctes selon la
page demandée.

Le tri
Au clic sur une des cellules de la ligne d’en tête du tableau, les données du tableau doivent
être affichées, triées dans l’ordre décroissant / croissant selon le paramètre ciblé. Il faut
également afficher dans la cellule un indicateur de tri (par exemple une flèche vers le haut /
vers le bas).
Les filtres

Selon les données que vous avez choisi d’afficher, il faut maintenant mettre en place deux
fonctions de tri.

Un champ texte vérifiant la présence de la valeur de ce champ dans une colonne du
tableau. Prenons l’exemple suivant : vos données sont composées d’un champ “label”,
certaines données ont par exemple pour valeur “voiture”, “bateau”, “toiture” et “moto”. Si
l’utilisateur rentre le texte “itu” dans le champ texte, le tableau affichera seulement les lignes
ayant comme label “voiture” et “toiture”.

Un bouton radio prenant deux valeurs et qui permettra d’afficher les lignes ayant la valeur
choisie. Prenons l’exemple suivant : vos données sont composées d’un champ
“motorisation” ayant pour valeur “essence” ou “diesel”. Vos boutons radio auront pour valeur
“essence” ou “diesel”. Si l’utilisateur clique sur le bouton ayant pour valeur “essence”, le
tableau affichera seulement les lignes ayant comme valeur pour le champ motorisation
“essence”.

Attention à bien faire attention que toutes ces fonctionnalités fonctionnent entre elles. Par
exemple, l’activation d’un filtre ne doit pas modifier la pagination et doit toujours afficher les
données dans le bon ordre.
