import { useState } from 'react';
import { TargetIcon, Calendar, CheckCircle2, Circle, PlusCircle, Trash2 } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  completed: boolean;
}

const Monatsziele = () => {
  // Demo-Daten
  const [goals, setGoals] = useState<Goal[]>([
    { 
      id: "1", 
      title: "5 Bücher lesen", 
      description: "Mindestens 5 Fachbücher zum Thema Programmierung lesen",
      progress: 60, 
      dueDate: "31.05.2025",
      completed: false
    },
    { 
      id: "2", 
      title: "Projekt abschließen", 
      description: "Das Frontend-Projekt für den Kunden fertigstellen",
      progress: 85, 
      dueDate: "20.05.2025",
      completed: false
    },
    { 
      id: "3", 
      title: "Fitnessziel erreichen", 
      description: "12 Trainingseinheiten im Monat absolvieren",
      progress: 100, 
      dueDate: "31.05.2025",
      completed: true
    }
  ]);
  
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  
  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.description || !newGoal.dueDate) return;
    
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      progress: 0,
      dueDate: newGoal.dueDate,
      completed: false
    };
    
    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      dueDate: ''
    });
  };
  
  const updateProgress = (id: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, progress: newProgress, completed: newProgress === 100 } 
        : goal
    ));
  };
  
  const toggleComplete = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, completed: !goal.completed, progress: !goal.completed ? 100 : goal.progress } 
        : goal
    ));
  };
  
  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Monatsziele</h1>
        <p className="text-muted-foreground">Setze und verfolge deine monatlichen Ziele</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Neues Ziel */}
        <div className="lg:col-span-1 bg-card border border-border rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-4">
            <TargetIcon className="text-primary mr-2" size={20} />
            <h2 className="text-xl font-semibold">Neues Ziel</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titel</label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                placeholder="Ziel eingeben"
                className="w-full p-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Beschreibung</label>
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                rows={3}
                placeholder="Beschreibe dein Ziel"
                className="w-full p-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Fälligkeitsdatum</label>
              <input
                type="date"
                value={newGoal.dueDate}
                onChange={(e) => setNewGoal({...newGoal, dueDate: e.target.value})}
                className="w-full p-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <button 
              onClick={handleAddGoal}
              className="w-full py-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              disabled={!newGoal.title || !newGoal.description || !newGoal.dueDate}
            >
              <PlusCircle size={18} />
              <span>Ziel hinzufügen</span>
            </button>
          </div>
        </div>
        
        {/* Aktuelle Ziele */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4">Aktuelle Ziele</h2>
          
          {goals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Keine Ziele vorhanden</p>
              <p className="text-sm mt-1">Erstelle ein neues Ziel, um zu beginnen</p>
            </div>
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="border border-border rounded-md p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => toggleComplete(goal.id)}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {goal.completed ? (
                            <CheckCircle2 size={18} className="text-primary" />
                          ) : (
                            <Circle size={18} />
                          )}
                        </button>
                        <h3 className={`font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {goal.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                    </div>
                    <button 
                      onClick={() => deleteGoal(goal.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        <span>Fällig am {goal.dueDate}</span>
                      </div>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  {!goal.completed && (
                    <div className="mt-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={goal.progress}
                        onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Monatsziele;