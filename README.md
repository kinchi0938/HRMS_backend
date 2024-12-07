# Employee Management System API Documentation

## 목차
- [Base URLs](#base-urls)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Authentication & User Management](#authentication--user-management)
  - [Employee Management](#employee-management)
  - [Comments](#comments)
- [Error Responses](#error-responses)
- [Data Types](#data-types)

## Base URLs

| Service | URL |
|---------|-----|
| Authentication & Root | `/api` |
| Employees | `/api/employees` |
| Comments | `/api/comments` |

## Authentication

모든 보호된 라우트는 Authorization 헤더에 JWT 토큰이 필요합니다:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication & User Management

#### Login
| 항목 | 설명 |
|-----|-----|
| URL | `/api/login` |
| Method | `POST` |
| Auth Required | No |
| Request Body | `{ username, password }` |

**Request Example**
```json
{
  "username": "john.doe",
  "password": "password123"
}
```

**Success Response (200)**
```json
{
  "message": "Auth successful",
  "token": "jwt.token.here",
  "user": {
    "username": "john.doe",
    "id": "user_id"
  }
}
```

#### Get Logged In User
| 항목 | 설명 |
|-----|-----|
| URL | `/api` |
| Method | `GET` |
| Auth Required | Yes |

**Success Response (200)**
```json
{
  "username": "john.doe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "employee"
}
```

#### Signup
| 항목 | 설명 |
|-----|-----|
| URL | `/api/signup` |
| Method | `POST` |
| Auth Required | No |
| Required Fields | username, password, passwordConfirm, firstName, lastName, email, role |

**Request Body**
```json
{
  "username": "john.doe",
  "password": "password123",
  "passwordConfirm": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "street": "Main St",
  "housenumber": "123",
  "zipcode": 12345,
  "city": "New York",
  "country": "USA",
  "role": "employee",
  "admin": false
}
```

### Employee Management

#### Get All Employees
| 항목 | 설명 |
|-----|-----|
| URL | `/api/employees` |
| Method | `GET` |
| Auth Required | Yes |

#### Get Employee Profile
| 항목 | 설명 |
|-----|-----|
| URL | `/api/employees/:id` |
| Method | `GET` |
| Auth Required | No |

#### Edit Employee
| 항목 | 설명 |
|-----|-----|
| URL | `/api/employees/edit/:id` |
| Method | `PUT` |
| Auth Required | Yes |
| Required Fields | username, firstName, lastName, email, role |

**Request Body**
```json
{
  "username": "john.doe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "street": "Main St",
  "housenumber": "123",
  "zipcode": 12345,
  "city": "New York",
  "country": "USA",
  "role": "employee"
}
```

#### Delete Employee
| 항목 | 설명 |
|-----|-----|
| URL | `/api/employees/:id` |
| Method | `DELETE` |
| Auth Required | Yes |

### Comments

#### Create Comment
| 항목 | 설명 |
|-----|-----|
| URL | `/api/comments` |
| Method | `POST` |
| Auth Required | Yes |
| Required Fields | username, text, author |

**Request Body**
```json
{
  "username": "john.doe",
  "text": "Comment text",
  "author": "John Doe"
}
```

## Error Responses

| Status Code | Description | Response Format |
|------------|-------------|-----------------|
| 400 | Bad Request | `{ "errorMessage": "Error details" }` |
| 401 | Unauthorized | `{ "message": "Unauthorized" }` |
| 403 | Forbidden | `{ "errorMessage": "Error details" }` |
| 500 | Server Error | `{ "message": "Error message", "error": "Error details" }` |

## Data Types

### Employee Type
```typescript
interface Employee {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  street?: string;
  housenumber?: string;
  zipcode?: number;
  city?: string;
  country?: string;
  role: string;
  admin?: boolean;
  comments?: Comment[];
}
```

### Comment Type
```typescript
interface Comment {
  username: string;
  text: string;
  author: string;
  createdAt: Date;
}
```
