import React, { useState } from "react";
import { Check } from "lucide-react";

const PaymentSteps = () => {
  const [selected, setSelected] = useState("currency");

  const steps = [
    { id: "currency", label: "Select Currency" },
    { id: "account", label: "Account Details" },
    { id: "complete", label: "Complete Payment" },
  ];

  const handleStepClick = (id) => {
    setSelected(id);
  };

  // helper to determine step order
  const getStepIndex = (id) => steps.findIndex((step) => step.id === id);

  return (
    <div className="relative flex justify-center px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto relative gap-10 sm:gap-20">
        {/* Connecting line for larger screens */}
        <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -z-10">
          {/* Progress line */}
          <div
            className="h-0.5 bg-green-500 transition-all duration-500"
            style={{
              width: `${
                (getStepIndex(selected) / (steps.length - 1)) * 100
              }%`,
            }}
          ></div>
        </div>

        {steps.map((step, index) => {
          const isCompleted =
            getStepIndex(step.id) < getStepIndex(selected) ||
            step.id === selected;

          return (
            <div
              key={step.id}
              className="flex flex-col sm:flex-col items-center gap-2 cursor-pointer relative"
              onClick={() => handleStepClick(step.id)}
            >
              {/* Step Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-500 border-green-500"
                    : "border-gray-400 bg-white"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-center font-medium text-sm sm:text-base ${
                  isCompleted ? "text-green-600" : "text-[#23262F]"
                }`}
                style={{ fontFamily: "DM Sans" }}
              >
                {step.label}
              </span>

              {/* Vertical line on mobile */}
              {index < steps.length - 1 && (
                <div className="sm:hidden w-0.5 h-8 bg-gray-300 mt-1"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentSteps;
