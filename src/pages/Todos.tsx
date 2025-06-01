import { useState } from 'react';
import { ListTodoIcon, Calendar, CheckCircle, Circle, PlusCircle, Trash2, Filter, Target } from 'lucide-react';

type TodoStatus = 'offen' | 'erledigt';
type TodoTimeframe = 'tag' | 'woche' | 'monat';
type TodoType = 'task' | 'goal';

interface Todo {
  id: string;
  text: string;
  status: TodoStatus;
  timeframe: TodoTimeframe;
  priority: 'niedrig' | 'mittel' | 'hoch';
  createdAt: string;
  type: TodoType;
  progress?: number;
}

const Todos = () => {
  // Demo-Daten
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Präsentation vorbereiten", status: "offen", timeframe: "tag", priority: "hoch", createdAt: "2025-05-15", type: "task" },
    { id: "2", text: "E-Mails beantworten", status: "erledigt", timeframe: "tag", priority: "mittel", createdAt: "2025-05-15", type: "task" },
    { id: "3", text: "Projektplan erstellen", status: "offen", timeframe: "woche", priority: "hoch", createdAt: "2025-05-14", type: "task" },
    { id: "4", text: "Meeting mit Team", status: "offen", timeframe: "woche", priority: "mittel", createdAt: "2025-05-13", type: "task" },
    { id: "5", text: "5 Bücher lesen", status: "offen", timeframe: "monat", priority: "hoch", createdAt: "2025-05-10", type: "goal", progress: 60 },
    { id: "6", text: "Projekt abschließen", status: "offen", timeframe: "monat", priority: "hoch", createdAt: "2025-05-10", type: "goal", progress: 85 },
    { id: "7", text: "Fitnessziel erreichen", status: "erledigt", timeframe: "monat", priority: "mittel", createdAt: "2025-05-05", type: "goal", progress: 100 }
  ]);
  
  const [activeFilter, setActiveFilter] = useState<TodoTimeframe>('tag');
  const [activeType, setActiveType] = useState<TodoType>('task');
  const [newTodo, setNewTodo] = useState('');
  const [newPriority, setNewPriority] = useState<'niedrig' | 'mittel' | 'hoch'>('mittel');
  
  const filteredTodos = todos.filter(todo => 
    todo.timeframe === activeFilter && todo.type === activeType
  );
  
  const toggleTodoStatus = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, status: todo.status === 'offen' ? 'erledigt' : 'offen', progress: todo.type === 'goal' ? (todo.status === 'offen' ? 100 : todo.progress) : undefined } 
        : todo
    ));
  };
  
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const updateProgress = (id: string, newProgress: number) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, progress: newProgress, status: newProgress === 100 ? 'erledigt' : 'offen' } 
        : todo
    ));
  };
  
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      status: 'offen',
      timeframe: activeFilter,
      priority: newPriority,
      createdAt: new Date().toISOString().split('T')[0],
      type: activeType,
      progress: activeType === 'goal' ? 0 : undefined
    };
    
    setTodos([todo, ...todos]);
    setNewTodo('');
  };
  
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'hoch':
        return 'bg-destructive/20 text-destructive';
      case 'mittel':
        return 'bg-warning/20 text-warning';
      case 'niedrig':
        return 'bg-success/20 text-success';
      default:
        return 'bg-secondary text-muted-foreground';
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">ToDos & Monatsziele</h1>
        <p className="text-muted-foreground">Verwalte deine täglichen Aufgaben und monatlichen Ziele</p>
      </div>
      
      {/* Type-Filter */}
      <div className="mb-6 flex border border-border rounded-md overflow-hidden">
        <button 
          onClick={() => setActiveType('task')}
          className={`flex-1 py-2 px-4 text-center flex items-center justify-center gap-2 ${activeType === 'task' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
        >
          <ListTodoIcon size={16} />
          <span>Aufgaben</span>
        </button>
        <button 
          onClick={() => setActiveType('goal')}
          className={`flex-1 py-2 px-4 text-center flex items-center justify-center gap-2 ${activeType === 'goal' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
        >
          <Target size={16} />
          <span>Monatsziele</span>
        </button>
      </div>
      
      {/* Zeitraum-Filter (nur für Aufgaben) */}
      {activeType === 'task' && (
        <div className="mb-6 flex border border-border rounded-md overflow-hidden">
          <button 
            onClick={() => setActiveFilter('tag')}
            className={`flex-1 py-2 px-4 text-center ${activeFilter === 'tag' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
          >
            Heute
          </button>
          <button 
            onClick={() => setActiveFilter('woche')}
            className={`flex-1 py-2 px-4 text-center ${activeFilter === 'woche' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
          >
            Diese Woche
          </button>
          <button 
            onClick={() => setActiveFilter('monat')}
            className={`flex-1 py-2 px-4 text-center ${activeFilter === 'monat' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
          >
            Diesen Monat
          </button>
        </div>
      )}
      
      {/* Neue Aufgabe/Ziel */}
      <div className="bg-card border border-border rounded-lg shadow-sm p-5 mb-6">
        <div className="flex items-center mb-4">
          {activeType === 'task' ? (
            <ListTodoIcon className="text-primary mr-2\" size={20} />
          ) : (
            <Target className="text-primary mr-2" size={20} />
          )}
          <h2 className="text-xl font-semibold">
            {activeType === 'task' ? 'Neue Aufgabe' : 'Neues Monatsziel'}
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder={activeType === 'task' ? 'Neue Aufgabe hinzufügen' : 'Neues Monatsziel hinzufügen'}
            className="flex-1 p-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as 'niedrig' | 'mittel' | 'hoch')}
            className="p-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="niedrig">Niedrige Priorität</option>
            <option value="mittel">Mittlere Priorität</option>
            <option value="hoch">Hohe Priorität</option>
          </select>
          
          <button 
            onClick={addTodo}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center"
          >
            <PlusCircle size={18} className="mr-2" />
            <span>Hinzufügen</span>
          </button>
        </div>
      </div>
      
      {/* Aufgaben/Ziele Liste */}
      <div className="bg-card border border-border rounded-lg shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {activeType === 'task' ? (
              <>
                {activeFilter === 'tag' && 'Heutige Aufgaben'}
                {activeFilter === 'woche' && 'Aufgaben dieser Woche'}
                {activeFilter === 'monat' && 'Aufgaben dieses Monats'}
              </>
            ) : (
              'Monatsziele'
            )}
          </h2>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter size={14} />
            <span>Filter: {filteredTodos.length} {activeType === 'task' ? 'Aufgaben' : 'Ziele'}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <p>Keine {activeType === 'task' ? 'Aufgaben' : 'Ziele'} in diesem Zeitraum</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div 
                key={todo.id} 
                className="flex items-start group p-3 hover:bg-secondary/50 rounded-md transition-colors border border-border"
              >
                <button 
                  onClick={() => toggleTodoStatus(todo.id)}
                  className="mr-3 text-muted-foreground hover:text-primary transition-colors mt-1"
                >
                  {todo.status === 'erledigt' ? (
                    <CheckCircle size={20} className="text-primary" />
                  ) : (
                    <Circle size={20} />
                  )}
                </button>
                
                <div className="flex-1">
                  <span className={`${todo.status === 'erledigt' ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                    {todo.text}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityClass(todo.priority)}`}>
                      {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {new Date(todo.createdAt).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                  
                  {todo.type === 'goal' && !todo.status && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Fortschritt</span>
                        <span>{todo.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${todo.progress}%` }}
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={todo.progress}
                        onChange={(e) => updateProgress(todo.id, parseInt(e.target.value))}
                        className="w-full mt-2"
                      />
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity mt-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;