#### Register a new user

```https://qzero-market-backend.herokuapp.com/api/auth/register
  POST /auth/register
```

| Request Body | Type     | Description                |
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

| Request Body | Type     | Description                |
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

| Request Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstname` | `string` | **Not required**  |
| `lastname` | `string` | **Not required** |
| `username` | `string` | **Not required** |
| `email` | `string` | **Not required** |
| `password` | `string` | **Not required** |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |

#### Delete a user

```https://qzero-market-backend.herokuapp.com/api/users/{id}
  DELETE /users/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |

#### Create a category

```https://qzero-market-backend.herokuapp.com/api/categories
  POST /categories
```

| Request Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required** |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |

#### Get category by id

```https://qzero-market-backend.herokuapp.com/api/categories/find/{id}
  GET /categories/find/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |

#### Get all categories

```https://qzero-market-backend.herokuapp.com/api/categories
  GET /categories
```

#### Update a category

```https://qzero-market-backend.herokuapp.com/api/categories/{id}
  PUT /categories/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |

| Request Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**  |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |

#### Delete a category

```https://qzero-market-backend.herokuapp.com/api/categories/{id}
  DELETE /categories/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |

#### Create a product

```https://qzero-market-backend.herokuapp.com/api/products
  POST /products
```

| Request Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required** |
| `description` | `string` | **Required** |
| `price` | `number` | **Required** |
| `categories` | `string[]` | **Required** |
| `image` | `multipart/form-data` | **Required** |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |

#### Get product by id

```https://qzero-market-backend.herokuapp.com/api/products/{id}
  GET /products/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |

#### Get filtered products

```https://qzero-market-backend.herokuapp.com/api/products/?categories=All&sort=price&order=desc&page=0&limit=10
  GET /products
```

| Query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `categories` | `string` | **Not required** |
| `sort` | `string` | **Not required** |
| `order` | `string` | **Not required** |
| `page` | `string` | **Not required** |
| `limit` | `string` | **Not required** |


#### Update a product

```https://qzero-market-backend.herokuapp.com/api/products/{id}
  PUT /products/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |

| Request Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Not required**  |
| `description` | `string` | **Not required** |
| `price` | `string` | **Not required** |
| `categories` | `string` | **Not required** |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |

#### Delete a product

```https://qzero-market-backend.herokuapp.com/api/products/{id}
  DELETE /products/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your JWT token |
