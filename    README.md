# Hospital Appointment System — MedCare Plus

ITUE301  Practical Exam — Set A
Roll No: 24dce124 Batch: A

## Tech Stack
React + Express.js + MongoDB (Mongoose)

## Frontend Setup
cd frontend
npm install
npm run dev
Runs on http://localhost:5173 (or next available port)

## Backend Setup
cd backend
npm install
npm run dev
Runs on http://localhost:5001

## MongoDB Setup
1. Create a MongoDB Atlas cluster (or use local MongoDB)
2. Create a database named hospital_db
3. Copy .env.example to .env and add your connection string

## Environment Variables
Create a .env file inside backend/ with:
PORT=5001
MONGO_URI=mongodb+srv://healthhubadmin:HwdZnQJbU8jowOPm@healthhub-cluster.unzpab5.mongodb.net/hospital_db?appName=healthhub-cluster