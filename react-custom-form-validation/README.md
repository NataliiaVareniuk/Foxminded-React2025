**React Custom Form Validation**

An example of custom form validation in React implemented without external form libraries.

**Live Demo**
[View the live app](https://.netlify.app/)

**Description**

This project demonstrates how to validate form fields such as email, password, and confirm password using custom logic with React hooks and JavaScript.
No external form libraries like react-hook-form, yup, or zod are used.

**Technologies**

React 19.x
JavaScript (ES6+)
SCSS

**Features**
Required field validation
Email format validation
Password length validation
Password match (confirm password)
Real-time error display
Submit button disabled until the form is valid

**Vite or Create React App**
Getting Started

**Clone the repository:**
git clone https://github.com/NataliiaVareniuk/Foxminded-React2026

**Navigate to the project folder:**
cd Foxminded-React2026/react-custom-form-validation

**Install dependencies:**

npm install

**Start the development server:**
npm start
The app will open in your browser, usually at http://localhost:3000

**Form validation uses:**

Custom validation functions
React state to store errors
Event handlers (onChange, onBlur)

**Purpose**

This project demonstrates practical approaches to:

Implementing form validation without libraries
Separating validation logic from UI
Managing error state
Improving user experience with real-time feedback

**Possible Improvements**

Integration with react-hook-form
Schema-based validation (yup, zod)
Unit and integration tests
More complex forms (multi-step, dynamic fields)

**Project Structure**
src/
├── components/ # Form components
├── hooks/ # Custom hooks for validation
├── styles/ # CSS / SCSS
├── utils/ # Utility functions
└── App.jsx

**License**
Educational project, free to use and modify.
