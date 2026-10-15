<div align="center">

<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/hero-light.svg">
  <img src="assets/hero.svg" alt="Campus Connect" width="100%"/>
</picture>

<br/>

**An inter-college student network for notes, events, opportunities, teammates and AI-powered answers, all in one place.**

<br/>

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-campus--connect--beta--weld.vercel.app-ff4d1a?style=for-the-badge&logo=vercel&logoColor=white)](https://campus-connect-beta-weld.vercel.app/)

![Status](https://img.shields.io/badge/status-live-b6ff3b?style=flat-square&labelColor=0a0a0c)
![Rank](https://img.shields.io/badge/Top_4_of_60%2B_projects-ff4d1a?style=flat-square&labelColor=0a0a0c)
![Internship](https://img.shields.io/badge/9--week_internship-22d3ee?style=flat-square&labelColor=0a0a0c)
![AI](https://img.shields.io/badge/AI-Gemini_+_pgvector-a78bfa?style=flat-square&labelColor=0a0a0c)
![Security](https://img.shields.io/badge/Row_Level_Security-enforced-b6ff3b?style=flat-square&labelColor=0a0a0c)

<br/>

[Problem](#-the-problem) · [Features](#-features) · [Screenshots](#-product-tour) · [Architecture](#-architecture) · [N.O.V.A](#-nova--the-campus-ai) · [Skill Match](#-skill-match-engine) · [Attendance](#-attendance-guardian) · [Tech Stack](#-tech-stack) · [Roadmap](#-roadmap)

</div>

<br/>

<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/stats-light.svg">
  <img src="assets/stats.svg" alt="Network at a glance" width="100%"/>
</picture>

<p align="center">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/divider-light.svg">
  <img src="assets/divider.svg" alt="" width="100%"/>
</picture>
</p>

## ⚡ The Problem

Student life runs on scattered channels: notes buried in one WhatsApp group, an event poster in another, an internship in a Telegram channel, and the right teammate found only through luck.

<table>
<tr>
<td width="50%" valign="top">

### 🔴 Before: fragmented silos

- *"Bro who has OS Unit 3 handwritten notes?"* lost among 400 unread messages across 6 groups
- *"Need 1 Flutter developer for hackathon tomorrow!"* a physical notice-board poster, zero responses from other colleges
- *"Am I going to be detained in DBMS?"* guesswork instead of math
- Opportunities missed because nobody forwarded them

</td>
<td width="50%" valign="top">

### 🟢 After: Campus Connect

- **Verified study repository**, searchable by semester and subject, with AI-generated summaries
- **Teammate match engine** using semantic embeddings across skills, branch and hackathon roles
- **Attendance Guardian** that calculates exactly how many classes you can safely skip
- **One feed** for events, announcements and opportunities

</td>
</tr>
</table>

<p align="center">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/divider-light.svg">
  <img src="assets/divider.svg" alt="" width="100%"/>
</picture>
</p>

## 🧩 Features

| # | Module | What it does |
|:-:|---|---|
| 01 | **Student Dashboard** | Bento-style command hub with daily streak, XP levels, campus rank and priority feeds |
| 02 | **Study Materials** | Semester-sorted notes, cheatsheets and solved past papers with Gemini summaries |
| 03 | **Events & Tickets** | Hackathons, tech talks and competitions with QR tickets and verifiable certificates |
| 04 | **Announcements** | Structured notices with publisher, category and audience, not lost chat history |
| 05 | **Opportunities** | Internships, research fellowships and hackathons with match percentage and a Kanban application tracker |
| 06 | **Network** | Peer and mentor directory across 15 colleges, with a hackathon collab board and realtime chat |
| 07 | **Skill Match** | Describe your idea in plain English; Gemini extracts skills and ranks complementary teammates |
| 08 | **Leaderboard** | Verified proof-of-contribution ranking across campuses (weekly, monthly, all-time) |
| 09 | **N.O.V.A Assistant** | RAG assistant grounded in live campus data, never invented answers |
| 10 | **Attendance Guardian** | Per-subject forecasting with safe-bunk math and a CSV audit export |
| 11 | **Admin / Moderation** | Role-based publishing and content approval |

<p align="center">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/divider-light.svg">
  <img src="assets/divider.svg" alt="" width="100%"/>
</picture>
</p>

## 🖼️ Product Tour

> All screenshots are from the [live deployment](https://campus-connect-beta-weld.vercel.app/).

### Landing

<p align="center">
  <img src="screenshots/01-landing.png" alt="Landing page with N.O.V.A" width="100%"/>
</p>

<table>
<tr>
<td width="50%"><img src="screenshots/02-unified-grid.png" alt="One unified grid across all campuses"/></td>
<td width="50%"><img src="screenshots/03-system-shift.png" alt="From WhatsApp chaos to mission control"/></td>
</tr>
<tr>
<td width="50%"><img src="screenshots/04-features.png" alt="Feature modules"/></td>
<td width="50%"><img src="screenshots/05-journey.png" alt="How Campus Connect powers your semester"/></td>
</tr>
</table>

### Try the matchmaking, sign up, and get started

<table>
<tr>
<td width="50%"><img src="screenshots/06-matchmaking-demo.png" alt="Interactive matchmaking demo"/></td>
<td width="50%"><img src="screenshots/07-signup.png" alt="Create Student Node"/></td>
</tr>
</table>

### Inside the app

<details open>
<summary><b>📊 Dashboard</b>: streaks, XP, rank, attendance health, N.O.V.A</summary>
<br/>
<img src="screenshots/08-dashboard.png" alt="Student dashboard" width="100%"/>
</details>

<details>
<summary><b>📚 Study Materials</b>: 840+ verified academic documents</summary>
<br/>
<img src="screenshots/09-study-materials.png" alt="Study materials" width="100%"/>
</details>

<details>
<summary><b>🎟️ Events</b>: hackathons, talks and competitions with QR tickets</summary>
<br/>
<img src="screenshots/10-events.png" alt="Campus events" width="100%"/>
</details>

<details>
<summary><b>💼 Opportunities</b>: internships, research and hackathons with skill-match scores</summary>
<br/>
<img src="screenshots/11-opportunities.png" alt="Opportunities" width="100%"/>
</details>

<details>
<summary><b>🌐 Network</b>: peers and mentors across 15 colleges</summary>
<br/>
<img src="screenshots/12-network.png" alt="Peer directory" width="100%"/>
</details>

<details>
<summary><b>🏆 Leaderboard</b>: inter-college merit matrix</summary>
<br/>
<img src="screenshots/13-leaderboard.png" alt="Leaderboard" width="100%"/>
</details>

<details>
<summary><b>🤖 N.O.V.A Assistant</b>: grounded campus intelligence</summary>
<br/>
<img src="screenshots/14-nova-assistant.png" alt="N.O.V.A assistant" width="100%"/>
</details>

<details>
<summary><b>🛡️ Attendance Guardian</b>: safe-bunk simulator</summary>
<br/>
<img src="screenshots/15-attendance.png" alt="Attendance guardian" width="100%"/>
</details>

<details>
<summary><b>🧭 Skill Match & Squad Builder</b>: natural language to ranked teammates</summary>
<br/>
<img src="screenshots/16-skill-match.png" alt="Skill match" width="100%"/>
</details>

<p align="center">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/divider-light.svg">
  <img src="assets/divider.svg" alt="" width="100%"/>
</picture>
</p>

## 🏗️ Architecture

<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/architecture-light.svg">
  <img src="assets/architecture.svg" alt="Request flow" width="100%"/>
</picture>

### Roles

| Role | Can do |
|---|---|
| **Student** | Browse, search, maintain profile, register for events, connect, contribute materials |
| **Organizer / Club** | Create and manage their own events and opportunities |
| **Department / Admin** | Publish official announcements, moderate and approve content |

<p align="center">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/divider-light.svg">
  <img src="assets/divider.svg" alt="" width="100%"/>
</picture>
</p>

## 🤖 N.O.V.A: the Campus AI

**N**avigation & **O**pportunity **V**oice **A**ssistant answers from your platform data rather than guessing.

<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/nova-light.svg">
  <img src="assets/nova.svg" alt="N.O.V.A grounded retrieval pipeline" width="100%"/>
</picture>

Example questions: *"Am I short on attendance for any subjects this semester?"*, *"What hackathons and tech symposiums are happening this month?"*, *"Who knows Flutter at BMSCE?"*

<p align="center">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/divider-light.svg">
  <img src="assets/divider.svg" alt="" width="100%"/>
</picture>
</p>

## 🧭 Skill Match Engine

Two layers work together:

1. **Layer 1, rules:** overlap of required skills versus profile skills.
2. **Layer 2, semantics:** 768-dimension Gemini embeddings compared by cosine similarity in pgvector.

```text
Rule score = matched required skills ÷ total required skills × 100
```

<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/skillmatch-light.svg">
  <img src="assets/skillmatch.svg" alt="Skill match two-layer ranking" width="100%"/>
</picture>

<p align="center">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/divider-light.svg">
  <img src="assets/divider.svg" alt="" width="100%"/>
</picture>
</p>

## 🛡️ Attendance Guardian

Hall-ticket eligibility is a math problem, so Campus Connect treats it like one.

<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/attendance-light.svg">
  <img src="assets/attendance.svg" alt="Attendance Guardian forecast" width="100%"/>
</picture>

```text
Attendance %         = attended ÷ total × 100
Classes you can skip = floor(attended ÷ 0.75 − total)
Classes you must attend (if short) = ceil(3 × total − 4 × attended)
```

The 75% threshold is configurable per institution. Records are **owner-only** and protected by RLS.

<p align="center">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/divider-light.svg">
  <img src="assets/divider.svg" alt="" width="100%"/>
</picture>
</p>

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-0a0a0c?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-0a0a0c?style=for-the-badge&logo=nodedotjs&logoColor=84CC16)
![Express](https://img.shields.io/badge/Express-0a0a0c?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-0a0a0c?style=for-the-badge&logo=postgresql&logoColor=4169E1)
![Gemini](https://img.shields.io/badge/Gemini-0a0a0c?style=for-the-badge&logo=googlegemini&logoColor=8E75B2)
![Vercel](https://img.shields.io/badge/Vercel-0a0a0c?style=for-the-badge&logo=vercel&logoColor=white)

</div>

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js + Express.js (REST APIs) |
| Database | PostgreSQL with Row Level Security and `pgvector` |
| AI | Google Gemini (skill parsing, embeddings, summaries, RAG) |
| Deployment | Vercel |

<p align="center">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/divider-light.svg">
  <img src="assets/divider.svg" alt="" width="100%"/>
</picture>
</p>

## 🔐 Security & Privacy

- Passwords are hashed, never stored in plaintext
- Verified college-domain authentication
- Strict **Row Level Security** on every table
- Role-based authorization for publishers and admins
- Input validation and sanitization
- Protected file uploads
- Secrets kept in environment variables
- Audit logging for administrative actions

<p align="center">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/divider-light.svg">
  <img src="assets/divider.svg" alt="" width="100%"/>
</picture>
</p>

## 🗺️ Roadmap

```mermaid
gantt
    title Implementation phases
    dateFormat  YYYY-MM-DD
    axisFormat  Week %W
    section Foundation
    Auth, DB, profiles, base UI     :done, p1, 2025-03-10, 14d
    section Campus modules
    Notes, events, announcements    :done, p2, after p1, 14d
    section Social layer
    Network + Skill Match           :done, p3, after p2, 14d
    section Engagement
    Leaderboard + XP                :done, p4, after p3, 7d
    section Intelligence
    N.O.V.A AI + recommendations    :done, p5, after p4, 7d
    section Hardening
    Security, testing, deployment   :done, p6, after p5, 7d
```

**Next up:** mobile apps · push notifications for deadlines · personalized AI feed · multi-skill team optimization · alumni mentorship · club analytics dashboard.

<p align="center">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/divider-light.svg">
  <img src="assets/divider.svg" alt="" width="100%"/>
</picture>
</p>

## 🚀 Run Locally

```bash
git clone https://github.com/<your-username>/campus-connect.git
cd campus-connect

npm install
cp .env.example .env     # add your database URL and Gemini API key
npm run dev
```

> Update the clone URL and scripts to match your repository.

<p align="center">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/divider-light.svg">
  <img src="assets/divider.svg" alt="" width="100%"/>
</picture>
</p>

## 🏆 About

Built during a **9-week full-stack internship** under the **Rotaract Club of Atria I.T. × Department of CSE (Mar–Jun 2025)** and ranked **Top 4 out of 60+ projects**.

<div align="center">

<br/>

**[→ Open the live app](https://campus-connect-beta-weld.vercel.app/)**

<sub>Campus Connect · one unified grid across all campuses</sub>

</div>
