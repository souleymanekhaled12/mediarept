# LIGNEROUGE — Média Numérique d'Élite

Plateforme d'information indépendante fondée par **Alassane Ibraima**.  
Stack : Next.js 14 · TypeScript · Tailwind CSS · Prisma · PostgreSQL (Supabase) · Cloudinary

---

## 🚀 Déploiement sur Vercel

### 1. Pousser sur GitHub
```bash
git init
git add .
git commit -m "Initial LIGNEROUGE"
git remote add origin https://github.com/VOTRE_COMPTE/lignerouge.git
git push -u origin main
```

### 2. Importer sur Vercel
1. Aller sur [vercel.com](https://vercel.com) → **Add New Project**
2. Sélectionner votre repo GitHub `lignerouge`
3. Ajouter les variables d'environnement (voir ci-dessous)
4. Cliquer **Deploy**

### 3. Variables d'environnement Vercel
```
DATABASE_URL          = postgresql://postgres.qspwpmicxoybxjfrpdcb:...@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL            = postgresql://postgres.qspwpmicxoybxjfrpdcb:...@aws-0-eu-west-1.pooler.supabase.com:5432/postgres
CLOUDINARY_CLOUD_NAME = dklbptrqc
CLOUDINARY_API_KEY    = 439995335672695
CLOUDINARY_API_SECRET = weAmMUj563IhoKDod7DqxAc7dnk
ADMIN_EMAIL           = ibrahimaalassane2016@gmail.com
ADMIN_PASSWORD        = LigneRouge2026!
NEXTAUTH_SECRET       = (générez : openssl rand -base64 32)
NEXTAUTH_URL          = https://votre-domaine.vercel.app
```

### 4. Initialiser la base de données
Après le premier déploiement, ouvrez un terminal et exécutez :
```bash
npx prisma db push
npx ts-node prisma/seed.ts  # (optionnel, insère des articles de démo)
```
Ou via Vercel CLI :
```bash
vercel env pull .env.local
npx prisma db push
```

---

## 🛠️ Développement local

```bash
npm install
npx prisma db push
npm run dev
```
Ouvrir [http://localhost:3000](http://localhost:3000)

---

## 📁 Structure

```
src/
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── [slug]/page.tsx       # Page article
│   ├── biographie/           # Bio du rédacteur
│   ├── admin/                # Dashboard admin
│   │   ├── articles/         # CRUD articles
│   │   ├── newsletter/       # Gestion abonnés
│   │   └── commentaires/     # Modération
│   └── api/                  # Routes API
│       ├── articles/         # CRUD articles
│       ├── comments/         # Commentaires
│       ├── newsletter/       # Newsletter
│       ├── upload/           # Upload Cloudinary
│       ├── views/            # Compteur de vues
│       └── health/           # Santé DB
├── components/               # Composants réutilisables
└── lib/                      # Prisma, Cloudinary, utils
```

---

## 🔑 Accès Admin

URL : `/admin`  
Email : `ibrahimaalassane2016@gmail.com`  
Mot de passe : `LigneRouge2026!`

---

## ✅ Fonctionnalités

- ✅ Articles avec éditeur riche (Quill)
- ✅ Upload d'images via Cloudinary
- ✅ Slugs automatiques (sans accents)
- ✅ Compteur de vues en temps réel
- ✅ Commentaires avec modération
- ✅ Newsletter avec export CSV
- ✅ SEO dynamique (OG + Twitter Cards)
- ✅ Partage WhatsApp, Facebook, Twitter
- ✅ Badge DB connectée sur le dashboard
- ✅ Page biographie enrichie
- ✅ Design responsive mobile/desktop
