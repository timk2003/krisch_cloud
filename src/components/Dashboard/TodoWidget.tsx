import { useState } from 'react';
import { TodoItem } from '../../types';
import { CheckCircle, Circle, PlusCircle, Trash2 } from 'lucide-react';

interface TodoWidgetProps {
  initialTodos: TodoItem[];
}

const TodoWidget = ({ initialTodos }: TodoWidgetProps) => {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const todo: TodoItem = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm transition-all hover:shadow-md h-full">
      <h3 className="font-medium mb-3">Heutige Aufgaben</h3>
      
      <div className="flex mb-3">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Neue Aufgabe hinzufügen"
          className="flex-1 p-2 text-sm bg-background border border-input rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button 
          onClick={addTodo}
          className="px-3 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90 transition-colors"
        >
          <PlusCircle size={18} />
        </button>
      </div>
      
      <div className="space-y-1 max-h-[200px] overflow-y-auto">
        {todos.map(todo => (
          <div 
            key={todo.id} 
            className="flex items-center group p-2 hover:bg-secondary/50 rounded-md transition-colors"
          >
            <button 
              onClick={() => toggleTodo(todo.id)}
              className="mr-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {todo.completed ? (
                <CheckCircle size={18} className="text-primary" />
              ) : (
                <Circle size={18} />
              )}
            </button>
            <span className={`flex-1 text-sm ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        
        {todos.length === 0 && (
          <p className="text-sm text-muted-foreground py-2 text-center">Keine Aufgaben für heute</p>
        )}
      </div>
    </div>
  );
};

export default TodoWidget;