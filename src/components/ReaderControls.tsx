
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { useReader } from '@/context/ReaderContext';
import { ChevronLeft, ChevronRight, Type, ZoomIn, ZoomOut } from 'lucide-react';

interface ReaderControlsProps {
  currentChapter: number;
  totalChapters: number;
  onNavigate: (chapter: number) => void;
  className?: string;
}

const ReaderControls: React.FC<ReaderControlsProps> = ({ 
  currentChapter, 
  totalChapters, 
  onNavigate,
  className = ''
}) => {
  const { increaseFontSize, decreaseFontSize } = useReader();
  
  const handleChapterChange = (value: string) => {
    onNavigate(parseInt(value, 10));
  };
  
  const goToPrevious = () => {
    if (currentChapter > 1) {
      onNavigate(currentChapter - 1);
    }
  };
  
  const goToNext = () => {
    if (currentChapter < totalChapters) {
      onNavigate(currentChapter + 1);
    }
  };
  
  return (
    <div className={`flex items-center justify-between glass-panel p-3 rounded-lg ${className}`}>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          disabled={currentChapter <= 1}
          className="h-9 w-9"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Select value={currentChapter.toString()} onValueChange={handleChapterChange}>
          <SelectTrigger className="w-[120px] h-9">
            <SelectValue placeholder="Chapter" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: totalChapters }, (_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                Chapter {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          disabled={currentChapter >= totalChapters}
          className="h-9 w-9"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={decreaseFontSize}
          className="h-9 w-9"
          title="Decrease font size"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={increaseFontSize}
          className="h-9 w-9"
          title="Increase font size"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ReaderControls;
