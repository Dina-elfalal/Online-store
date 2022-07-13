# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

| Method | Route          | HTTP Verb |Token Required|
| :---:  |     :---:      |    :---:  | :---: |
| INDEX  | ('/products')  |[GET]      |:x:|
| SHOW   | ('/products/:id')|[GET]    |:x: |
|CREATE  |('/products')   |[POST]     |:heavy_check_mark:|
|UPDATE  |('/products')|[PUT]         |:heavy_check_mark:|
|DELETE  |('/products/:id')|[DELETE]  |:heavy_check_mark:|
|Products By Category|('/products?category=')|[GET]|:x:|

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

| Method | Route          | HTTP Verb |Token Required|
| :---:  |     :---:      |    :---:  | :---: |
| INDEX  | ('/users')  |[GET]      |:heavy_check_mark:|
| SHOW   | ('/users/:id')|[GET]    |:heavy_check_mark: |
|CREATE  |('/users')   |[POST]     |:x:|
|UPDATE  |('/users')|[PUT]         |:heavy_check_mark:|
|DELETE  |('/users/:id')|[DELETE]  |:heavy_check_mark:|
|Authenticate|('/users/authenticate')|[POST]|:heavy_check_mark:|

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]


| Method | Route          | HTTP Verb |Token Required|
| :---:  |     :---:      |    :---:  | :---: |
| INDEX  | ('/orders')  |[GET]      |:heavy_check_mark:|
| SHOW   | ('/orders/:id')|[GET]    |:heavy_check_mark:|
|CREATE  |('/orders')   |[POST]     |:heavy_check_mark:|
|UPDATE  |('/orders')|[PUT]         |:heavy_check_mark:|
|DELETE  |('/orders/:id')|[DELETE]  |:heavy_check_mark:|
|Completed Orders|('/orders/completedOrders/:id')|[GET]|:heavy_check_mark:|

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

### Products Table

| Columns      | Data Type |
| :---:     | :---: |
| id        | PRIMARY KEY |
| name      | VARCHAR(50) |
|description|VARCHAR(255)|
|price      |NUMERIC(17, 2)|
|category   |VARCHAR(50)|


#### User
- id
- firstName
- lastName
- password

### Users Table

| Columns      | Data Type |
| :---:     | :---: |
|id|PRIMARY KEY|
|user_name|VARCHAR(100)| 
|first_name|VARCHAR(100)|
|last_name|VARCHAR(100)|
|password_digest|VARCHAR|


#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

### Orders Table

| Columns      | Data Type |
| :---:     | :---: |
|id|PRIMARY KEY|
|user_id|foreign key to users table|
|status|VARCHAR(64)|

### Order-Products [Join Table]

| Columns      | Data Type |
| :---:     | :---: |
|id|PRIMARY KEY|
|quantity|INTEGER|
|product_id|foreign key to products table|
|order_id|foreign key to orders table|


### Dashboards

| Method |     Route          | HTTP Verb |
| :---:  |     :---:          |    :---:  |
| Get all products in orders|('/products_in_orders')|[GET]|
| Get all users that have made orders|('/users-with-orders')|[GET]|
|Get the 5 most expensive products|('/five-most-expensive')|[GET]|
|Get Top 5 most popular products|('/top-five')|[GET]|



