import { useState } from 'react';
import { BanknoteIcon, PlusCircle, Trash2, ArrowUpDown } from 'lucide-react';
import { Debt } from '../types';

const Schulden = () => {
  // Demo-Daten
  const [debts, setDebts] = useState<Debt[]>([
    { id: "1", creditor: "Bank A", amount: 5000, status: "teilweise", dueDate: "30.06.2025" },
    { id: "2", creditor: "Kreditkarte", amount: 1200, status: "offen", dueDate: "15.05.2025" },
    { id: "3", creditor: "Privater Kredit", amount: 2000, status: "teilweise", dueDate: "01.08.2025" },
    { id: "4", creditor: "Autofinanzierung", amount: 8500, status: "offen", dueDate: "10.09.2025" },
    { id: "5", creditor: "Steuernachzahlung", amount: 650, status: "bezahlt", dueDate: "15.04.2025" }
  ]);

  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
  const paidDebt = debts
    .filter(debt => debt.status === "bezahlt")
    .reduce((sum, debt) => sum + debt.amount, 0);
  const progressPercentage = (paidDebt / totalDebt) * 100;

  const getStatusClass = (status: string) => {
    switch (status) {
      case "bezahlt":
        return "bg-success/20 text-success";
      case "teilweise":
        return "bg-warning/20 text-warning";
      case "offen":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-secondary text-muted-foreground";
    }
  };

  const deleteDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Schulden-Manager</h1>
        <p className="text-muted-foreground">Verwalte und überwache deine Schulden</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Schulden-Übersicht */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-5">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <BanknoteIcon className="text-primary mr-2" size={20} />
              <h2 className="text-xl font-semibold">Schulden-Übersicht</h2>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm">
              <PlusCircle size={16} />
              <span>Neue Schuld</span>
            </button>
          </div>
          
          {/* Fortschrittsbalken */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Gesamtfortschritt</span>
              <span>{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-muted-foreground">Bezahlt: {paidDebt.toLocaleString('de-DE')} €</span>
              <span className="font-medium">Gesamt: {totalDebt.toLocaleString('de-DE')} €</span>
            </div>
          </div>
          
          {/* Tabelle */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium">
                    <div className="flex items-center">
                      <span>Gläubiger</span>
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-medium">
                    <div className="flex items-center justify-end">
                      <span>Betrag</span>
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="text-center py-3 px-2 text-sm font-medium">Status</th>
                  <th className="text-right py-3 px-2 text-sm font-medium">
                    <div className="flex items-center justify-end">
                      <span>Fälligkeitsdatum</span>
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {debts.map((debt) => (
                  <tr key={debt.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-2 text-sm font-medium">{debt.creditor}</td>
                    <td className="py-3 px-2 text-sm text-right">{debt.amount.toLocaleString('de-DE')} €</td>
                    <td className="py-3 px-2 text-sm">
                      <span className={`inline-flex justify-center px-2 py-1 rounded-full text-xs ${getStatusClass(debt.status)} w-24`}>
                        {debt.status.charAt(0).toUpperCase() + debt.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-right">{debt.dueDate}</td>
                    <td className="py-3 px-2 text-sm text-right">
                      <button 
                        onClick={() => deleteDebt(debt.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schulden;