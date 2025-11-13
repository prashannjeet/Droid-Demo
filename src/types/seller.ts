/**
 * TypeScript interfaces for INFORM Act seller verification data
 */

export interface SellerBusinessInfo {
  businessName: string;
  businessAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contactInfo: {
    email: string;
    phone: string;
  };
  bankAccount: {
    accountEndingIn: string;
    accountType: 'checking' | 'savings' | 'business';
  };
  taxId: {
    type: 'EIN' | 'SSN' | 'TIN';
    number: string;
  };
  lastUpdated: string;
  verificationStatus: 'pending' | 'verified' | 'requires_update';
}

export interface SellerVerificationResponse {
  success: boolean;
  seller: SellerBusinessInfo;
  message?: string;
  errors?: string[];
}

export interface VerificationSubmission {
  sellerId: string;
  verifyInformationCurrent: boolean;
  verifyUpdatesProvided: boolean;
  verificationDate: string;
  ipAddress?: string;
}

export interface VerificationApiResponse {
  success: boolean;
  message: string;
  verificationId?: string;
  nextSteps?: string[];
}