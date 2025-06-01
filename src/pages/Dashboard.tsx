import { Quote, ProgressItem, UploadItem, TodoItem, MoodOption } from '../types';
import QuoteWidget from '../components/Dashboard/QuoteWidget';
import ProgressWidget from '../components/Dashboard/ProgressWidget';
import UploadsWidget from '../components/Dashboard/UploadsWidget';
import TodoWidget from '../components/Dashboard/TodoWidget';
import MoodWidget from '../components/Dashboard/MoodWidget';

// Demo-Daten
const quote: Quote = {
  text: "Der beste Weg, die Zukunft vorherzusagen, ist, sie zu gestalten.",
  author: "Peter Drucker"
};

const progressItems: ProgressItem[] = [
  { name: "Fitness", progress: 70, color: "primary" },
  { name: "Schulung", progress: 45, color: "success" }
];

const uploads: UploadItem[] = [
  { name: "Trainingsplan.pdf", type: "document", date: "Heute, 10:23", size: "1.2 MB" },
  { name: "Projektdokumentation.docx", type: "document", date: "Gestern, 16:45", size: "3.5 MB" },
  { name: "Finanzbericht.xlsx", type: "spreadsheet", date: "21.05.2025", size: "2.1 MB" },
  { name: "Profilbild.jpg", type: "image", date: "18.05.2025", size: "0.8 MB" }
];

const todos: TodoItem[] = [
  { id: "1", text: "E-Mails beantworten", completed: true },
  { id: "2", text: "Präsentation vorbereiten", completed: false },
  { id: "3", text: "Fitness-Training absolvieren", completed: false }
];

const moodOptions: MoodOption[] = [
  { emoji: "😀", label: "Sehr gut" },
  { emoji: "🙂", label: "Gut" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😕", label: "Nicht so gut" },
  { emoji: "😞", label: "Schlecht" }
];

const Dashboard = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Willkommen zurück! Hier ist dein täglicher Überblick.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <QuoteWidget quote={quote} />
        </div>
        
        <div>
          <MoodWidget options={moodOptions} />
        </div>
        
        <div>
          <ProgressWidget title="Fortschritt" items={progressItems} />
        </div>
        
        <div>
          <TodoWidget initialTodos={todos} />
        </div>
        
        <div>
          <UploadsWidget uploads={uploads} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;