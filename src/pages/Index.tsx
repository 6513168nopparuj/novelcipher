
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChapterList from '@/components/ChapterList';
import { setupGlobalCopyProtection } from '@/utils/copyProtection';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set up global copy protection
    setupGlobalCopyProtection();
    
    // Set page title
    document.title = 'NovelCipher - Secure Reading';
  }, []);
  
  const handleSelectChapter = (chapter: number) => {
    navigate(`/read/${chapter}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight mb-4">
            NovelCipher
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A secure reading experience with end-to-end encryption and content protection
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-serif font-medium mb-6">Available Chapters</h2>
          <ChapterList onSelectChapter={handleSelectChapter} />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
