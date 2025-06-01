import { BookOpenIcon, BookOpen, Calendar, Clock } from 'lucide-react';

interface LearningGoal {
  title: string;
  progress: number;
  dueDate: string;
}

interface ExamDate {
  subject: string;
  date: string;
  location: string;
  duration: string;
}

const Schulung = () => {
  // Demo-Daten
  const currentTopic = {
    title: "React Advanced Patterns",
    description: "Fortgeschrittene Patterns und Best Practices in React, einschließlich Hooks, Context API und Performance-Optimierungen.",
    startDate: "02.05.2025",
    endDate: "30.05.2025",
    resources: [
      { name: "Offizielle React Dokumentation", type: "Website" },
      { name: "Advanced React Patterns Kurs", type: "Online-Kurs" },
      { name: "React Performance Optimization", type: "E-Book" }
    ]
  };

  const learningGoals: LearningGoal[] = [
    { title: "Custom Hooks implementieren", progress: 80, dueDate: "20.05.2025" },
    { title: "Context API verstehen", progress: 60, dueDate: "25.05.2025" },
    { title: "React Performance optimieren", progress: 30, dueDate: "30.05.2025" }
  ];

  const examDates: ExamDate[] = [
    { 
      subject: "React Advanced",
      date: "15.06.2025",
      location: "Online",
      duration: "120 min"
    },
    {
      subject: "Frontend Architecture",
      date: "20.07.2025",
      location: "Berlin",
      duration: "180 min"
    },
    {
      subject: "Performance Optimization",
      date: "10.08.2025",
      location: "Online",
      duration: "90 min"
    }
  ];

  const nextExam = examDates[0];
  const examDate = new Date(nextExam.date.split('.').reverse().join('-'));
  const today = new Date();
  const daysLeft = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Schulung</h1>
        <p className="text-muted-foreground">Verfolge deinen Lernfortschritt und Ziele</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Aktuelles Thema */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-4">
            <BookOpenIcon className="text-primary mr-2" size={20} />
            <h2 className="text-xl font-semibold">Aktuelles Thema</h2>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium">{currentTopic.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{currentTopic.description}</p>
            
            <div className="flex mt-3 text-sm">
              <div className="flex items-center mr-4">
                <Calendar size={14} className="mr-1 text-primary" />
                <span>Start: {currentTopic.startDate}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-1 text-primary" />
                <span>Ende: {currentTopic.endDate}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Lernmaterialien</h4>
            <div className="space-y-2">
              {currentTopic.resources.map((resource, index) => (
                <div key={index} className="flex items-center bg-secondary/30 p-2 rounded-md">
                  <BookOpen size={16} className="mr-2 text-primary" />
                  <span className="text-sm">{resource.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{resource.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Prüfungs-Countdown */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4">Nächste Prüfung</h2>
          
          <div className="flex flex-col items-center justify-center h-[200px]">
            <div className="text-5xl font-bold text-primary mb-2">{daysLeft}</div>
            <div className="text-muted-foreground">Tage bis zur Prüfung</div>
            <div className="mt-4 text-sm">
              <p className="font-medium">{nextExam.subject}</p>
              <div className="flex items-center mt-1 text-muted-foreground">
                <Clock size={14} className="mr-1" />
                <span>{nextExam.date}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Prüfungstermine */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4">Prüfungstermine</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-4 text-sm font-medium">Prüfung</th>
                  <th className="text-left py-2 px-4 text-sm font-medium">Datum</th>
                  <th className="text-left py-2 px-4 text-sm font-medium">Ort</th>
                  <th className="text-left py-2 px-4 text-sm font-medium">Dauer</th>
                </tr>
              </thead>
              <tbody>
                {examDates.map((exam, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-sm font-medium">{exam.subject}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{exam.date}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{exam.location}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{exam.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Lernziele */}
        <div className="lg:col-span-1 bg-card border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4">Lernziele</h2>
          
          <div className="space-y-4">
            {learningGoals.map((goal, index) => (
              <div key={index} className="border border-border rounded-md p-4">
                <h3 className="font-medium mb-1">{goal.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <Calendar size={12} className="mr-1" />
                  <span>Fällig am {goal.dueDate}</span>
                </div>
                
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs">
                  <span>Fortschritt</span>
                  <span>{goal.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schulung;