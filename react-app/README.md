# Coffee Payment App

This React app represents a coffee payment system among coworkers. Each day, a different coworker is designated as the payer, responsible for the total payment. The app considers weekdays (Monday to Friday) as business days.

## Instructions:

### 1. Build and Run the Solution:

- Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
- Open a terminal window and navigate to the project directory.
- Run the following commands to install the dependencies:

```bash
npm install
```

- After the installation is complete, run the following command to start the development server:

```bash
npm start
```

- The app will be accessible in your browser at [http://localhost:3000](http://localhost:3000).

### 2. Simulate a Different Date:

- The app provides an option to simulate a different date for testing purposes. In the app UI, you will find a date picker labeled "Simulated Date."

- Use the date picker to select a date you want to simulate, and the app will adjust its behavior accordingly.

### 3. Interacting with the App:

- The app represents a coffee payment system among coworkers.
- Each day, a different coworker is designated as the payer for the day, and they are responsible for the total payment.
- The app considers weekdays (Monday to Friday) as business days.

### 4. Notes and Assumptions:

- The app assumes a standard workweek with weekdays designated as business days.
- It is presumed that coffee purchases by coworkers occur exclusively on business days.
- The application is designed to accommodate a team of 7 workers.
- The payment history of coworkers is monitored, and the payment cycle resets after each coworker has paid. This cycle spans 7 business days.
- The simulated date feature is for testing purposes only and does not affect the actual system date, It is not intended for use by frontend users but serves as a tool for developers to simulate specific dates during testing scenarios.
- The app uses the MUI (Material-UI) library for the user interface components.