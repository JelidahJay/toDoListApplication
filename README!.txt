# To-Do List Application

This is a simple To-Do List application built with Spring Boot for the backend and React for the frontend.

## Dependencies Used

### Backend Dependencies:
1. PostgreSQL Driver
2. Lombok
3. Spring Web
4. Spring Security JWT
5. Jackson (for JSON processing)
6. JWT API
7. JWT Web

### Frontend Dependencies:
1. React JS
2. Material-UI
3. PostgreSQL (for the backend database)
4. PgAdmin (for managing the PostgreSQL database)

## Setting up the Database

1. Create a database named "to_do_list" in PgAdmin or any PostgreSQL database management tool.

2. Run the SQL scripts in `scripts.sql` to create the necessary schemas and tables in the "to_do_list" database.

## Setting up the Backend

1. Open the `backend` folder in IntelliJ IDEA or any suitable IDE.

2. Wait for all Gradle dependencies to be installed.

3. Modify the database connection string in `src/main/resources/application.properties` to match your PostgreSQL database configuration.

4. Run the Spring Boot application.

## Setting up the Frontend

1. Open the `frontend` folder in WebStorm or any other suitable IDE.

2. Open the terminal and run the following commands:
    ```
    npm install
    ```

3. Once the installation of dependencies is complete, start the frontend application by running:
    ```
    npm start
    ```

## Usage

1. Open your web browser and navigate to `http://localhost:3000` to access the To-Do List application.

2. Register a new user on the user interface.

3. Start adding tasks to your to-do list!

That's it! You've successfully set up and run the To-Do List application. Enjoy organizing your tasks!
