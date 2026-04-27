<img width="501" height="425" alt="logo" src="https://github.com/user-attachments/assets/2968c091-28b7-4b21-8495-4d863ca9cec4" />


# 8THREADS EVENT

## Overview

This project is a web-based platform for event ticket booking and merchandise shopping. The system is built using Next.js, MongoDB Atlas, and Cloudinary to provide a fast, scalable, and user-friendly experience.

Users can browse events, book tickets, purchase related products, and complete payments online. The platform also supports e-ticket delivery via QR code.

---

## Tech Stack

### Frontend
- Next.js (React)
- TailwindCSS / CSS Modules
- Axios / Fetch API

### Backend
- Next.js API Routes
- Node.js

### Database
- MongoDB Atlas

### Media Storage
- Cloudinary

### Authentication
- JWT / NextAuth (optional)

### Payment Integration (planned)
- VNPay / MoMo / ZaloPay

---

## Features

### Event Booking
- View event list
- View event details (time, location, ticket types)
- Search and filter events
- Select ticket type and quantity
- Apply discount vouchers
- Online payment
- Receive e-ticket via email (QR code)

### E-commerce
- View product list
- View product details
- Search and filter products
- Add to cart
- Checkout and payment
- Track orders

### User Management
- Register and login
- Update profile (name, avatar, phone, email)
- View booked tickets
- Track order status

---

## System Architecture

Client (Next.js)  
→ API Routes (Next.js Backend)  
→ MongoDB Atlas  
→ Cloudinary  

---

## Core Modules

### Event Module
- Event listing
- Event details
- Ticket management

### Booking Module
- Ticket selection
- Payment processing
- QR code generation

### Product Module
- Product catalog
- Shopping cart
- Order processing

### User Module
- Authentication
- Profile management

---

## Main Workflows

### Booking Flow
1. User logs in
2. Browse events
3. Select event and ticket
4. Apply voucher (optional)
5. Make payment
6. Receive QR ticket via email

### Shopping Flow
1. Browse products
2. Add to cart
3. Checkout
4. Enter shipping information
5. Payment
6. Track order

---

## Database Design (MongoDB)

Collections:
- Users
- Events
- Tickets
- Orders
- Payments
- Ticket_types
- Vouchers

Database Schema:

<img width="856" height="613" alt="image" src="https://github.com/user-attachments/assets/35dd59aa-92f6-4462-9e60-d111de47c7ff" />

---

## Cloudinary Usage

- Store event banners
- Store product images
- Store user avatars
- Optimize images for performance

---

## Non-functional Requirements

- Responsive UI
- Fast performance
- Secure payment
- Scalable architecture
- Easy-to-use interface

---

## Installation

```bash
git clone <your-repo>
cd <project-folder>
npm install
npm run dev
