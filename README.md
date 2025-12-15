# 🤝 Community Connect – Membership & Event Management for Local Clubs in Bangladesh
---
## 🌐 Live Demo
[https://community-connect-bd.web.app/](https://community-connect-bd.web.app/)

![Screenshot](public/webSample.png)
---
## 🚀 Project Overview
**Community Connect** is a full-stack MERN application designed to help people in Bangladesh discover, join, and manage local clubs (e.g., photography clubs, hiking groups, book clubs, tech meetups). Club managers can create and oversee clubs and events, members can join clubs (with free or paid memberships via Stripe), register for events, and admins can monitor the platform. The app features role-based dashboards, secure payments, authentication, and modern tools for a seamless user experience.

Built with responsive design, animations, and advanced features like search/filtering, this project showcases secure, scalable full-stack development.
---
## 🎯 Project Goal
To foster community engagement in Bangladesh by:
- Enabling users to easily find and join local clubs and events
- Empowering club managers to organize and monetize activities
- Providing admins with tools for oversight and platform management
- Promoting social connections through hobbies, interests, and local initiatives
---
## 🛠 Key Features
- Create and manage clubs by Manager
- Browse and search approved clubs by name or filter by category in a responsive grid
- View club details and join (free or via Stripe for paid memberships)
- Create and manage events for clubs by Manager
- Browse upcoming events with sorting options 
- View event details and register (free or paid via Stripe)

## 🔐 Authentication & Security
- Email/Password registration with validation + Google Sign-In
- Firebase Authentication + JWT for backend route protection
- Role-based access control
- Protected private routes for dashboards and sensitive actions
- Persistent auth state on reload (no unwanted logouts)
- Secure Stripe integration (test mode) handled server-side

## 🎨 UI/UX & Polish
- Unique, modern design with pleasant color contrast, consistent typography, spacing, and button styles
- Fully responsive across mobile, tablet, and desktop (collapsible sidebar on small screens)
- Framer Motion animations for hero sections, card appearances, and transitions
- React Hook Form for all forms with user-friendly errors
- TanStack Query for data fetching/mutations with loading spinners/skeletons
- Toast/SweetAlert notifications for actions (success, errors)
- 404/Error page with "Back to Home" button
- Consistent navbar and footer across pages

## 📊 Role-Based Dashboards
- **Admin Dashboard**: Overview stats (users, clubs, memberships, events, payments), manage users/roles, approve/reject clubs, view payments/transactions, simple charts (e.g., memberships per club)
- **Club Manager Dashboard**: Overview (clubs managed, members, events, payments), CRUD for clubs/events, view club members and event registrations
- **Member Dashboard**: Overview (joined clubs, registered events), list my clubs/events, payment history
---

## 🔥 Additional Highlights
- Data caching and efficient fetching using TanStack Query
- Server-side and client-side filtering, sorting, and searching 
- Firebase token verification middleware for protected APIs
- Stripe payment flow: Create intents/sessions server-side, confirm client-side, link to memberships/registrations
- Database collections: users, clubs, memberships, events, eventRegistrations, payments
- Environment variables for Firebase/MongoDB/Stripe keys (no exposures)
- Original design (no copies from Meetup/Eventbrite or past projects)
---
## 💻 Tech Stack
### 🧩 Frontend
- React
- Tailwind CSS
- Framer Motion
- React Hook Form
- TanStack Query
- React Router
- Firebase
- React Hot Toast
- SweetAlert2
- Axios
- Recharts
- Swiper
- React Icons
- React Loader Spinner
- Other: @lottiefiles/dotlottie-react, @tanstack/react-query-devtools, motion, primereact, react-calendar, react-date-picker

### 🔥 Backend
- Node.js + Express.js
- MongoDB (Atlas)
- RESTful API with JWT-protected routes

### 🔐 Authentication
- Firebase Authentication (Email/Password + Google)

### 💳 Payments
- Stripe (test mode)

### 🚀 Deployment
- Frontend → Firebase
- Backend → Vercel
- Database → MongoDB Atlas
---
## 🔑 Login Credentials (for Testing)

| Role          | Email              | Password  |
|---------------|--------------------|-----------|
| Admin        | admin1@gmail.com  | Admin1   |
| Club Manager | manager1@gmail.com | Manager1 |
| Member       | user1@gmail.com    | User#1   |

---
## 📝 Author
Md Nurnabi Rana
Email: [mdnurnabirana.cse@gmail.com](mailto:mdnurnabirana.cse@gmail.com)  
GitHub: [https://github.com/mdnurnabirna](https://github.com/mdnurnabirana)