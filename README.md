# qzeromarket v2

The "qzeromarket v2" is a full-stack e-commerce application developed with the MERN stack, leveraging TypeScript and Redux Toolkit. As a student and budding developer, the creation of this application has been a challenging yet enlightening journey that has significantly advanced my skills in full-stack web development.

The continuous evolution of this project's codebase reflects the numerous improvements and iterations it has undergone. With each alteration, I have strived for better performance, maintainability, and scalability, treating each development phase with the utmost seriousness and respect.

This application not only served as a testament to my previously acquired skills but also as an invaluable learning platform. I delved into aspects of programming that were new to me, such as making code more readable. The experience reinforced the understanding that we write code primarily for people, not machines. It is of paramount importance that the code we create is readable, understandable, and maintainable for other developers.

Through qzeromarket v2, I have gained a profound appreciation for the art of programming and the importance of continuous learning and improvement. I'm excited to present qzeromarket v2, and I look forward to the many more learning opportunities that lie ahead.

## Tech Stack
The qzeromarket v2 application is built with the following technologies:

**Client:** 
- Axios
- DALL-E (OpenAI) - Used for rendering product images
- Jest
- Material UI
- Particles
- React.js
- React Router
- React-Toastify
- Redux Toolkit
- Redux-persist
- Styled Components
- TypeScript

**Server:** 
- Express.js
- Jest
- Mongoose
- MongoDB
- Node.js
- TypeScript

## API Reference

#### Register a new user

```https://qzero-market-backend.herokuapp.com/api/auth/register
  POST /auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstname` | `string` | **Required** |
| `lastname` | `string` | **Required** |
| `username` | `string` | **Required** |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Login

```https://qzero-market-backend.herokuapp.com/api/auth/login
  POST /auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Get user by id

```https://qzero-market-backend.herokuapp.com/api/users/find/{id}
  GET /users/find/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |

#### Get all users

```https://qzero-market-backend.herokuapp.com/api/users
  GET /users
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |

#### Get user by jwt

```https://qzero-market-backend.herokuapp.com/api/users/profile
  GET /users/profile
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |

#### Update a user

```https://qzero-market-backend.herokuapp.com/api/users/{id}
  PUT /users/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |
| `firstname` | `string` |  |
| `lastname` | `string` |  |
| `username` | `string` |  |
| `email` | `string` |  |
| `password` | `string` |  |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |

#### Delete a user

```https://qzero-market-backend.herokuapp.com/api/users/{id}
  DELETE /users/{id}
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |
