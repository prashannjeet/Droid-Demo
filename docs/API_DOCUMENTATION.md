# API Documentation - Droid Demo Authentication Service

## 📋 Overview

This document describes the dummy authentication API service used in the Droid Demo application. The service simulates a real backend API for demonstration purposes.

> ⚠️ **Important**: This is a mock API implementation for demo purposes only. In a production environment, this would be replaced with actual HTTP endpoints to a secure backend service.

## 🔧 Service Structure

### Base Service: `authService`

Location: `src/services/authService.ts`

```typescript
export const authService = {
  login: (email: string, password: string) => Promise<LoginResponse>,
  logout: () => Promise<void>,
  validateToken: (token: string) => Promise<{valid: boolean; user?: User}>,
  checkEmailExists: (email: string) => Promise<boolean>,
  getDemoUsers: () => Array<Omit<User, 'password'>>
}
```

## 📊 Data Types

### User
```typescript
interface User {
  id: number;          // Unique identifier
  name: string;        // Full name
  email: string;       // Email address (unique)
  role: string;        // User role (Administrator, User, Manager)
}
```

### LoginResponse
```typescript
interface LoginResponse {
  success: boolean;    // Authentication success flag
  message?: string;    // Response message
  user?: User;         // User data (if successful)
  token?: string;      // JWT token (if successful)
}
```

### Mock User Database
```typescript
const MOCK_USERS = [
  {
    id: 1,
    name: 'John Admin',
    email: 'admin@example.com',
    password: '***demo***', // See README for actual demo credentials
    role: 'Administrator'
  },
  {
    id: 2,
    name: 'Jane User', 
    email: 'user@example.com',
    password: '***demo***', // See README for actual demo credentials
    role: 'User'
  },
  {
    id: 3,
    name: 'Bob Manager',
    email: 'manager@example.com', 
    password: '***demo***', // See README for actual demo credentials
    role: 'Manager'
  }
];
```

## 🔐 Authentication Endpoints

### 1. Login

**Method**: `authService.login(email, password)`  
**Purpose**: Authenticate user credentials  
**Simulates**: `POST /api/auth/login`

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| email | string | Yes | User's email address |
| password | string | Yes | User's password |

#### Request Example
```typescript
const response = await authService.login(
  'admin@example.com',
  'demo-password' // See README for actual credentials
);
```

#### Response Examples

**Success Response:**
```typescript
{
  success: true,
  message: "Login successful",
  user: {
    id: 1,
    name: "John Admin",
    email: "admin@example.com", 
    role: "Administrator"
  },
  token: "fake-jwt-token-1-1699891234567"
}
```

**Error Responses:**
```typescript
// User not found
{
  success: false,
  message: "User not found. Please check your email address."
}

// Invalid password
{
  success: false,
  message: "Invalid password. Please try again."
}
```

#### Implementation Details
- Simulates 1.5 second API delay
- Case-insensitive email matching
- Plaintext password comparison (demo only)
- Generates mock JWT token with format: `fake-jwt-token-{userId}-{timestamp}`
- Logs authentication attempts to console

### 2. Logout

**Method**: `authService.logout()`  
**Purpose**: End user session  
**Simulates**: `POST /api/auth/logout`

#### Parameters
None

#### Request Example
```typescript
await authService.logout();
```

#### Response
Returns `Promise<void>` - No response data

#### Implementation Details
- Simulates 0.5 second API delay
- Logs logout event to console
- In production would invalidate server-side sessions

### 3. Token Validation

**Method**: `authService.validateToken(token)`  
**Purpose**: Verify JWT token validity  
**Simulates**: `GET /api/auth/validate`

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| token | string | Yes | JWT token to validate |

#### Request Example
```typescript
const result = await authService.validateToken(
  'fake-jwt-token-1-1699891234567'
);
```

#### Response Examples

**Valid Token:**
```typescript
{
  valid: true,
  user: {
    id: 1,
    name: "John Admin",
    email: "admin@example.com",
    role: "Administrator" 
  }
}
```

**Invalid Token:**
```typescript
{
  valid: false
}
```

#### Implementation Details
- Simulates 0.5 second API delay
- Validates token format and extracts user ID
- Returns user data if token is valid

### 4. Email Existence Check

**Method**: `authService.checkEmailExists(email)`  
**Purpose**: Check if email exists in system  
**Simulates**: `GET /api/auth/check-email`

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| email | string | Yes | Email address to check |

#### Request Example
```typescript
const exists = await authService.checkEmailExists('admin@example.com');
// Returns: true
```

#### Response
Returns `Promise<boolean>` - true if email exists, false otherwise

#### Implementation Details
- Simulates 0.3 second API delay
- Case-insensitive email matching
- Useful for registration forms and password reset

### 5. Get Demo Users

**Method**: `authService.getDemoUsers()`  
**Purpose**: Retrieve list of available demo users  
**Simulates**: `GET /api/auth/demo-users`

#### Parameters
None

#### Request Example
```typescript
const demoUsers = authService.getDemoUsers();
```

#### Response
```typescript
[
  {
    id: 1,
    name: "John Admin",
    email: "admin@example.com",
    role: "Administrator"
  },
  {
    id: 2,
    name: "Jane User",
    email: "user@example.com", 
    role: "User"
  },
  {
    id: 3,
    name: "Bob Manager",
    email: "manager@example.com",
    role: "Manager"
  }
]
```

#### Implementation Details
- Synchronous method (no delay)
- Returns user data without passwords
- Useful for documentation and testing

## 🔄 Authentication Flow

### Login Flow Diagram
```
1. User Input → authService.login(email, password)
2. Email Validation → Find user in MOCK_USERS
3. Password Check → Compare with stored password
4. Token Generation → Create mock JWT token
5. Return Response → Success with user data + token
6. Client Storage → Store in localStorage
7. Route Navigation → Redirect to dashboard
```

### Logout Flow Diagram
```
1. User Action → authService.logout()
2. API Call → Log logout event
3. Client Cleanup → Clear localStorage
4. Route Navigation → Redirect to login
```

### Token Validation Flow
```
1. Page Load → Check localStorage for token
2. Token Validation → authService.validateToken(token)
3. Response Check → Verify token validity
4. User Data → Extract user information
5. Route Decision → Allow access or redirect
```

## 🕐 Response Times & Performance

### Simulated API Delays
| Method | Delay (ms) | Purpose |
|--------|------------|---------|
| `login()` | 1500 | Simulate authentication processing |
| `logout()` | 500 | Simulate session cleanup |
| `validateToken()` | 500 | Simulate token verification |
| `checkEmailExists()` | 300 | Simulate quick database lookup |
| `getDemoUsers()` | 0 | Immediate response (no API call) |

### Real-World Expectations
In production, typical API response times should be:
- Login: 200-800ms
- Logout: 100-300ms  
- Token validation: 50-200ms
- Email check: 100-400ms

## 🔒 Security Considerations

### Current Demo Implementation
⚠️ **Security Limitations:**
- Passwords stored in plaintext
- Client-side "authentication"
- No actual token validation
- localStorage for sensitive data
- No HTTPS requirement
- No rate limiting

### Production Security Requirements

#### Password Security
```typescript
// Production implementation would use:
import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

const validatePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
```

#### Token Management
```typescript
// Production JWT implementation:
import jwt from 'jsonwebtoken';

const generateToken = (user: User): string => {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email,
      role: user.role 
    },
    process.env.JWT_SIGNING_KEY!,
    { 
      expiresIn: '24h',
      issuer: 'your-app-name',
      audience: 'your-app-users'
    }
  );
};

const validateToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SIGNING_KEY!, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded as JwtPayload);
    });
  });
};
```

#### Secure Session Management
```typescript
// Production session handling:
app.use(session({
  secret: process.env.SESSION_SIGNING_KEY!,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true,     // HTTPS only
    httpOnly: true,   // Prevent XSS
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'strict' // CSRF protection
  },
  store: new RedisStore(/* Redis config */)
}));
```

## 🧪 Testing the API

### Manual Testing

#### Test Valid Login
```typescript
// Test successful authentication  
const response = await authService.login('admin@example.com', 'demo-pass');
console.log(response.success); // true
console.log(response.user?.name); // "John Admin"
```

#### Test Invalid Credentials
```typescript
// Test wrong password
const response = await authService.login('admin@example.com', 'wrongpassword');
console.log(response.success); // false
console.log(response.message); // "Invalid password. Please try again."
```

#### Test Email Validation
```typescript
// Test non-existent email
const response = await authService.login('nonexistent@example.com', 'password');
console.log(response.success); // false
console.log(response.message); // "User not found. Please check your email address."
```

### Console Logging

The service provides detailed console logging for debugging:

```typescript
// Login attempt
🚀 AuthService: Attempting login for admin@example.com
✅ AuthService: Login successful

// Login failure
🚀 AuthService: Attempting login for user@example.com  
❌ AuthService: Invalid password

// Logout
🚪 AuthService: User logged out

// Token validation
🔍 AuthService: Validating token
```

### Unit Test Examples

```typescript
// Example unit tests (not implemented)
describe('AuthService', () => {
  test('should return success for valid credentials', async () => {
    const response = await authService.login('admin@example.com', 'password123');
    expect(response.success).toBe(true);
    expect(response.user?.email).toBe('admin@example.com');
  });

  test('should return error for invalid password', async () => {
    const response = await authService.login('admin@example.com', 'wrongpassword'); 
    expect(response.success).toBe(false);
    expect(response.message).toContain('Invalid password');
  });

  test('should validate existing email', async () => {
    const exists = await authService.checkEmailExists('user@example.com');
    expect(exists).toBe(true);
  });
});
```

## 🔄 Migration to Real API

### Step 1: Replace Service Implementation
```typescript
// Replace authService.ts with HTTP client
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  },

  async logout(): Promise<void> {
    await axios.post(`${API_BASE_URL}/auth/logout`);
  },

  // ... other methods
};
```

### Step 2: Add Error Handling
```typescript
// Add proper error handling
try {
  const response = await authService.login(email, password);
  // Handle success
} catch (error) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || 'Network error';
    // Handle API error
  } else {
    // Handle unexpected error
  }
}
```

### Step 3: Add Request Interceptors
```typescript
// Add authentication headers
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

**API Version**: 1.0.0  
**Last Updated**: November 13, 2024  
**Status**: Demo Implementation Complete