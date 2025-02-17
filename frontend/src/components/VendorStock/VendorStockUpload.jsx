import React, { useState } from "react";
import VendorStockUploadStep1 from "./VendorStockUploadStep1";
import VendorStockUploadStep2 from "./VendorStockUploadStep2";

export default function VendorStockUpload() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div>
      {step <= 2 ? (
        <VendorStockUploadStep1 step={step} onNext={nextStep} onBack={prevStep} />
      ) : (
        <VendorStockUploadStep2 step={step} onNext={nextStep} onBack={prevStep} />
      )}
    </div>
  );
}
