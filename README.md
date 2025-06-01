# 🌐 krisch.cloud

**krisch.cloud** ist ein vollständig personalisiertes Self-Management-Dashboard, das dir hilft, deinen Alltag zu strukturieren, Fortschritte zu tracken und deinen Fokus auf deine Ziele zu halten. Die Plattform wurde speziell für Einzelpersonen entwickelt, die ihre Organisation, Schulung, Fitness und finanzielle Übersicht an einem Ort vereinen möchten.

## 🔧 Features

### 🏠 Dashboard (Startseite)
- Tageszitat zur Motivation
- Schulungs- und Fitness-Fortschritt (Progress-Ringe)
- Letzte Datei-Uploads
- Mini-ToDo für den Tag
- Mood-Check (z. B. Emoji-Auswahl)

### 💪 Fitness
- Persönlicher Trainingsplan (Woche)
- Körperdaten (Gewicht, Umfänge etc.)
- Supplement-Tracker

### 🎓 Schulung
- Lernplan (z. B. für §34a, GSSK etc.)
- Prüfungs-Countdown
- Themenliste & Fortschritt

### ✅ ToDos
- Tages-, Wochen- und Monatsansicht
- Fortschrittsbalken
- Kategorien & Filter

### 🎯 Monatsziele
- Zielsetzung
- Ziel-Fortschritt (z. B. 3 von 5 Zielen erreicht)
- Rückblick und Reflektion

### 📁 File Manager
- Datei-Upload mit Vorschau
- Letzte Uploads auf dem Dashboard sichtbar
- Kategorisierung nach Ordnern (z. B. Schulung, Finanzen, Bewerbungen)

### 💸 Schulden-Manager
- Übersicht aller Gläubiger
- Beträge, Fälligkeiten, Status (offen/bezahlt)
- Fortschrittsbalken zur Gesamtentschuldung

### 🧠 Journal
- Freitextfeld für Gedanken & Tagesreflexion
- Mood-Tracker
- „Worauf ich stolz bin"-Sektion

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Sprache**: TypeScript 5.5.3
- **Build-Tool**: Vite 5.4.2
- **Routing**: React Router 6.22.3
- **Styling**: TailwindCSS 3.4.1
- **Icons**: Lucide React 0.344.0

### Backend
- **Datenbank & Auth**: Supabase
  - PostgreSQL-Datenbank
  - Authentifizierung
  - Echtzeit-Updates
  - Datei-Speicherung
  - Row Level Security

### Entwicklung
- **Linting**: ESLint 9.9.1
- **TypeScript-Konfiguration**: tsconfig
- **CSS-Tools**: PostCSS, Autoprefixer

## 🚀 Entwicklung

```bash
# Installation der Abhängigkeiten
npm install

# Starten des Development-Servers
npm run dev

# Build für Produktion
npm run build

# Vorschau des Production-Builds
npm run preview

# Linting
npm run lint
```

## 🔐 Umgebungsvariablen

Erstelle eine `.env`-Datei im Root-Verzeichnis mit folgenden Variablen:

```env
VITE_SUPABASE_URL=deine_supabase_url
VITE_SUPABASE_ANON_KEY=dein_supabase_anon_key
```

## 📌 Ziel von krisch.cloud

Eine zentrale Schaltzentrale für dein echtes Leben – kein Chaos mehr mit Zetteln, Apps und Screenshots.  
**Hier ist alles vereint. Strukturiert. Übersichtlich. Auf dich zugeschnitten.**

## 📣 Kontakt

Projektinhaber: **Tim Krisch**  
Website: [https://krisch.cloud](https://krisch.cloud)  
E-Mail: `timkrisch@outlook.com`

---

> „Struktur ist der erste Schritt zur Freiheit."
