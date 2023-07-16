import React, { useState } from "react";
import useScanDetection from "use-scan-detection";

const Scancode = () => {
  const [barcodeScan, setBarcodeScan] = useState("No Code");

  useScanDetection({
    onComplete: setBarcodeScan,
    minLength: 3,
  });
  return <div>Barcode: {barcodeScan}</div>;
};

export default Scancode;
