import { CheckCircle } from 'lucide-react';

const steps = [
  'Route & Amount',
  'Recipient Details',
  'Review & Confirm',
  'Deposit Info',
];

const PaymentSteps = ({ currentStep }) => (
  <div className="flex justify-between mb-8">
    {steps.map((label, i) => (
      <div key={i} className="flex flex-col items-center flex-1">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            currentStep > i
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          {currentStep > i ? <CheckCircle size={18} /> : i + 1}
        </div>
        <span className="text-[15px] mt-2">{label}</span>
      </div>
    ))}
  </div>
);

export default PaymentSteps;
