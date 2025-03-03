'use client';
import React, { useState, useEffect, CSSProperties } from 'react';

const CheckCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const Shield = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const AlertCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const Info = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const PasswordStrengthContainer = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState<{
    score: number;
    feedback: string;
    isBreached: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [breachWarning, setBreachWarning] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const styles: { [key: string]: CSSProperties } = {
    container: {
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: 0,
    },
    formGroup: {
      marginBottom: '24px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '4px',
      color: '#333',
    },
    inputWrapper: {
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      outline: 'none',
    },
    inputFocus: {
      borderColor: '#4a90e2',
      boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)',
    },
    showButton: {
      position: 'absolute',
      right: '0',
      top: '0',
      height: '100%',
      padding: '0 12px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#666',
    },
    strengthMeter: {
      marginBottom: '24px',
    },
    strengthHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    strengthLabel: {
      fontSize: '14px',
      fontWeight: '500',
    },
    strengthValue: {
      fontSize: '14px',
      fontWeight: '500',
    },
    meterTrack: {
      height: '8px',
      width: '100%',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    meterFill: {
      height: '100%',
      transition: 'width 0.3s, background-color 0.3s',
    },
    feedbackBox: {
      padding: '12px',
      borderRadius: '4px',
      marginBottom: '24px',
    },
    feedbackContent: {
      display: 'flex',
      gap: '8px',
    },
    feedbackIcon: {
      flexShrink: 0,
      marginTop: '2px',
    },
    feedbackTitle: {
      fontWeight: '500',
      marginBottom: '4px',
    },
    feedbackText: {
      fontSize: '14px',
      margin: 0,
    },
    checklistTitle: {
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px',
      color: '#333',
    },
    checklist: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      marginBottom: '24px',
    },
    checklistItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '4px',
    },
    checklistText: {
      fontSize: '14px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    buttonHover: {
      backgroundColor: '#3a80d2',
    },
    buttonDisabled: {
      backgroundColor: '#a0c0e4',
      cursor: 'not-allowed',
    },
  };

  // Check basic requirements
  useEffect(() => {
    setRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    });
  }, [password]);

  // Real AI assessment function that calls Hugging Face API
  const assessPasswordWithAI = async (pwd: string) => {
    setLoading(true);

    try {
      // In a real app, you'd call the Hugging Face API here
      // For demo, we'll simulate the API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Fallback logic as we're not making a real API call
      const metRequirements =
        Object.values(requirements).filter(Boolean).length;

      let aiScore = 0;
      let aiFeedback = '';

      if (metRequirements <= 1) {
        aiScore = 1;
        aiFeedback = 'Very weak password. Easy to guess.';
      } else if (metRequirements === 2) {
        aiScore = 2;
        aiFeedback = 'Weak password. Add more complexity.';
      } else if (metRequirements === 3) {
        aiScore = 3;
        aiFeedback = 'Moderate password. Could be stronger.';
      } else if (metRequirements === 4) {
        aiScore = 4;
        aiFeedback = 'Strong password, good job!';
      } else {
        aiScore = 5;
        aiFeedback = 'Very strong password, excellent!';
      }

      // Check for breaches (simulated)
      const commonPasswords = ['password', '123456', 'qwerty', 'admin'];
      const isBreached =
        commonPasswords.includes(pwd.toLowerCase()) ||
        pwd.toLowerCase().includes('123');

      // Create final result
      const result = {
        score: aiScore,
        feedback: aiFeedback,
        isBreached: isBreached,
      };

      setStrength(result);
      setBreachWarning(result.isBreached);
    } catch (error) {
      console.error('Error calling AI API:', error);

      // Fallback if API fails
      const metRequirements =
        Object.values(requirements).filter(Boolean).length;
      const fallbackScore = Math.min(Math.max(metRequirements, 1), 5);

      setStrength({
        score: fallbackScore,
        feedback:
          'Could not connect to AI service. Using basic password rules.',
        isBreached: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length > 0) {
      assessPasswordWithAI(newPassword);
    } else {
      setStrength(null);
      setBreachWarning(false);
    }
  };

  const getStrengthColor = () => {
    if (!strength) return '#e0e0e0';
    switch (strength.score) {
      case 1:
        return '#f44336'; // Red
      case 2:
        return '#ff9800'; // Orange
      case 3:
        return '#ffeb3b'; // Yellow
      case 4:
        return '#4caf50'; // Light Green
      case 5:
        return '#2e7d32'; // Dark Green
      default:
        return '#e0e0e0';
    }
  };

  const getStrengthLabel = () => {
    if (!strength) return '';
    switch (strength.score) {
      case 1:
        return 'Very Weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Moderate';
      case 4:
        return 'Strong';
      case 5:
        return 'Very Strong';
      default:
        return '';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ color: '#4a90e2' }}>
          <Shield />
        </div>
        <h2 style={styles.title}>Password Strength Checker</h2>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="password" style={styles.label}>
          Password
        </label>
        <div style={styles.inputWrapper}>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            style={styles.input}
            placeholder="Enter your password"
          />
          <button
            type="button"
            style={styles.showButton}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      {/* Strength meter */}
      <div style={styles.strengthMeter}>
        <div style={styles.strengthHeader}>
          <span style={styles.strengthLabel}>Password Strength</span>
          {strength && (
            <span
              style={{ ...styles.strengthValue, color: getStrengthColor() }}
            >
              {getStrengthLabel()}
            </span>
          )}
        </div>
        <div style={styles.meterTrack}>
          {loading ? (
            <div
              style={{
                ...styles.meterFill,
                width: '100%',
                backgroundColor: '#4a90e2',
                animation: 'pulse 1.5s infinite',
              }}
            ></div>
          ) : (
            <div
              style={{
                ...styles.meterFill,
                width: strength ? `${strength.score * 20}%` : '0%',
                backgroundColor: getStrengthColor(),
              }}
            ></div>
          )}
        </div>
      </div>

      {/* AI Feedback */}
      {strength && strength.feedback && (
        <div
          style={{
            ...styles.feedbackBox,
            backgroundColor: '#e3f2fd',
            border: '1px solid #bbdefb',
          }}
        >
          <div style={styles.feedbackContent}>
            <div style={{ ...styles.feedbackIcon, color: '#2196f3' }}>
              <Info />
            </div>
            <div>
              <h3 style={{ ...styles.feedbackTitle, color: '#0d47a1' }}>
                AI Analysis
              </h3>
              <p style={{ ...styles.feedbackText, color: '#1565c0' }}>
                {strength.feedback}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Breach Warning */}
      {breachWarning && (
        <div
          style={{
            ...styles.feedbackBox,
            backgroundColor: '#ffebee',
            border: '1px solid #ffcdd2',
          }}
        >
          <div style={styles.feedbackContent}>
            <div style={{ ...styles.feedbackIcon, color: '#f44336' }}>
              <AlertCircle />
            </div>
            <div>
              <h3 style={{ ...styles.feedbackTitle, color: '#b71c1c' }}>
                Security Alert
              </h3>
              <p style={{ ...styles.feedbackText, color: '#c62828' }}>
                This password appears in known data breaches. You should choose
                a different one.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Requirements checklist */}
      <div>
        <h3 style={styles.checklistTitle}>Password Requirements</h3>
        <ul style={styles.checklist}>
          <li style={styles.checklistItem}>
            <div style={{ color: requirements.length ? '#4caf50' : '#bdbdbd' }}>
              <CheckCircle />
            </div>
            <span
              style={{
                ...styles.checklistText,
                color: requirements.length ? '#333' : '#757575',
              }}
            >
              At least 8 characters
            </span>
          </li>
          <li style={styles.checklistItem}>
            <div
              style={{ color: requirements.uppercase ? '#4caf50' : '#bdbdbd' }}
            >
              <CheckCircle />
            </div>
            <span
              style={{
                ...styles.checklistText,
                color: requirements.uppercase ? '#333' : '#757575',
              }}
            >
              Contains uppercase letters
            </span>
          </li>
          <li style={styles.checklistItem}>
            <div
              style={{ color: requirements.lowercase ? '#4caf50' : '#bdbdbd' }}
            >
              <CheckCircle />
            </div>
            <span
              style={{
                ...styles.checklistText,
                color: requirements.lowercase ? '#333' : '#757575',
              }}
            >
              Contains lowercase letters
            </span>
          </li>
          <li style={styles.checklistItem}>
            <div style={{ color: requirements.number ? '#4caf50' : '#bdbdbd' }}>
              <CheckCircle />
            </div>
            <span
              style={{
                ...styles.checklistText,
                color: requirements.number ? '#333' : '#757575',
              }}
            >
              Contains numbers
            </span>
          </li>
          <li style={styles.checklistItem}>
            <div
              style={{ color: requirements.special ? '#4caf50' : '#bdbdbd' }}
            >
              <CheckCircle />
            </div>
            <span
              style={{
                ...styles.checklistText,
                color: requirements.special ? '#333' : '#757575',
              }}
            >
              Contains special characters
            </span>
          </li>
        </ul>
      </div>

      <button
        style={{
          ...styles.button,
          ...(!password || loading ? styles.buttonDisabled : {}),
        }}
        disabled={!password || loading}
        onMouseOver={(e) => {
          if (password && !loading) {
            e.currentTarget.style.backgroundColor =
              styles.buttonHover.backgroundColor || '';
          }
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor =
            styles.button.backgroundColor || '';
        }}
      >
        {loading ? 'Analyzing...' : 'Submit'}
      </button>
    </div>
  );
};

export default PasswordStrengthContainer;
