import { Quote } from '../../types';
import { QuoteIcon } from 'lucide-react';

interface QuoteWidgetProps {
  quote: Quote;
}

const QuoteWidget = ({ quote }: QuoteWidgetProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 h-full shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start">
        <QuoteIcon className="text-primary mr-2 shrink-0 mt-1" size={20} />
        <div>
          <p className="text-sm md:text-base italic">{quote.text}</p>
          <p className="text-sm text-muted-foreground mt-2">– {quote.author}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteWidget;