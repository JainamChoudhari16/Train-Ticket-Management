# Railway Booking System

A comprehensive train booking system with user and admin functionalities built using HTML, CSS, Bootstrap, and JavaScript.

## Project Overview

This Railway Booking System allows users to register, log in, book train tickets, view their bookings, and update their profile information. Admins can manage customers, register new trains, and maintain their profiles.

## Features

### User-facing Features
- User Registration and Login with validation
- Dashboard with booking statistics
- Book tickets for available trains
- View booked tickets and cancel them if needed
- Update personal details and password

### Admin-facing Features
- Admin Login
- Dashboard with booking statistics and customer data
- Register new trains
- Delete customers
- Update admin profile

## Tech Stack

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (vanilla)

## Project Structure

```
railway-booking-system/
├── css/
│   └── style.css
├── js/
│   ├── admin.js
│   ├── auth.js
│   ├── customer.js
│   └── main.js
├── pages/
│   ├── admin-dashboard.html
│   ├── customer-dashboard.html
│   ├── login.html
│   └── register.html
├── index.html
└── README.md
```

## Setup Instructions

1. Clone the repository or download the ZIP file.
2. Extract the files to your local machine.
3. Open the `index.html` file in a web browser to view the landing page.

## Demo Credentials

### Customer Login
- Username: user
- Password: Password1!

### Admin Login
- Username: admin
- Password: Admin123!

## Pages and Navigation

- **Landing Page**: Contains information about the railway system and links to login/register
- **Registration Page**: Allows new users to register with validation
- **Login Page**: Authenticates users and directs them to the appropriate dashboard
- **Customer Dashboard**: Contains features for booking and managing tickets
- **Admin Dashboard**: Contains features for managing trains and customers

## Form Validations

### Registration Form
- Username: At least 6 characters, no special characters or numbers
- Password: At least 8 characters with 1 special character, 1 number, and 1 uppercase letter
- Email: Must contain @ and a domain
- Mobile: 10 digits only
- Aadhar: Required

## Contributing

Feel free to fork this project and submit pull requests for any improvements or features you'd like to add.

## License

This project is open source and available under the MIT License. 