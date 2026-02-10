import { useEffect, useState } from "react";
import PaymentSteps from "../dashboard/PaymentSteps";
import ExchangeForm from "../dashboard/ExchangeForm";
import RecipentDetailsForm from "./RecipentDetailsForm";
import ReviewConfirm from "./ReviewConfirm";
import DepositInfo from "./DepositInfo";

const Exchange = () => {
  const [step, setStep] = useState(1);
  const [transferData, setTransferData] = useState({});
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("token") : ""
  );

  return (
    <div className="min-h-screen p-4 font-Outfit">
      <PaymentSteps currentStep={step} />

      {step === 1 && (
        <ExchangeForm
          onNext={() => setStep(2)}
          transferData={transferData}
          setTransferData={setTransferData}
        />
      )}

      {step === 2 && (
        <RecipentDetailsForm
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
          transferData={transferData}
          setTransferData={setTransferData}
          token={token}
        />
      )}

      {step === 3 && (
        <ReviewConfirm
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
          transferData={transferData}
        />
      )}

      {step === 4 && <DepositInfo transferData={transferData} />}
    </div>
  );
};

export default Exchange;
