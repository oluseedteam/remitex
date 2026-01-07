import React, { useState } from 'react'
import PaymentSteps from './PaymentSteps'
import ExchangeForm from './ExchangeForm'
import AccountDetails from './AccountDetails'
import PaymentCheckout from './PaymentCheckout'
import UploadProof from './UploadProof'

const Exchange = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [transferData, setTransferData] = useState(null) // ✅ ADD THIS

  return (
    <div>
      <PaymentSteps currentStep={currentStep} />

      {currentStep === 1 && (
        <ExchangeForm
          setCurrentStep={setCurrentStep}
          setTransferData={setTransferData} // ✅ now defined
        />
      )}

      {currentStep === 2 && (
        <AccountDetails
          setCurrentStep={setCurrentStep}
          transferData={transferData} // ✅ now defined
        />
      )}

      {currentStep === 3 && (
        <PaymentCheckout
          setCurrentStep={setCurrentStep}
          transferData={transferData} 
        />)}
      
      {currentStep === 4 && (
        <UploadProof/>
      )}
    </div>
  )
}

export default Exchange
