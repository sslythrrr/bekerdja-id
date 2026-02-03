# Bekerdja.id

**Bekerdja.id is an efficient candidate management dashboard designed to monitor recruitment status, track statistics, and manage applicant data in real-time.**

## 🚀 Quick Start

Follow these steps to get the project running on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 1. Server Setup (Backend)
Navigate to the server directory, install dependencies, and start the backend.

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory and add your database configuration:
```env
uri=mongodb://localhost:27017/bekerdja_db
PORT=3000
```

Start the development server:
```bash
npm run dev
```

### 2. Client Setup (Frontend)
Open a new terminal, navigate to the client directory, and launch the frontend application.

```bash
cd client
npm install
npm run dev
```

Open your browser and visit the URL provided (default is `http://localhost:5173`).

---

## ✨ Key Features
- **Complete Candidate Management**: Easily add, edit, and delete candidate information.
- **Status Monitoring**: Track applicant progress (Interested, Contacted, Interview, Hired, Rejected).
- **Visual Statistics**: View recruitment summaries and metrics at a glance.
- **Search & Filter**: Find candidates quickly by name or filter by recruitment status.
- **Modern & Responsive**: A clean user interface built with Tailwind CSS and Radix UI components.

## 🛠️ Tech Stack

Built with a modern MERN stack for performance and scalability:

### Frontend
- **Framework**: [React 19](https://react.dev/) (via Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)

## 📂 Project Structure

```
bekerdja-id/
├── client/          # Frontend React Application
│   ├── src/
│   │   ├── components/  # Reusable UI Components
│   │   ├── lib/         # Utilities & Helpers
│   │   └── ...
├── server/          # Backend Express Server
│   ├── models/      # Mongoose Schemas
│   ├── routes/      # API Routes
│   └── ...
```

## 📝 License
This project is licensed under the [MIT License](LICENSE).
