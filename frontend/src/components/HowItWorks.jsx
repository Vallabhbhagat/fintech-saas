import React from 'react'
import './HowItWorks.css'

const HowItWorks = () => {
  const steps = [
    {
      title: "Create Your Account",
      description: "Sign up using your mobile number or email to get started.",
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 7h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M19 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: "Quick Verification",
      description: "Verify your account with a one-time password sent to your mobile.",
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="16.5" r="1.5" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "Set Things Up",
      description: "Add a few basic details so everything works smoothly for you.",
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 15h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: "Start Using the Dashboard",
      description: "Access your dashboard and begin managing your finances with ease.",
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ]

  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <div className="how-it-works-header">
          <h2 className="how-it-works-title">How Fintech SaaS Works</h2>
          <p className="how-it-works-subtitle">Getting started is simple and only takes a few minutes.</p>
        </div>

        <div className="how-it-works-steps">
          {steps.map((step, index) => (
            <div key={index} className="how-it-works-step">
              <div className="step-number">{index + 1}</div>
              <div className="step-icon" style={{color: '#ffffff'}}>
                {step.icon}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="how-it-works-footer">
          <p className="trust-line">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '8px'}}>
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            All your data is protected using secure and trusted technology.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
