import { useState } from 'react';
import { DumbbellIcon, Ruler, Calendar, Weight, PlusCircle } from 'lucide-react';

interface TrainingPlan {
  day: string;
  exercises: string[];
}

interface BodyData {
  date: string;
  weight: number;
  bodyFat: number;
}

interface Supplement {
  name: string;
  dosage: string;
  timing: string;
}

const Fitness = () => {
  // Demo Daten
  const [trainingPlan] = useState<TrainingPlan[]>([
    { day: "Montag", exercises: ["Bankdrücken 4x10", "Klimmzüge 3x8", "Schulterdrücken 3x12", "Bizepscurls 3x15"] },
    { day: "Mittwoch", exercises: ["Kniebeugen 4x10", "Ausfallschritte 3x12", "Wadenheben 4x15", "Beinstrecker 3x12"] },
    { day: "Freitag", exercises: ["Kreuzheben 4x8", "Rudern 3x12", "Lat-Zug 3x10", "Trizepsdrücken 3x15"] },
  ]);

  const [bodyData] = useState<BodyData[]>([
    { date: "15.05.2025", weight: 78.5, bodyFat: 16.2 },
    { date: "08.05.2025", weight: 79.1, bodyFat: 16.4 },
    { date: "01.05.2025", weight: 79.8, bodyFat: 16.7 },
  ]);

  const [supplements] = useState<Supplement[]>([
    { name: "Protein", dosage: "30g", timing: "Nach dem Training" },
    { name: "Kreatin", dosage: "5g", timing: "Täglich" },
    { name: "Vitamin D", dosage: "2000 IE", timing: "Morgens" },
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Fitness</h1>
        <p className="text-muted-foreground">Verfolge deinen Trainingsfortschritt und Körperdaten</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trainingsplan */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <DumbbellIcon className="text-primary mr-2" size={20} />
              <h2 className="text-xl font-semibold">Trainingsplan</h2>
            </div>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <PlusCircle size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            {trainingPlan.map((day, index) => (
              <div key={index} className="border border-border rounded-md p-3">
                <h3 className="font-medium mb-2">{day.day}</h3>
                <ul className="space-y-1">
                  {day.exercises.map((exercise, idx) => (
                    <li key={idx} className="text-sm flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {exercise}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Körperdaten */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-4">
            <Ruler className="text-primary mr-2" size={20} />
            <h2 className="text-xl font-semibold">Körperdaten</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-1 text-sm font-medium">Datum</th>
                  <th className="text-left py-2 px-1 text-sm font-medium">Gewicht</th>
                  <th className="text-left py-2 px-1 text-sm font-medium">Körperfett</th>
                </tr>
              </thead>
              <tbody>
                {bodyData.map((data, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="py-3 px-1 text-sm"><Calendar size={14} className="inline mr-1" /> {data.date}</td>
                    <td className="py-3 px-1 text-sm"><Weight size={14} className="inline mr-1" /> {data.weight} kg</td>
                    <td className="py-3 px-1 text-sm">{data.bodyFat}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button className="mt-4 w-full py-2 bg-secondary hover:bg-secondary/80 rounded-md text-sm transition-colors">
            Neue Messung hinzufügen
          </button>
        </div>
        
        {/* Supplements */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4">Supplements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supplements.map((supplement, index) => (
              <div key={index} className="border border-border rounded-md p-3">
                <h3 className="font-medium">{supplement.name}</h3>
                <p className="text-sm text-muted-foreground">Dosierung: {supplement.dosage}</p>
                <p className="text-sm text-muted-foreground">Einnahme: {supplement.timing}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fitness;