# Amantik أمانتك

**Amantik** is a Kuwait University Lost & Found reporting system. The website allows students and university users to report lost or found items, upload item images, add location/date/contact details, and browse reports by lost items, found items, or college.

This project was created for **CS 335 – Web Development**.

---

## Project Overview

Many students lose personal items on campus, and it can be difficult to know where to ask or where to check. Amantik solves this problem by providing one organized platform for lost and found reports.

Users can:

- Create an account and log in.
- Continue as a guest to browse reports.
- Submit a lost item report.
- Submit a found item report.
- Upload an image for the item.
- Add item details such as college, location, date, category, and contact information.
- View all lost reports.
- View all found reports.
- View reports by college.
- Open a report details page.
- Edit their profile information.

---

## Main Features

### Authentication

- User sign up with username, email, password, and college.
- User login using email and password.
- Passwords are hashed using **bcryptjs** before being stored in the database.
- Duplicate usernames or emails are prevented.

### Lost and Found Reports

- Users can submit lost item reports.
- Users can submit found item reports.
- Each report can include:
  - Item name
  - Description
  - College
  - Specific location
  - Date
  - Image
  - Contact details
  - Category
  - Status
  - Posted by user ID

### Image Uploads

- Images are uploaded using **Multer**.
- Only image files are accepted.
- Uploaded files are stored in the backend `uploads/` folder.
- Uploaded images are served through the `/uploads` static route.

### Report Browsing

- View all lost items.
- View all found items.
- Filter reports by college.
- View single lost/found item details.

### Profile

- Users can view their profile.
- Users can update their profile information.

---

## Technology Stack

### Frontend

- React
- Vite
- React Router DOM
- Bootstrap
- CSS

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer
- bcryptjs
- CORS

### Tools

- Visual Studio Code
- GitHub
- MongoDB Atlas

---

## Project Structure

```text
amantik/
├── Frontend/                  # Frontend React project
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Images and logos
│   │   ├── database/           # Earlier mock database files
│   │   ├── pages/              # React pages
│   │   ├── styles/             # CSS files
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── backend/                    # Backend server
│   ├── models/                 # Mongoose schemas
│   │   ├── FoundItem.js
│   │   ├── LostItem.js
│   │   └── User.js
│   ├── uploads/                # Uploaded item images
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## Installation and Setup

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB Atlas account or connection string

---

## Running the Backend

Open a terminal and go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run the backend server:

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

To test if the backend is working, open:

```text
http://localhost:5000/
```

Expected result:

```text
Backend is running!
```

---

## Running the Frontend

Open another terminal and go to the frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Vite will show the local development link, usually:

```text
http://localhost:5173
```

Open that link in the browser to use the website.

---

## Backend API Endpoints

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/signup` | Create a new user account |
| POST | `/api/login` | Log in an existing user |

### User APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/user/:id` | Get user profile data |
| PUT | `/api/user/:id` | Update user profile data |

### Lost Item APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/lost` | Get all lost item reports |
| GET | `/api/lost/:id` | Get one lost item by ID |
| POST | `/api/lost` | Submit a new lost item report |

### Found Item APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/found` | Get all found item reports |
| GET | `/api/found/:id` | Get one found item by ID |
| POST | `/api/found` | Submit a new found item report |

---

## Database Design

The project uses MongoDB Atlas with three main collections.

### Users Collection

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Auto-generated user ID |
| `username` | String | Unique username |
| `email` | String | Unique email address |
| `password` | String | Hashed password |
| `college` | String | User college |
| `joinedAt` | Date | Account creation date |

### Lost Items Collection

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Auto-generated report ID |
| `item` | String | Lost item name |
| `description` | String | Item description |
| `college` | String | College where item was lost |
| `location` | String | Specific location |
| `date` | String | Date lost |
| `image` | String | Uploaded image path |
| `contact` | String | Contact details |
| `category` | String | Item category |
| `status` | String | Report status |
| `postedBy` | String | User ID of poster |

### Found Items Collection

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Auto-generated report ID |
| `item` | String | Found item name |
| `description` | String | Item description |
| `college` | String | College where item was found |
| `location` | String | Specific location |
| `date` | String | Date found |
| `image` | String | Uploaded image path |
| `contact` | String | Contact details |
| `category` | String | Item category |
| `status` | String | Report status |
| `postedBy` | String | User ID of poster |

---

## Security Measures

- Passwords are hashed using **bcryptjs**.
- Users must be logged in to submit lost or found reports.
- Duplicate accounts are prevented using unique username and email validation.
- File upload validation only allows image files.
- The backend uses try/catch blocks to handle errors.
- The frontend redirects unauthorized users to the login page.

---

## Testing Summary

The project was tested with the following cases:

- User signup with valid information.
- Duplicate signup prevention.
- User login with correct email and password.
- Invalid login handling.
- Submit lost item report.
- Fetch all lost item reports.
- Submit found item report.
- Fetch all found item reports.
- Prevent report submission when the user is not logged in.

All listed test cases passed during project testing.

---

## Future Enhancements

Possible improvements for future versions:

- Allow users to view all their posts in the profile page.
- Allow users to edit or delete their own reports.
- Allow users to update report status, such as lost, found, or returned.
- Add direct messaging between users for specific items.
- Display the owner/poster information on each report.
- Add stronger search and filtering options.
- Add admin or Security & Safety Department dashboard.
- Move the MongoDB connection string to a `.env` file for better security.
- Deploy the frontend and backend online.

---

## Team Members

- Wadhhaa Alotaibi
- Soukaina Alwosaibae

---

## Course Information

**Course:** CS 335 – Web Development  
**Project:** Amantik – Kuwait University Lost & Found Reporting System  
**Semester:** Fall 2025/2026

---
