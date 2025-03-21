
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import ReaderControls from '@/components/ReaderControls';
import { useReader } from '@/context/ReaderContext';
import { applyCopyProtection } from '@/utils/copyProtection';
import { decryptText, deobscureForDisplay } from '@/utils/encryption';

// Mock encrypted content for demonstration
const generateMockContent = (chapter: number) => {
  // This would normally come encrypted from the server
  // Here we're simulating encrypted content
  const paragraphs = [];
  const paragraphCount = 10 + Math.floor(Math.random() * 15);
  
  for (let i = 0; i < paragraphCount; i++) {
    paragraphs.push(`This is paragraph ${i + 1} of chapter ${chapter}. It contains secure content that demonstrates the reading experience of the NovelCipher application. Each paragraph is carefully encrypted and protected against unauthorized copying or distribution.`);
  }
  
  // In a real app, this would be actual encrypted content
  return paragraphs.join('\n\n');
};

const Reader = () => {
  const { chapter } = useParams<{ chapter: string }>();
  const chapterNumber = parseInt(chapter || '1', 10);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { fontSizeClass } = useReader();
  
  // Simulate fetching encrypted content
  useEffect(() => {
    const fetchChapterContent = async () => {
      setLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // In a real application, this would fetch from the backend
        const mockEncryptedContent = generateMockContent(chapterNumber);
        
        // Decrypt the content (in a real app)
        // const decryptedContent = decryptText(mockEncryptedContent);
        
        // For demo, we're using the mock content directly
        setContent(mockEncryptedContent);
      } catch (error) {
        console.error('Error fetching chapter:', error);
        toast({
          title: "Error",
          description: "Failed to load chapter content",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchChapterContent();
    
    // Update page title
    document.title = `Chapter ${chapterNumber} | NovelCipher`;
  }, [chapterNumber, toast]);
  
  // Apply copy protection to the content
  useEffect(() => {
    if (contentRef.current) {
      applyCopyProtection(contentRef.current);
    }
  }, [content]);
  
  const handleNavigate = (newChapter: number) => {
    navigate(`/read/${newChapter}`);
  };
  
  const paragraphs = content.split('\n\n');
  
  return (
    <div className="min-h-screen bg-background">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="reader-container"
      >
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Chapters
        </Button>
        
        <ReaderControls 
          currentChapter={chapterNumber}
          totalChapters={20} // This would be dynamic in a real app
          onNavigate={handleNavigate}
          className="mb-10"
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={chapterNumber}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-serif font-medium mb-8">
              Chapter {chapterNumber}
            </h1>
            
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-4 bg-muted animate-pulse rounded"
                    style={{ width: `${80 + Math.random() * 20}%` }}
                  />
                ))}
              </div>
            ) : (
              <div 
                ref={contentRef} 
                className={`reader-content protected-content ${fontSizeClass}`}
              >
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        <ReaderControls 
          currentChapter={chapterNumber}
          totalChapters={20}
          onNavigate={handleNavigate}
          className="mt-10"
        />
      </motion.div>
    </div>
  );
};

export default Reader;
