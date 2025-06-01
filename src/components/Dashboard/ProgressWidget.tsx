import { ProgressItem } from '../../types';

interface ProgressWidgetProps {
  title: string;
  items: ProgressItem[];
}

const ProgressWidget = ({ title, items }: ProgressWidgetProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm transition-all hover:shadow-md h-full">
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.name}</span>
              <span>{item.progress}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ease-out`}
                style={{ 
                  width: `${item.progress}%`, 
                  backgroundColor: `var(--${item.color})` 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressWidget;