import React, { createContext, useContext, useState, useCallback } from 'react';

interface MobileMenuContextType {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType>({
  isMenuOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
});

export const useMobileMenu = () => useContext(MobileMenuContext);

export const MobileMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <MobileMenuContext.Provider value={{ isMenuOpen, openMenu, closeMenu }}>
      {children}
    </MobileMenuContext.Provider>
  );
};
