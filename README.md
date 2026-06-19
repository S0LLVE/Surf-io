Surf.io

Auteur

Sébastien Soave
Bachelor Cybersécurité B2 – Ynov Lyon

⸻

Description du projet

Surf.io est un jeu web inspiré des jeux “.io” dans lequel un surfeur doit collecter des vagues afin d’augmenter son score.

Le projet est réalisé dans le cadre du module Vibe Coding. L’objectif est de développer une application en s’appuyant sur des agents IA tout en conservant une architecture logicielle propre et évolutive.

⸻

Technologies utilisées

Frontend

* React
* Vite
* HTML5 Canvas
* JavaScript

Outils IA

* Cursor
* GPT-5.5

Gestion de version

* Git
* GitHub

⸻

Architecture

Le projet respecte les principes suivants :

* Atomic Design
* Design Tokens
* SRP (Single Responsibility Principle)
* DRY (Don’t Repeat Yourself)
* KISS (Keep It Simple)

L’architecture sépare :

* L’interface React
* Le moteur de jeu Canvas
* Les systèmes de gameplay
* Les entités du jeu

⸻

Versions du projet

V1 – Prototype solo

Fonctionnalités :

* Un surfeur contrôlé au clavier
* Génération de vagues
* Détection de collision
* Système de score
* Affichage Canvas

V2 – Gameplay avancé

Fonctionnalités prévues :

* Plusieurs types de vagues
* HUD
* Effets visuels
* Animations

V3 – Multijoueur

Fonctionnalités prévues :

* Socket.io
* Synchronisation temps réel
* Lobby
* Parties multijoueurs

V4 – Version finale

Fonctionnalités prévues :

* Leaderboard
* Menu principal
* Interface complète
* Déploiement final

⸻

Installation

Cloner le dépôt :

git clone https://github.com/S0LLVE/Surf-io.git

Installation :

cd Surf-io/client
npm install

Lancement :

npm run dev

⸻

Prompt Engineering

Exemple de prompt principal utilisé :

“Je développe un projet nommé Surf.io pour un cours de Vibe Coding.

Je veux une architecture professionnelle respectant :

* Atomic Design
* Design Tokens
* SRP
* DRY
* KISS

Technologies :

* React
* Vite
* HTML5 Canvas

Le jeu sera développé en plusieurs versions.”

⸻

Analyse critique de l’IA

Points forts

* Génération rapide de l’architecture.
* Proposition de séparation claire entre moteur de jeu et interface.
* Mise en place des Design Tokens.

Difficultés rencontrées

* Certaines structures proposées étaient trop complexes pour une V1.
* Plusieurs fichiers inutiles ont été proposés initialement.
* Certaines décisions ont nécessité une simplification manuelle afin de respecter le principe KISS.

Corrections effectuées

* Réduction du périmètre de la V1.
* Validation manuelle de chaque étape avant génération.
* Vérification de la cohérence de l’architecture.