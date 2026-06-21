Surf.io – Projet Vibe Coding

Informations générales

Nom : Sébastien Soave
Formation : Bachelor Cybersécurité B2 – Ynov Campus Lyon

Description du projet

Surf.io est un jeu multijoueur temps réel inspiré des jeux .io. Les joueurs incarnent des surfeurs évoluant sur une carte contenant différentes vagues. Ils doivent collecter les vagues positives pour augmenter leur score tout en évitant les vagues dangereuses.

Dépôt GitHub

https://github.com/S0LLVE/Surf-io

URL de production

Frontend : https://surf-io.pages.dev

Backend : https://surf-io-production.up.railway.app

Lancement en local

Frontend

cd client
npm install
npm run dev

Backend

cd server
npm install
npm start

⸻

Architecture du projet

Frontend

* React 19
* Vite
* HTML5 Canvas
* Socket.io Client

Backend

* Node.js
* Express
* Socket.io

Déploiement

* Frontend : Cloudflare Pages
* Backend : Railway

⸻

Architecture logicielle

Le projet suit une architecture modulaire afin de respecter les principes SRP, DRY et KISS.

Séparation des responsabilités

Rendu

Responsable de l’affichage Canvas et des sprites.

Gameplay

Responsable du score, des collisions, des vagues et de la boucle de jeu.

Réseau

Responsable des communications Socket.io et de la synchronisation multijoueur.

⸻

Design Atomique

L’interface utilisateur utilise une organisation inspirée de l’Atomic Design :

* Atoms
* Molecules
* Organisms
* Pages

Exemples :

* ReadyPanel
* GameHUD
* LobbyPage
* WaitingRoomPage
* GamePage

⸻

Design Tokens

Les couleurs et constantes visuelles sont centralisées afin d’assurer une cohérence graphique sur l’ensemble de l’application.

⸻

Arsenal IA & Écosystème Agentique

Outils utilisés

* Cursor
* ChatGPT
* GitHub
* Railway
* Cloudflare Pages

LLM utilisés

* GPT-5.5 (ChatGPT)
* Modèles Cursor

MCP utilisés

Aucun serveur MCP personnalisé n’a été développé pour ce projet.

Règles imposées à l’IA

Les prompts imposaient systématiquement :

* séparation frontend/backend
* aucune modification du gameplay lors des évolutions réseau
* respect du SRP
* conservation de la logique moteur
* validation par étapes

⸻

Ingénierie de Prompt

Prompt 1

“Ne modifie aucun gameplay, aucune collision, aucun score, aucun déplacement. Implémente uniquement le système Ready.”

Ce prompt a permis d’ajouter le système Ready sans casser le moteur de jeu.

Prompt 2

“Effectue uniquement un audit. Ne modifie aucun fichier.”

Utilisé pour analyser l’architecture avant chaque évolution.

Prompt 3

“Valide uniquement le runtime réel.”

Permet de distinguer le code présent dans le dépôt du comportement réel de l’application exécutée.

⸻

Analyse critique du Vibe Coding

Où l’IA a brillé

* génération rapide de composants React
* architecture Socket.io
* automatisation des audits
* assistance au déploiement Railway et Cloudflare

Hallucinations rencontrées

Faux problème de sprites

L’IA a conclu à tort que les sprites étaient absents du projet alors qu’ils étaient bien présents et versionnés dans Git.

Validation incomplète du runtime

Plusieurs validations ont été réalisées sur le code source alors que le serveur exécutait encore une ancienne version. Une vérification du processus Node actif a été nécessaire.

Déploiement Railway

L’IA a initialement supposé une incompatibilité Railway. L’analyse des logs a montré que le problème provenait simplement de la configuration du Root Directory.

Reprise de contrôle

Chaque modification importante a été précédée :

* d’un audit
* d’une validation runtime
* d’une vérification Git
* d’un test manuel

⸻

DevOps & Déploiement

CI/CD

GitHub est connecté à :

* Railway (backend)
* Cloudflare Pages (frontend)

Chaque push sur la branche principale déclenche automatiquement un nouveau déploiement.

Vérifications effectuées

* build Vite
* tests multijoueurs
* validation Socket.io
* validation Railway
* validation Cloudflare Pages

⸻

Conclusion

Ce projet a permis de mettre en pratique le Vibe Coding sur un projet complet allant de la conception à la mise en production. L’utilisation de l’IA a accéléré le développement mais a nécessité un contrôle constant afin de détecter les erreurs d’analyse, les hallucinations et les problèmes d’architecture. Le résultat final est un jeu multijoueur temps réel déployé et accessible en ligne.