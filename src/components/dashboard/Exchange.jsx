import React from 'react'
import PaymentSteps from './PaymentSteps'
import ExchangeForm from './ExchangeForm'
import { useState } from 'react'
import AccountDetails from './AccountDetails'
import PaymentCheckout from './PaymentCheckout'

const Exchange = () => {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div>
      <PaymentSteps currentStep={currentStep} />
      {
        currentStep === 1 && <ExchangeForm  setCurrentStep={setCurrentStep}/>
      }
      {
        currentStep === 2 && <AccountDetails setCurrentStep={setCurrentStep}/>
      }
      {
        currentStep === 3 && <PaymentCheckout />
      }
    </div>
  )
}

export default Exchange