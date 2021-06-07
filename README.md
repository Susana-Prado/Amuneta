# Amuneta

## Description

E-commerce built with Node.js, Express.js, MongoDB and React. 

This website displays products that are for sale. Unregistered users can search and visit detail pages for each product, as well as make a purchase, add and remove products to/from their cart and specify the quantity of each item. They can then enter their address and choose Stripe to handle the payment process.

Registered users will also be able to access their profile page, with address, payment and order history information.

## User Stories

- **404:** As a user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.

- **Sign up:** As an user I can sign up in the platform.

- **Login:** As a user I can login to the platform and go to my profile.

- **Logout:** As a user I can logout from the platform so no one else can use it.

- **Edit profiles** As a user I can edit my profile.

- **View products** As a user I can see the products list and filter them.

- **Add to cart** as a user I can add to cart the products and pay through Stripe.

  

## Backlog

- Nodemailer for sign up and pay.

- Different navbar depending on user.

- Styled-components / Material UI.

- Recovery password functionality.

- Responsive design.

- Cloudinary to add files.

- Blog.

- Sass.

- Social Login with Google.

- Chat.

  

# Client / Frontend

## React Router Routes (React App)

| Path            | Component   | Permissions           | Behavior                                                     |
| --------------- | ----------- | --------------------- | ------------------------------------------------------------ |
| `/`             | SplashPage  | public `<Route>`      | Home page                                                    |
| `/signup`       | SignupPage  | user `<AnonRoute>`    | Sign up form, link to login, navigate to homepage after sign up. |
| `/login`        | LoginPage   | user`<AnonRoute>`     | Login form, link to sign up, navigate to homepage after login |
| `/products`     | ProductList | user `<AnonRoute>`    | Shows all products in a list and filter them                 |
| `/products/:id` | Product     | user `<AnonRoute>`    | Details of a product                                         |
| `/profile`      | Profile     | user `<PrivateRoute>` | Profile details                                              |
| `/profile-edit` | ProfileEdit | user `<PrivateRoute>` | Edit user profile                                            |
| `/cart`         | Cart        | user `<AnonRoute>`    | See user cart                                                |
| `/about`        | About       | user `<AnonRoute>`    | About information page                                       |
| `/contact`      | Contact     | user `<AnonRoute>`    | Contact details                                              |

## Components

- HomePage
- Navbar
- LoginPage
- SignUpPage
- ProductsPage
- ProductDetailsPage
- ProfilePage
- ProfileEdit
- CarPage
- AboutPage
- ContactPage



## Services

- Auth Service

  - auth.login(data)
  - auth.signup(data)
  - auth.logout()
  - isLoggedIn()
  - auth.getUser()
  - auth.editUser(data)
  - auth.deleteUser()

- Product Service

  - product.get()
  - product.getFiltered(data)
  - product.getOne(id)
  - product.addToCart(id)
  - product.deleteFromCart(id)

  

# Server / Backend

## Models

User model

```javascript
{
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  address: {
            street: String,
            number: Number
            city: String,
            country: String
        }
  password: {type: String, required: true}
}
```

Product model

```javascript
{
  name: {type: String},
  price: {type: Number},
  description: {type: String},
 }
```



## API Endpoints (back-end routes)

|            |                       |                                                              |                |              |                                   |
| ---------- | --------------------- | ------------------------------------------------------------ | -------------- | ------------ | --------------------------------- |
| **Method** | **Route**             | **Description**                                              | Success status | Error status | Request - Body                    |
| `GET`      | `/`                   | Main page route.                                             |                |              |                                   |
| `POST`     | `/auth/login`         | Sends Login form data to the server.                         | 200            | 401          | { email, password }               |
| `POST`     | `/auth/signup`        | Sends Sign Up info to the server and creates user in the DB. | 201            | 404          | { email, password }               |
| `GET`      | `/auth/profile`       | Private route. Gets user data.                               |                |              |                                   |
| `PUT`      | `/auth/profile- edit` | Private route.  Sends edit-profile info to server and updates user in DB. | 200            | 400          | { email, password, name, address} |
| `DELETE`   | `/auth/profile- edit` | {id}                                                         | 201            | 400          | delete user                       |
| `POST`     | `/auth/logout`        | Logs out the user                                            | 204            | 400          |                                   |
| `GET`      | `/products`           | Get products list.                                           |                |              |                                   |
| `GET`      | `/products/:id`       | Get particular product details.                              |                |              | {id}                              |
| `POST`     | `/products/:id`       | Add product to cart.                                         | 200            | 404          | {id}                              |



## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/yhzT2W50/e-commerce)

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/Susana-Prado/Amuneta)

[Deployed App Link](http://heroku.com/)
