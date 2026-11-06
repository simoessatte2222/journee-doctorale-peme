# Site officiel — Journée doctorale PEME (maquette à personnaliser)

Première version du site web de la Journée doctorale du laboratoire PEME, ENSA Khouribga. Site statique, responsive, sans abonnement, sans dépendance à installer.

## 1. Tester le site sur votre ordinateur

Ouvrir `index.html` avec Chrome, Firefox ou Edge. Le site fonctionne sans serveur.

## 2. Personnaliser les informations

Ouvrir `config.js` avec le Bloc-notes ou VS Code et modifier :

- `edition` : édition affichée sur le site ;
- `eventDateDisplay` : date officielle, après validation ;
- `registrationUrl` : adresse HTTPS du formulaire d'inscription ;
- `submissionUrl` : adresse HTTPS du formulaire de dépôt ;
- `programmeUrl` : lien vers le programme définitif (PDF) ;
- `contactEmail` : e-mail officiel de l'organisation.

Par défaut, les deux boutons de formulaire affichent un message « pas encore disponible » et ne collectent aucune donnée. Dès que vous fournissez de vrais liens dans `config.js`, ils s'ouvrent dans un nouvel onglet.

Pour modifier les textes, la description, les formats de la journée ou le programme indicatif, modifier `index.html`. Pour modifier les couleurs ou le style, modifier `styles.css`. Le logo présent est **une identité graphique de démonstration**, pas le logo officiel du laboratoire ou de l'établissement.

## 3. Publier gratuitement avec GitHub Pages

1. Se connecter sur https://github.com et créer un dépôt **public**, par exemple `journee-doctorale-peme`.
2. Dans le dépôt, cliquer sur **Add file > Upload files**.
3. Déposer **le contenu du dossier** `site-journee-doctorale-peme` (fichiers `index.html`, `config.js`, `styles.css`, `script.js` et dossier `assets/`) à la racine du dépôt. Ne pas déposer seulement le fichier ZIP.
4. Valider avec **Commit changes**.
5. Ouvrir **Settings > Pages**.
6. Sous **Build and deployment**, choisir **Deploy from a branch** puis la branche **main**, dossier **/(root)** et cliquer sur **Save**.
7. Une fois publié, le site prendra une adresse du type `https://VOTRE-PSEUDO.github.io/journee-doctorale-peme/`.

Doc officielle : https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

**Attention :** sur GitHub Free, le dépôt du site est public. N'y ajouter aucun fichier de soumission, mot de passe ou donnée personnelle de participant.

## 4. Créer les formulaires

Sur https://forms.google.com, créer :

- un formulaire d'inscription (nom, établissement, e-mail, statut, etc.) ;
- un formulaire de soumission (titre, auteurs, affiliation, résumé, domaine, etc.).

Récupérer leurs liens de partage et les placer dans `config.js`. Si vous activez le **téléversement de fichiers** dans Google Forms, les personnes qui soumettent seront généralement tenues de se connecter à un compte Google. Vous pouvez utiliser un champ texte pour le résumé ou une autre solution de dépôt si cet accès pose problème. Vérifiez la politique de conservation et d'accès aux données de votre établissement avant d'ouvrir les formulaires.

## 5. Fichiers

- `index.html` : pages et sections du site ;
- `styles.css` : interface responsive ;
- `script.js` : navigation et liens configurables ;
- `config.js` : informations à personnaliser ;
- `assets/favicon.svg` : icône de démonstration ;
- `.nojekyll` : évite les traitements Jekyll inutiles.

## 6. Vérifications avant diffusion

Date, nom complet du laboratoire, comité d'organisation, programme définitif, règles de soumission, date limite, accessibilité des liens, e-mail de contact, identité institutionnelle et autorisation de publier les logos. Le programme fourni est **un exemple indicatif**, non un programme approuvé.
