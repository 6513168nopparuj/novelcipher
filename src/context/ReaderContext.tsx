
import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'small' | 'medium' | 'large' | 'x-large';

interface ReaderContextType {
  fontSize: FontSize;
  setFontSize: React.Dispatch<React.SetStateAction<FontSize>>;
  fontSizeClass: string;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

const fontSizeMap: Record<FontSize, string> = {
  'small': 'text-base',
  'medium': 'text-xl',
  'large': 'text-2xl',
  'x-large': 'text-3xl',
};

const fontSizeOrder: FontSize[] = ['small', 'medium', 'large', 'x-large'];

export const ReaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    // Get saved font size from localStorage or use default
    const savedSize = localStorage.getItem('reader-font-size');
    return (savedSize as FontSize) || 'medium';
  });

  useEffect(() => {
    // Save font size to localStorage when it changes
    localStorage.setItem('reader-font-size', fontSize);
  }, [fontSize]);

  const fontSizeClass = fontSizeMap[fontSize];

  const increaseFontSize = () => {
    setFontSize(prevSize => {
      const currentIndex = fontSizeOrder.indexOf(prevSize);
      const nextIndex = Math.min(currentIndex + 1, fontSizeOrder.length - 1);
      return fontSizeOrder[nextIndex];
    });
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => {
      const currentIndex = fontSizeOrder.indexOf(prevSize);
      const nextIndex = Math.max(currentIndex - 1, 0);
      return fontSizeOrder[nextIndex];
    });
  };

  return (
    <ReaderContext.Provider value={{ 
      fontSize, 
      setFontSize, 
      fontSizeClass, 
      increaseFontSize, 
      decreaseFontSize
    }}>
      {children}
    </ReaderContext.Provider>
  );
};

export const useReader = (): ReaderContextType => {
  const context = useContext(ReaderContext);
  if (context === undefined) {
    throw new Error('useReader must be used within a ReaderProvider');
  }
  return context;
};
