/**
 * Dummy Authentication Service
 * This simulates an API authentication service for demo purposes.
 * In a real application, this would make HTTP requests to your backend API.
 */

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

// Mock user database - In real app, this would be on your backend
const MOCK_USERS = [
  {
    id: 1,
    name: 'John Admin',
    email: 'admin@example.com',
    password: 'password123', // In real app, this would be hashed
    role: 'Administrator'
  },
  {
    id: 2,
    name: 'Jane User',
    email: 'user@example.com',
    password: 'userpass',
    role: 'User'
  },
  {
    id: 3,
    name: 'Bob Manager',
    email: 'manager@example.com',
    password: 'manager123',
    role: 'Manager'
  }
];

// Simulate network delay
const simulateApiDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const authService = {
  /**
   * Simulate login API call
   * @param email - User email
   * @param password - User password
   * @returns Promise with login response
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    console.log('🚀 AuthService: Attempting login for', email);
    
    // Simulate API delay
    await simulateApiDelay(1500);
    
    // Find user in mock database
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      console.log('❌ AuthService: User not found');
      return {
        success: false,
        message: 'User not found. Please check your email address.'
      };
    }
    
    if (user.password !== password) {
      console.log('❌ AuthService: Invalid password');
      return {
        success: false,
        message: 'Invalid password. Please try again.'
      };
    }
    
    // Successful login
    console.log('✅ AuthService: Login successful');
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token: `fake-jwt-token-${user.id}-${Date.now()}` // Mock JWT token
    };
  },

  /**
   * Simulate logout API call
   */
  async logout(): Promise<void> {
    console.log('🚪 AuthService: User logged out');
    
    // In a real app, you might want to:
    // - Invalidate the token on the server
    // - Clear any server-side sessions
    // - Log the logout event
    
    await simulateApiDelay(500);
  },

  /**
   * Simulate token validation API call
   * @param token - JWT token to validate
   * @returns Promise with validation result
   */
  async validateToken(token: string): Promise<{ valid: boolean; user?: User }> {
    console.log('🔍 AuthService: Validating token');
    
    await simulateApiDelay(500);
    
    // Simple token validation (in real app, this would verify JWT signature)
    if (!token || !token.startsWith('fake-jwt-token-')) {
      return { valid: false };
    }
    
    // Extract user ID from fake token
    const parts = token.split('-');
    const userId = parseInt(parts[3]);
    const user = MOCK_USERS.find(u => u.id === userId);
    
    if (!user) {
      return { valid: false };
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return {
      valid: true,
      user: userWithoutPassword
    };
  },

  /**
   * Get all available demo users (for documentation purposes)
   * @returns Array of demo users (without passwords)
   */
  getDemoUsers(): Array<Omit<User, 'password'>> {
    return MOCK_USERS.map(({ password: _, ...user }) => user);
  },

  /**
   * Check if email exists in the system
   * @param email - Email to check
   * @returns Promise with existence result
   */
  async checkEmailExists(email: string): Promise<boolean> {
    await simulateApiDelay(300);
    return MOCK_USERS.some(user => user.email.toLowerCase() === email.toLowerCase());
  }
};