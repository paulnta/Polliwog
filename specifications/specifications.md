# Spécifications

## Vision

ReVote est une application web permettant de créer des questionnaires, sondages et ou quizz. Les resultats sont visible en temps réel et les utilisateurs peuvent participer depuis leur ordinateurs, tablettes ou smartphones.

Cette application est particulièrement utile lors de conférences ou cours. L'intervenant peut avoir un feed-back de son auditoire sur la qualité de sa présentation. Ainsi, il peut avoir une idée du niveau de compréhension du public, leur état d'esprit ou connaître les points nécessitant d'être éclaircis.

## Fonctionnalités

Dans ce document, nous utiliseront le terme de **session** afin de représenter la séance durant laquelle l'intervenant peut partager des quizz et l'auditoire peux y répondre. Les utilisateur rejoignent donc une session créée par l'intervenant. Puis en effet l'**intervenant** désigne l'orateur/professeur.

### Comptes utilisateurs

Pour une utilisation simple et rapide de l'application, seul l'intervenant necéssite d'avoir un compte afin de créer une session. Cette session sera une *session public* accéssible à tout personne ayant le lien URL.

Pour une utilisation plus poussée ou plus sécurisée, l'intervenant peut envoyer une invitation à rejoindre une *session privée*. Pour rejoindre une telle session, l'utilisateur est amené à se connecter ou créer un compte utilisateur. Ainsi, l'intervenant aura plus de contrôle sur les personnes autorisées à participer à la session et tout le monde bénificiera de fonctionnalités supplémentaires. Les différent types de sessions sont détaillés dans les parties *session public* et respecivement *session privée*.

### Session

La session permet la communication entre l'intervenant et son auditoire. L'utilisateur accède à une session via son lien URL. 

Au lieu de partager des informations par email, ce qui obligerait à l'intervenant de connaître chaque addresse email de l'auditoire, l'intervenant peut partager dans une session, divers informations utiles à la présentation comme:

* Fichiers (PDF, images, ou powerpoint)
* Liens urls
* et surtout questionnaires, sondages ou mini-quizz

Lorsqu'un element à été partagés, la page web de l'utilisateur est mise à jour.

La communication peut se faire en sens inverse, lorsque les utilisateurs peuvent indiquer leur **moral** à tout moment ainsi que la raison de leur état ou poser des **questions**.

#### Session public

Il n'est pas nécessaire de disposer d'un compte utilisateur pour rejoindre une session public. La session est accessible à toute personne connaissant le lien URL généré aléatoirement. 

Notez que si un sondage ou autre type de questionnaire est partagé via une telle session, rien n'empêche un utilisateur de voter plusieurs fois en y accédant par différents navigateur. De plus, un utilisateur qui n'est pas présent dans l'auditoire pourrait aussi y accèder, ce qui peut être un avantage ou pas.

#### Session privée

L'intervenant crée une tels session en invitant les seuls personnes autorisée à y participer. Il doit donc spécifer l'addresse email des participants. Similaire au principe de partage de dossier [Dropbox](http://dropbox.com), lorsqu'un utilisateur reçoit une invitation, il crée un compte, s'il n'en dispose pas encore et se connecte pour accepter l'invitation.

Ce type de session empêche au utilisateur de voter plusieurs fois à des questionnaires et permet aussi à l'intervenant d'avoir plus d'informations sur les résultats de sondages.

En comparaison au sessions publics:

* Les participant peuvent
 
  ... modifier leur choix de réponse à un quizz
  
  ... 
  
* L'intervenant peut

  ... savoir qui n'a pas encore répondu à un sondage
  
  ... envoyer un rappel à ceux qui n'ont pas encore répondu
  

### Questionnaires (Poll)

#### Création
L'intervenant dispose d'un outil permettant créer des questionnaires ou sondage.
Un questionnaire est composé de plusieurs questions et chacune des question possèdent plusieurs choix. 

Il n'est pas nécessaire d'avoir une session pour créer un questionnaire. Cela permet à l'intervenant de créer ses sondages avant l'avance.

#### Partage
Durant une session, l'intervenant sélectionne un questionnaire dans la liste de tous les questionnaires créés et clique sur *démarrer*. Tous les utilisateurs actuellement connecté à la session recevront ce questionnaire. Il pourront y répondre jusqu'à ce que l'intervenant clique sur *arrêter*. 

Les questionnaires sont réutilisable dans n'importe quel session et peuvent être exportés au format JSON afin être utilisé dans un autre compte.

#### Résultats
Un aperçu des résultats des questionnaires est affiché directement sur la page de visualisation d'un questionnaire. Une barre de longueur variable et de couleur rouge ou vert est affiché à coté d'un des choix d'une question. Chaque barre représente le nombre participant ayant opté pour le choix correspondant.

Un bouton *résultats* permet d'afficher les statistiques en mode présentation. Les statistiques sont alors affichée par un graphique.

### Moral de l'auditoire

Cette fonctionnalité à pour but de permettre à l'orateur d'une conférence ou d'un professeur de savoir comment se sent l'auditoire et répondre à des questions que tout intervenant peut être amené à se poser: Arrivent-ils à suivre cette présentation/ce cours ? Combien ont perdu le fil ? Ont-ils appris quelque chose ? etc..

Le moral des étudiants peut être consulté par l'orateur en temps réel ou en fin de séance. Pour cela, les participants peuvent indiquer le niveau de leur enthousiame (*mauvais*, *normal*, *bon*) à tout moment durant la séance et de manière anonyme. Par défaut, le moral des participants est à l'état *normal*. Lorsqu'un participant change l'etat de son normal, il peut si il le souhaite donner une raison en séléctionnant un choix parmis une liste de possibilités.

Un graphique repésentant le moral générale de l'auditoire est affiché dans un widget de l'écran de l'orateur et évolue en fonction du temps et des choix des participant.

### Questions de l'auditoire - TweetQuestions

Il se peut qu'une présentation soulève beaucoup de questions ou qu'un professeur souhaite savoir à quoi s'attend son auditoire avant de donner son cours. Une manière de trouver une solution à ces problèmes est la fonctionnalité **TweetQuestions**.

Les participants à une session peuvent s'exprimer en postant de cours messages contenant des hashtages (à la manière de twitter). 

> Quel avantage à utiliser **#Grunt** plutôt que **#Gulp** ?

> J'aimerais en savoir d'avantage sur les **#Build systems**. **#Grunt** **#Gradle** **#Maven**

Ces hashtags sont utilisés pour identifier les sujets les plus demandés ou les questions les plus fréquentes. 

L'intervenant peut identifier les sujet/questions les plus populaires en consultant un nuage de mots de ces hashtags. Les hashtags les plus populaires sont mis en évidence par leur taille par rapport au autres. Les participants peuvent augmenter la popularité d'un hashtag en l'utilisant dans leur propre message ou en retweetant cette question (**bouton retweet**). 

Ainsi l'intervenant a dans un premier temps une vision global en voyant les hashtags les plus populaires et peux consulter les messages dans leurs intégralité pour avoir plus de détails.



