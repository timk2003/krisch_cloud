import { useState } from 'react';
import { MoodOption } from '../../types';

interface MoodWidgetProps {
  options: MoodOption[];
}

const MoodWidget = ({ options }: MoodWidgetProps) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm transition-all hover:shadow-md h-full">
      <h3 className="font-medium mb-3">Wie fühlst du dich heute?</h3>
      
      <div className="flex justify-between items-center">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedMood(option.emoji)}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-xl
              transition-all duration-200
              ${selectedMood === option.emoji 
                ? 'bg-primary/20 transform scale-110' 
                : 'hover:bg-secondary/80'
              }
            `}
            title={option.label}
          >
            {option.emoji}
          </button>
        ))}
      </div>
      
      {selectedMood && (
        <div className="mt-3 text-center text-sm">
          <p>Deine Stimmung wurde gespeichert.</p>
        </div>
      )}
    </div>
  );
};

export default MoodWidget;