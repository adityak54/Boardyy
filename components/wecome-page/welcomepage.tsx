import React from 'react';
import styles from './welcome.module.css';
import { SignInButton } from '@clerk/nextjs';

const WelcomePage: React.FC = () => {
  return (
    <div style={containerStyles}>
      <div className={styles.background}>
        <div className={`${styles.line} ${styles.line1}`}></div>
        <div className={`${styles.line} ${styles.line2}`}></div>
        <div className={`${styles.line} ${styles.line3}`}></div>
        <div className={`${styles.line} ${styles.line4}`}></div>
        <div className={`${styles.line} ${styles.line5}`}></div>
      </div>
      <h1 style={headingStyles}>
        <span style={helloStyles}>Boardyy</span>
      </h1>
      <p style={subheadingStyles}>Good to see you here</p>
      <SignInButton>
      <button style={buttonStyles}>
        Sign In
      </button>
      </SignInButton>
    </div>
  );
};

const containerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
  position: 'relative',
};

const headingStyles: React.CSSProperties = {
  fontSize: '4rem',
  color: '#333',
};

const helloStyles: React.CSSProperties = {
  background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
};

const subheadingStyles: React.CSSProperties = {
  fontSize: '1.25rem',
  color: '#666',
};



const buttonStyles: React.CSSProperties = {
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  color: '#fff',
  backgroundColor: 'black',
  border: 'none',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  margin: '20px 0',
};


export default WelcomePage;
