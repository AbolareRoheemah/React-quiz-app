import React, { createContext, useContext, useState } from 'react';

const SelectedOptionContext = createContext();

export const useSelectedOption = () => {
  return useContext(SelectedOptionContext);
};

export const SelectedOptionProvider = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState({}); // Store answers by question index

  const setOptionForQuestion = (index, option) => {
    setSelectedOptions(prev => ({ ...prev, [index]: option }));
  };

  return (
    <SelectedOptionContext.Provider value={{ selectedOptions, setOptionForQuestion }}>
      {children}
    </SelectedOptionContext.Provider>
  );
};