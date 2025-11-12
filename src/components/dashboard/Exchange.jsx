import React from 'react'
import PaymentSteps from './PaymentSteps'
import ExchangeForm from './ExchangeForm'
import AccountDetails from './AccountDetails'
import PaymentCheckout from './PaymentCheckout'

const Exchange = () => {
  return (
    <div>
      <PaymentSteps />
      <ExchangeForm/>
      {/* <AccountDetails/> */}
      {/* <PaymentCheckout/>   */}
    </div>
  )
}

export default Exchange