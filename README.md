**This project is implementation of the Bitespeed Identity Reconciliation assignment.**

The goal is to identify and link customer contacts based on email and phone number and return a consolidated identity.

What This Service Does

If no contact exists → creates a new primary contact.

If matching contact(s) exist → links them together.

The oldest contact becomes the primary.

Other related contacts become secondary.

If a request connects two primary contacts → the older one remains primary and the other becomes secondary.

Returns all emails, phone numbers, and secondary contact IDs linked to the primary.

**Tech Stack Used**
Node.js

TypeScript

Express

PostgreSQL

Prisma ORM

**API Endpoint**
**POST /identify**
Request Body (JSON)
{
  "email": "example@gmail.com",
  "phoneNumber": "123456"
}

Either email or phoneNumber must be provided.

**Response Format**{
  "contact": {
    "primaryContatctId": 1,
    "emails": ["example@gmail.com"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": []
  }
}
**Running Locally**
**Install dependencies**
npm install

**Add .env file**
DATABASE_URL="your_postgres_connection_string"
PORT=3000

**Run migrations**
npx prisma migrate dev

**Start server**
npm run dev

Server runs on http://localhost:3000

**Deployment**
The app is deployed on Render.

**Build command:**
npm install && npx prisma migrate deploy && npm run build

**Start command:**
npm start
