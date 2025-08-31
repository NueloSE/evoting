# E-Voting Platform

## Project Overview

The E-Voting Platform is a web application built for the ALX Frontend Bootcamp capstone project. It enables organizers to create and manage elections and voters to register, vote, and view results using a unique election ID. The app emphasizes simplicity, real-time updates, and security, using Firebase for backend services and React for a responsive frontend. Voters and organizers authenticate to vote or manage an election.

## Features

### User Roles:

- Organizers:

  - Create elections with multiple categories (e.g., President, Treasurer) and candidates.
  - View, edit, or delete elections and candidates.
  - Toggle voter registration and voting sessions.
  - Share unique election IDs with voters.

- Voters:
  - Register for an election using an election ID and organizer name (email-based).
  - Cast one vote per category during the voting session.
  - View real-time or final election results.

## Core Functionality:

- Real-time vote counting and session status updates via Firebase Firestore/Realtime Database.
- Secure voter registration through Firebase Cloud Functions (prevents direct database writes).
- Role-based access: Organizers manage via authenticated writes; voters use HTTP endpoints.

## Security:

- Firebase Authentication for organizers and voters (email/password or Google).
- Firestore security rules ensure only organizers edit their elections.
- Voter email uniqueness enforced via Firebase authentication to prevent duplicate registration/voting.

## Tech Stack

- **Frontend**: React (Create React App), React Router (navigation), Material-UI (styling).
- **Backend**: Firebase:
- **Authentication**: Organizer sign-up/login (email/password, Google).
- **Firestore Database**: Stores elections, candidates, and voter registrations.
- **Cloud Functions**: Handles unauthenticated voter registration and voting.
- **Realtime Database** : For live vote count updates.
- **Design**: Figma.
- **Deployment**: Vercel or Netlify (frontend), Firebase Hosting (bundled), Firebase for backend.
- **Tools**: Firebase CLI, Vite, ESLint, Prettier.

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- Firebase account and project
- Git

### Steps

- Clone the Repository:

```bash
git clone https://github.com/yourusername/evoting-platform.git

cd evoting-platform
```

- Install Frontend Dependencies:

```bash
npm install
```

## Usage

### Organizer:

- Sign up/login via email or Google.
- Create an election (specify categories, candidates).
- Share the generated electionId with voters.
- Toggle registration/voting sessions from the dashboard.
- View real-time results or delete elections.

## Voter:

- Sign in and navigate to the registration page.
- Enter electionId, organizer name, and email to register.
- Once registered and voting is open, use the same electionId to vote (select one candidate per category).
- View results anytime (publicly accessible).

## Known Limitations

- Assumes small-scale usage (~100-500 voters); larger scales need subcollections.
- No blockchain-level security.
- Firebase free tier has quotas (monitor usage).

## Contributing

This is a capstone project, but contributions are welcome:

- Fork the repo.
- Create a feature branch (git checkout -b feature-name).
- Commit changes (git commit -m "Add feature").
- Push and open a pull request.

## Contact

**Explore my projects and feel free to reach out for collaboration!**

- Send an <a href="mailto:nuelakalo@gmail.com">Email</a>
- Or dm on X [@isnuelo](https://x.com/isNuelo)
