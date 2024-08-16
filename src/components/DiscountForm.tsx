import React, { useState, useEffect } from "react";

const DiscountForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>(() => {
    // Retrieve the initial state from local storage, if it exists
    return localStorage.getItem("selectedOption") || "";
  });
  const [discountCode, setDiscountCode] = useState<string>("");
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleDiscountCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDiscountCode(event.target.value);
  };

  const handleGenerateCode = () => {
    const newCode = "NEWCODE123";
    setGeneratedCode(newCode);
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  // Synchronize the selected option with local storage
  useEffect(() => {
    localStorage.setItem("selectedOption", selectedOption);
  }, [selectedOption]);

  // Regular expression for the discount code pattern: letters followed by numbers
  const discountCodePattern = /^[A-Z]+[0-9]+$/;
  const isDiscountCodeValid = discountCodePattern.test(discountCode);

  return (
    <div className="p-5 max-w-md mx-auto border border-gray-300 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Select an Option</h2>
      <div className="mb-4 space-y-2">
        <label className="block">
          <input
            type="radio"
            value="Option A"
            checked={selectedOption === "Option A"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Option A
        </label>
        <label className="block">
          <input
            type="radio"
            value="Option B"
            checked={selectedOption === "Option B"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Option B
        </label>
        <label className="block">
          <input
            type="radio"
            value="Option C"
            checked={selectedOption === "Option C"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Option C
        </label>
      </div>

      <h2 className="text-lg font-semibold mb-2">Enter Discount Code</h2>
      <input
        type="text"
        value={discountCode}
        onChange={handleDiscountCodeChange}
        placeholder="Enter Discount Code"
        className="mb-2 w-full p-2 border border-gray-300 rounded-md"
      />
      {!isDiscountCodeValid && discountCode && (
        <p className="text-red-500 text-sm mb-4">
          Invalid discount code! The code should consist of uppercase letters
          followed by numbers.
        </p>
      )}

      <button
        onClick={handleGenerateCode}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition mb-4"
      >
        Generate Discount Code
      </button>

      {generatedCode && <p className="mb-4">Generated Code: {generatedCode}</p>}

      <h2 className="text-lg font-semibold mb-2">Notes</h2>
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Enter your notes here"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      ></textarea>
    </div>
  );
};

export default DiscountForm;
