import React from "react";
import { Check } from "lucide-react";

const PaymentSteps = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: "Select Currency" },
    { id: 2, label: "Account Details" },
    { id: 3, label: "Complete Payment" },
  ];

  return (
    <div className="flex flex-col items-center w-full px-4 mt-6">
      {/* Steps row (desktop) / column (mobile) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 w-full max-w-3xl">
        {steps.map((step, index) => {
          const isCompleted = index + 1 < currentStep;
          const isActive = index + 1 === currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step item */}
              <div className="flex flex-col items-center text-center">
                <div
                  className={`flex items-center justify-center rounded-full border-2 transition-all duration-300
                    ${isCompleted ? "bg-green-500 border-green-500" : isActive ? "bg-white border-green-500" : "bg-white border-gray-300" }
                    w-10 h-10 sm:w-12 sm:h-12`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span className={`${isActive ? "bg-green-500" : "bg-gray-300"} block rounded-full w-3 h-3`} />
                  )}
                </div>

                <div className="mt-2 max-w-[140px]">
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      isCompleted || isActive ? "text-green-600" : "text-gray-500"
                    }`}
                    style={{ fontFamily: "DM Sans" }}
                  >
                    {step.label}
                  </p>
                </div>
              </div>

              {/* Connector: horizontal on desktop, vertical on mobile */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop horizontal connector */}
                  <div className="hidden sm:flex items-center">
                    <div
                      className={`h-1 transition-all duration-300 rounded-full
                        ${index + 1 < currentStep ? "bg-green-500" : "bg-gray-300"}
                      `}
                      /* width responsive: sm -> 72px, md -> 96px, lg -> 128px */
                      style={{ width: "6rem" }} /* adjust here as needed or replace with Tailwind custom classes */
                    />
                  </div>

                  {/* Mobile vertical connector */}
                  <div className="flex sm:hidden justify-center">
                    <div
                      className={`w-0.5 mt-2 mb-2 transition-all duration-300 rounded
                        ${index + 1 < currentStep ? "bg-green-500 h-8" : "bg-gray-300 h-8"}
                      `}
                    />
                  </div>
                </>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentSteps;
