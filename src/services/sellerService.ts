/**
 * Seller API Service for INFORM Act Verification
 * This simulates API calls for seller business information management
 */

import { 
  SellerBusinessInfo, 
  SellerVerificationResponse, 
  VerificationSubmission,
  VerificationApiResponse 
} from '../types/seller';

// Mock seller database - In production, this would be API calls
const MOCK_SELLER_DATA: SellerBusinessInfo = {
  businessName: 'Prashannjeet',
  businessAddress: {
    street: '2345 Capitol Ave',
    city: 'Sacramento',
    state: 'CA',
    zipCode: '95814',
    country: 'US'
  },
  contactInfo: {
    email: 'prashann@michaels.com',
    phone: '(944) 556-2652'
  },
  bankAccount: {
    accountEndingIn: '6789',
    accountType: 'business'
  },
  taxId: {
    type: 'EIN',
    number: '98-7456321'
  },
  lastUpdated: '2024-01-15T10:30:00Z',
  verificationStatus: 'requires_update'
};

// Simulate network delay
const simulateApiDelay = (ms: number = 1500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const sellerService = {
  /**
   * Fetch seller business information for INFORM Act verification
   * @param sellerId - The seller's unique identifier
   * @returns Promise with seller business information
   */
  async getSellerInfo(sellerId: string): Promise<SellerVerificationResponse> {
    console.log('🏢 SellerService: Fetching seller info for:', sellerId);
    
    // Simulate API delay
    await simulateApiDelay(1200);
    
    try {
      // In production, this would be an actual API call:
      // const response = await fetch(`/api/sellers/${sellerId}/info`);
      // return await response.json();
      
      console.log('✅ SellerService: Seller info retrieved successfully');
      return {
        success: true,
        seller: MOCK_SELLER_DATA,
        message: 'Seller information retrieved successfully'
      };
    } catch (error) {
      console.error('❌ SellerService: Error fetching seller info:', error);
      return {
        success: false,
        seller: {} as SellerBusinessInfo,
        message: 'Failed to fetch seller information',
        errors: ['Network error occurred while fetching seller data']
      };
    }
  },

  /**
   * Submit INFORM Act verification
   * @param verification - Verification submission data
   * @returns Promise with verification result
   */
  async submitVerification(verification: VerificationSubmission): Promise<VerificationApiResponse> {
    console.log('📝 SellerService: Submitting verification for seller:', verification.sellerId);
    
    await simulateApiDelay(2000);
    
    try {
      // Validate submission
      if (!verification.verifyInformationCurrent || !verification.verifyUpdatesProvided) {
        return {
          success: false,
          message: 'Please confirm both verification checkboxes to proceed.'
        };
      }

      // In production, this would be an actual API call:
      // const response = await fetch('/api/sellers/verify-inform-act', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(verification)
      // });
      
      console.log('✅ SellerService: Verification submitted successfully');
      return {
        success: true,
        message: 'INFORM Act verification completed successfully!',
        verificationId: `VERIFY_${Date.now()}`,
        nextSteps: [
          'Your verification has been recorded',
          'You can continue selling on the platform',
          'Next verification due in 12 months'
        ]
      };
    } catch (error) {
      console.error('❌ SellerService: Error submitting verification:', error);
      return {
        success: false,
        message: 'Failed to submit verification. Please try again.',
      };
    }
  },

  /**
   * Request to update seller information
   * @param sellerId - The seller's unique identifier
   * @param field - The field that needs updating
   * @returns Promise with update instruction
   */
  async requestUpdate(sellerId: string, field: string): Promise<{success: boolean; message: string; redirectUrl?: string}> {
    console.log('🔄 SellerService: Requesting update for seller:', sellerId, 'field:', field);
    
    await simulateApiDelay(800);
    
    // Simulate different update flows based on field
    const updateFlows: Record<string, {message: string; redirectUrl: string}> = {
      businessName: {
        message: 'To update your business name, please contact Seller Support with legal documentation.',
        redirectUrl: '/seller-support/contact'
      },
      businessAddress: {
        message: 'To update your business address, please contact Seller Support with proof of new address.',
        redirectUrl: '/seller-support/contact'
      },
      contactInfo: {
        message: 'Update your contact information in Store Settings > Customer Service.',
        redirectUrl: '/store-settings/customer-service'
      },
      bankAccount: {
        message: 'Update your bank account information in Finances > Deposit Options.',
        redirectUrl: '/finances/deposit-options'
      }
    };

    const flow = updateFlows[field];
    
    return {
      success: true,
      message: flow?.message || 'Please contact Seller Support for updates.',
      redirectUrl: flow?.redirectUrl
    };
  },

  /**
   * Check if verification is required for seller
   * @param sellerId - The seller's unique identifier  
   * @returns Promise with verification requirement status
   */
  async checkVerificationStatus(sellerId: string): Promise<{required: boolean; daysRemaining?: number; lastVerified?: string}> {
    console.log('🔍 SellerService: Checking verification status for seller:', sellerId);
    await simulateApiDelay(500);
    
    // Simulate verification requirement logic
    const lastVerifiedDate = new Date('2023-11-13'); // 1 year ago
    const currentDate = new Date();
    const daysSinceVerification = Math.floor((currentDate.getTime() - lastVerifiedDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = 365 - daysSinceVerification;
    
    return {
      required: daysRemaining <= 0,
      daysRemaining: Math.max(0, daysRemaining),
      lastVerified: lastVerifiedDate.toISOString()
    };
  }
};