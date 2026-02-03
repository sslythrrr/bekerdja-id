# Bekerdja.id

**Simple Candidate Tracker** - web app where recruiters can manage candidates.

## Quick Start

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
# Local or Atlas MongoDB URI
mongoApi=mongodb://localhost:27017/bekerdja_db
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
```

Create a `.env` file inside the `client/` directory to configure the backend URL:
```env
# URL of your running backend (use localhost for local dev)
VITE_API_URL=http://localhost:3000/api/candidates
```

Start the frontend:
```bash
npm run dev
```

Open your browser and visit the URL provided (default is `http://localhost:5173`).

---

## Deployment

This project handles deployment separately for the client (Frontend) and server (Backend) using **Vercel**.

### 1. Backend Deployment (Vercel)
1. Push your code to GitHub.
2. Create a new project on Vercel and select your repository.
3. Configure the project:
   - **Root Directory**: `server`
   - **Environment Variables**:
     - `mongoApi`: Your MongoDB Atlas Connection String
4. Deploy the project.
5. Copy the deployed domain URL (e.g., `https://your-backend.vercel.app`).

### 2. Frontend Deployment (Vercel)
1. Create another new project on Vercel and select the SAME repository.
2. Configure the project:
   - **Root Directory**: `client`
   - **Environment Variables**:
     - `VITE_API_URL`: The Backend URL from Step 1 + `/api/candidates`
       - Example: `https://your-backend.vercel.app/api/candidates`
3. Deploy the project.

---

## Key Features
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

## Project Structure

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
