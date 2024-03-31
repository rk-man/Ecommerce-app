# ECOMMERCE APP

## Description

This project is a simple web application that allows users to authorize and select categories they are interested in. It utilizes the [T3 framework](https://create.t3.gg/), which consists of Next.js for the frontend, Tailwind CSS for styling, TRPC for API handling, Prisma for database management, and PostgreSQL hosted on [Neon](https://neon.tech/) for data storage.

## Features

- **User Authorization**: Users can sign up, log in, and log out securely.
- **Category Selection**: Authenticated users can select categories they are interested in from a list.
- **Persistent Data Storage**: User data and selected categories are stored securely in a PostgreSQL database hosted on [Neon](https://neon.tech/).



## Technologies Used

The entire application is built using [T3 stack](https://create.t3.gg/) which comprises of the following technologies.

- **Next.js**: React framework for building full stack applications with server side rendering and static site generation.
- **Tailwind CSS**: CSS framework for styling.
- **TRPC**: Framework for writing efficient TypeScript-powered APIs. It minimizes the effort in maintaining types for same data in both client and server.
- **Prisma**: The ORM for efficient communication between application and database.
- **PostgreSQL**: Open-source relational database management system.


## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/Ecommerce-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Ecommerce-app
    ```

3. Set up environment variables:

- Create a `.env` file in the root directory and add the following variables:

    ```bash
    DATABASE_URL=YOUR_DATABASE_URL
    AUTH_SECRET_KEY=YOUR_AUTH_SECRET_KEY

    EMAIL_USER=YOUR_EMAIL
    EMAIL_PASSWORD=YOUR_APP_PASSWORD

    FRONTEND_URL=http://localhost:3000
    ```

4. Install dependencies:

    ```bash
    npm install
    ```

5. Run the development server:


- Push the schema or tables to the Postgres DB
    ```bash
    npm run db:push
    ```

- Run the application
    ```bash
    npm run dev
    ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

1. **Sign Up:**

- Register your account which will take you to the home page
- Verify your email. The code will be sent to your email id.

2. **Go to Categories:**

- In the home page, click on the **visit categories** button. 
- Browse through the available categories and select the ones you are interested in by clicking on them.

4. **Log Out:**

- To log out, simply click on the **Log Out** button on the top-right.

## Future Enhancements

1. A search functionality to easily filter through the categories

2. Caching mechanism to prevent repeated API calls and improve application's speed.


## Any Queries?

Reach out to me at naveenrk.official@gmail.com or in any of my following social media accounts.

- [Instagram](https://instagram.com/naveen.rk_)
- [LinkedIn](https://linkedin.com/in/naveen-rk)