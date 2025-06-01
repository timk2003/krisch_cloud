import { useState } from 'react';
import { BookTextIcon, Calendar, Save } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  content: string;
}

const moodOptions = [
  { emoji: "😀", label: "Sehr gut" },
  { emoji: "🙂", label: "Gut" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😕", label: "Nicht so gut" },
  { emoji: "😞", label: "Schlecht" }
];

const Journal = () => {
  const today = new Date().toISOString().split('T')[0];
  
  const [entries, setEntries] = useState<JournalEntry[]>([
    { id: "1", date: "2025-05-15", mood: "🙂", content: "Heute war ein produktiver Tag. Ich habe alle geplanten Aufgaben erledigt und fühle mich gut über meinen Fortschritt." },
    { id: "2", date: "2025-05-14", mood: "😐", content: "Ein durchschnittlicher Tag. Nichts Besonderes zu berichten, aber ich fühle mich okay." },
    { id: "3", date: "2025-05-13", mood: "😀", content: "Ausgezeichneter Tag! Das Projekt wurde erfolgreich abgeschlossen und ich habe positive Rückmeldungen erhalten." }
  ]);
  
  const [currentEntry, setCurrentEntry] = useState({
    date: today,
    mood: "",
    content: ""
  });
  
  const handleSave = () => {
    if (!currentEntry.mood || !currentEntry.content.trim()) return;
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: currentEntry.date,
      mood: currentEntry.mood,
      content: currentEntry.content
    };
    
    setEntries([newEntry, ...entries]);
    setCurrentEntry({
      date: today,
      mood: "",
      content: ""
    });
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Journal</h1>
        <p className="text-muted-foreground">Halte deine Gedanken und Erfahrungen fest</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Neuer Eintrag */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-4">
            <BookTextIcon className="text-primary mr-2" size={20} />
            <h2 className="text-xl font-semibold">Neuer Eintrag</h2>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Datum</label>
            <input
              type="date"
              value={currentEntry.date}
              onChange={(e) => setCurrentEntry({...currentEntry, date: e.target.value})}
              className="w-full p-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Stimmung</label>
            <div className="flex space-x-4">
              {moodOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEntry({...currentEntry, mood: option.emoji})}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-xl
                    transition-all duration-200
                    ${currentEntry.mood === option.emoji 
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
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Was ist heute passiert?</label>
            <textarea
              value={currentEntry.content}
              onChange={(e) => setCurrentEntry({...currentEntry, content: e.target.value})}
              rows={6}
              className="w-full p-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Schreibe deine Gedanken nieder..."
            />
          </div>
          
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            disabled={!currentEntry.mood || !currentEntry.content.trim()}
          >
            <Save size={16} />
            <span>Speichern</span>
          </button>
        </div>
        
        {/* Letzte Einträge */}
        <div className="lg:col-span-1 bg-card border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4">Letzte Einträge</h2>
          
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className="border border-border rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1 text-primary" />
                    <span className="text-sm">{new Date(entry.date).toLocaleDateString('de-DE')}</span>
                  </div>
                  <span className="text-xl">{entry.mood}</span>
                </div>
                <p className="text-sm line-clamp-3">{entry.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;