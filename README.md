# Onboardio

# Onboardio - Onboarding Web App

Onboardio is a web application designed to streamline the onboarding process for managers by facilitating the sending of emails to new employees. It utilizes React for the frontend, Node.js with Express for the backend, and Firebase for authentication and email sending functionality.

## Features

- **Email Sending**: Managers can easily send onboarding emails to new employees directly from the application.
- **User Management**: Secure user authentication and management powered by Firebase Authentication.
- **Intuitive Interface**: A user-friendly interface built with React to provide a smooth onboarding experience.
- **Customizable Templates**: Ability to customize and save email templates for different onboarding scenarios.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime environment for server-side development.
- **Express**: A minimalist web framework for Node.js to handle backend logic and routing.
- **Firebase**: A platform providing various services including authentication, real-time database, and cloud functions.
- **Nodemailer**: A module for Node.js applications used for sending emails.

## Installation

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/your_username/onboardio.git
   ```

2. Navigate to the project directory:

   ```bash
   cd onboardio
   ```

3. Install dependencies for both the frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. Set up Firebase authentication and configure your Firebase project settings.

5. Configure your Firebase project to enable email sending functionality using Firebase Functions or Firebase Cloud Messaging (FCM).

6. Set up environment variables for your Firebase configuration and other sensitive information in `.env` files for both the frontend and backend.

## Usage

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm start
   ```

3. Access the application in your web browser at `http://localhost:3000`.

4. Log in with your Firebase authentication credentials to access the dashboard and send onboarding emails to new employees.

## Contact

For any inquiries or support, please contact us at elarebai@gmail.com
