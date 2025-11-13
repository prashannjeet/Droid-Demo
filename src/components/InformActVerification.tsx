import React, { useState, useEffect } from 'react';
import { sellerService } from '../services/sellerService';
import { SellerBusinessInfo, VerificationSubmission } from '../types/seller';

const InformActVerification: React.FC = () => {
  const [sellerInfo, setSellerInfo] = useState<SellerBusinessInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [verificationChecks, setVerificationChecks] = useState({
    informationCurrent: false,
    updatesProvided: false
  });

  // Mock seller ID - in production, this would come from auth context
  const sellerId = 'seller_123';

  useEffect(() => {
    loadSellerInfo();
  }, []);

  const loadSellerInfo = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await sellerService.getSellerInfo(sellerId);
      if (response.success) {
        setSellerInfo(response.seller);
      } else {
        setError(response.message || 'Failed to load seller information');
      }
    } catch (err) {
      setError('An unexpected error occurred while loading your information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRequest = async (field: string) => {
    try {
      const response = await sellerService.requestUpdate(sellerId, field);
      if (response.success) {
        alert(`${response.message}${response.redirectUrl ? `\n\nRedirecting to: ${response.redirectUrl}` : ''}`);
      }
    } catch (err) {
      alert('Failed to process update request. Please try again.');
    }
  };

  const handleVerificationSubmit = async () => {
    if (!verificationChecks.informationCurrent || !verificationChecks.updatesProvided) {
      setError('Please confirm both verification statements before proceeding.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const verification: VerificationSubmission = {
        sellerId,
        verifyInformationCurrent: verificationChecks.informationCurrent,
        verifyUpdatesProvided: verificationChecks.updatesProvided,
        verificationDate: new Date().toISOString()
      };

      const response = await sellerService.submitVerification(verification);
      
      if (response.success) {
        setSuccessMessage(response.message);
        if (response.nextSteps) {
          console.log('Next steps:', response.nextSteps);
        }
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to submit verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyLater = () => {
    // In production, this might set a reminder or save draft state
    if (confirm('Are you sure you want to verify later? Your selling privileges may be restricted until verification is complete.')) {
      console.log('User chose to verify later');
      // Could redirect to dashboard or show a confirmation
    }
  };

  if (isLoading) {
    return (
      <div className="inform-act-container">
        <div className="inform-act-card">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your business information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!sellerInfo) {
    return (
      <div className="inform-act-container">
        <div className="inform-act-card">
          <div className="error-state">
            <h2>Unable to Load Information</h2>
            <p>{error}</p>
            <button onClick={loadSellerInfo} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inform-act-container">
      <div className="inform-act-card">
        <div className="inform-act-header">
          <h1>INFORM Act Verification</h1>
          <button className="close-button" onClick={() => window.history.back()}>
            ✕
          </button>
        </div>

        <div className="inform-act-content">
          <div className="intro-section">
            <p>
              Each year in compliance with the{' '}
              <a 
                href="https://www.congress.gov/bill/117th-congress/house-bill/5502" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inform-link"
              >
                INFORM Consumers Act
              </a>
              , we ask sellers to confirm a list of business information in order to continue selling on Michaels.
            </p>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="success-message">
              <p>{successMessage}</p>
            </div>
          )}

          <div className="business-info-section">
            <div className="info-item">
              <div className="info-header">
                <h3>Business Name</h3>
                <button 
                  className="update-link"
                  onClick={() => handleUpdateRequest('businessName')}
                >
                  Update by contacting Seller Support
                </button>
              </div>
              <p className="info-value">{sellerInfo.businessName}</p>
            </div>

            <div className="info-item">
              <div className="info-header">
                <h3>Business Address</h3>
                <button 
                  className="update-link"
                  onClick={() => handleUpdateRequest('businessAddress')}
                >
                  Update by contacting Seller Support
                </button>
              </div>
              <div className="address-block">
                <p>{sellerInfo.businessAddress.street}</p>
                <p>{sellerInfo.businessAddress.city}, {sellerInfo.businessAddress.state} {sellerInfo.businessAddress.zipCode}</p>
                <p>{sellerInfo.businessAddress.country}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-header">
                <h3>Contact Information</h3>
                <button 
                  className="update-link"
                  onClick={() => handleUpdateRequest('contactInfo')}
                >
                  Update on the Customer Service page in your Store Settings
                </button>
              </div>
              <div className="contact-block">
                <p>{sellerInfo.contactInfo.email}</p>
                <p>{sellerInfo.contactInfo.phone}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-header">
                <h3>Bank Account</h3>
                <button 
                  className="update-link"
                  onClick={() => handleUpdateRequest('bankAccount')}
                >
                  Update on the Deposit Options page in Finances
                </button>
              </div>
              <p className="info-value">Bank Account ending in {sellerInfo.bankAccount.accountEndingIn}</p>
            </div>

            <div className="info-item">
              <div className="info-header">
                <h3>Tax ID</h3>
              </div>
              <p className="info-value">
                Employer Identification Number (EIN): {sellerInfo.taxId.number}
              </p>
            </div>
          </div>

          <div className="verification-section">
            <div className="warning-message">
              <p>
                <strong>If any information is incorrect, please update it before verifying</strong>
              </p>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={verificationChecks.informationCurrent}
                  onChange={(e) => setVerificationChecks(prev => ({
                    ...prev,
                    informationCurrent: e.target.checked
                  }))}
                />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  I verify that my business information above is up-to-date
                </span>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={verificationChecks.updatesProvided}
                  onChange={(e) => setVerificationChecks(prev => ({
                    ...prev,
                    updatesProvided: e.target.checked
                  }))}
                />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  I verify that I have provided Michaels with updates to my business information that are not reflected above
                </span>
              </label>
            </div>

            <div className="action-buttons">
              <button 
                className="complete-verification-btn"
                onClick={handleVerificationSubmit}
                disabled={isSubmitting || !verificationChecks.informationCurrent || !verificationChecks.updatesProvided}
              >
                {isSubmitting ? (
                  <>
                    <span className="button-loading"></span>
                    Completing Verification...
                  </>
                ) : (
                  'Complete Verification'
                )}
              </button>

              <button 
                className="verify-later-btn"
                onClick={handleVerifyLater}
                disabled={isSubmitting}
              >
                Verify Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformActVerification;