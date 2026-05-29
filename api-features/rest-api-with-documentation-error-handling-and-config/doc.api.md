# Test User API

This API handles creating new Users, fetching all user data at once or by User Id.

## Base URL

http://127.0.0.1:8000/

## Tech Stack

- Node.js
- Express.js

# 1. Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource Created      |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 429  | Too Many Requests     |
| 500  | Internal Server Error |

# 2. Global Response Structure

## Success Response

{
**"success"**: true,
**"message"**: "User fetched",
**"data"**: {}
}

## Error Response

{
**"success"**: false,
**"message"**: "Invalid credentials",
**"error"**: {}
}

# 3. API Endpoints

## Create User

#### Input

| Input                                                  |
| ------------------------------------------------------ |
| userName : String : Unique id for each user            |
| name : String : Name of the User                       |
| email : String : Email of the User                     |
| password : String : Password to log in to this account |
| confirmPassword : String : to confirm the Password     |

#### Output

{
**"success"**: true,
**"message"**: "User created",
**"data"**: {
"userName": String,
"name": String,
"email": String,
"password": String,
"confirmPassword": String
}
}

#### URI

Methode Post: http://127.0.0.1:8000/user/

## Get User by Id

#### Output

{
"id": Mongoose.Object.Id()
"userName": String,
"name": String,
"email": String,
"password": String,
"confirmPassword": String,
"createdAt": DateTime,
"updatedAt": DateTime
}

#### URI

Methode Get: http://127.0.0.1:8000/user/{id}

## Get all Users

#### Output

[{
"id": Mongoose.Object.Id()
"userName": String,
"name": String,
"email": String,
"password": String,
"confirmPassword": String,
"createdAt": DateTime,
"updatedAt": DateTime
}]

##### URI

Methode Get: http://127.0.0.1:8000/users/
