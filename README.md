# react-supabase-demo
### An example of a simple React App integrating email based authentication with Supabase.
---
## How to start the project  
### Cloning and installing packages

````
git clone https://github.com/railBitsAndHex/react-supabase-demo.git
cd client
yarn add
````

### Starting the application

````
yarn start
````
---
## Pre-requisites needed

### Example `.env.local` file

- Place this file in the `client/` folder  
- **PREFIX-ing** environment variable names with `REACT_APP` is **necessary** to be able to read the environment variables.

````
<!-- Example of a .env.local file -->
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
````
---

## Additional Helpful Resources

| Resource      | Description |
| ----------- | ----------- |
| [React Hook Form](https://react-hook-form.com/)      | Very useful library for handling form validation       |
| [Supabase Docs](https://supabase.com/docs/)   | Docs for Supabase        |
|[React Toastify](https://fkhadra.github.io/react-toastify/introduction/)| Amazing and simple to implement toast notifications for React applications|

