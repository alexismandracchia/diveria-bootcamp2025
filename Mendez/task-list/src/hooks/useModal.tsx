import { useState } from 'react';

export const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggleModal = () => setIsOpen(prev => !prev);

  return {
    isOpen,
    toggleModal, 
  };
};