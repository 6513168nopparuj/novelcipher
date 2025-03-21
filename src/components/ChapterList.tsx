
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface Chapter {
  chapter: number;
}

interface ChapterListProps {
  onSelectChapter?: (chapter: number) => void;
  displayAsGrid?: boolean;
}

// Mock data until connected to actual backend
const MOCK_CHAPTERS: Chapter[] = Array.from({ length: 20 }, (_, i) => ({ 
  chapter: i + 1 
}));

const ChapterList: React.FC<ChapterListProps> = ({ 
  onSelectChapter,
  displayAsGrid = true
}) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate API call to fetch chapters
    const fetchChapters = async () => {
      // This would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setChapters(MOCK_CHAPTERS);
      setLoading(false);
    };
    
    fetchChapters();
  }, []);
  
  const handleChapterClick = (chapter: number) => {
    if (onSelectChapter) {
      onSelectChapter(chapter);
    } else {
      navigate(`/read/${chapter}`);
    }
  };
  
  // Framer motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };
  
  if (loading) {
    return (
      <div className={displayAsGrid 
        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
        : "space-y-3"
      }>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );
  }
  
  if (displayAsGrid) {
    return (
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {chapters.map((chapter) => (
          <motion.div 
            key={chapter.chapter}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="chapter-card h-full cursor-pointer overflow-hidden"
              onClick={() => handleChapterClick(chapter.chapter)}
            >
              <CardContent className="p-0 h-full flex flex-col">
                <div className="relative h-40 bg-gradient-to-r from-accent to-secondary">
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="font-medium">
                      Chapter {chapter.chapter}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-serif font-semibold text-primary/80">
                      {chapter.chapter}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <h3 className="font-medium text-lg mb-2">
                    Chapter {chapter.chapter}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    );
  }
  
  // List view for dropdown or sidebar
  return (
    <div className="space-y-1 py-1">
      {chapters.map((chapter) => (
        <div
          key={chapter.chapter}
          className="px-3 py-2 rounded-md hover:bg-accent transition-colors cursor-pointer text-sm"
          onClick={() => handleChapterClick(chapter.chapter)}
        >
          Chapter {chapter.chapter}
        </div>
      ))}
    </div>
  );
};

export default ChapterList;
