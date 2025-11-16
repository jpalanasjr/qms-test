import { Button } from '@/components/ui/button';
import { Delete, X } from 'lucide-react';

interface NumericKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  alphanumeric?: boolean;
}

export const NumericKeyboard = ({ value, onChange, onClose, alphanumeric = false }: NumericKeyboardProps) => {
  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      onChange(value.slice(0, -1));
    } else if (key === 'clear') {
      onChange('');
    } else {
      onChange(value + key);
    }
  };

  const numericKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const alphaKeys = alphanumeric ? ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] : [];

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">On-Screen Keyboard</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {alphanumeric && (
        <div className="grid grid-cols-7 gap-2 mb-2">
          {alphaKeys.map((key) => (
            <Button
              key={key}
              variant="outline"
              onClick={() => handleKeyPress(key)}
              className="h-12 text-lg font-semibold"
            >
              {key}
            </Button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {numericKeys.map((key) => (
          <Button
            key={key}
            variant="outline"
            onClick={() => handleKeyPress(key)}
            className="h-16 text-2xl font-bold"
          >
            {key}
          </Button>
        ))}
        
        <Button
          variant="outline"
          onClick={() => handleKeyPress('clear')}
          className="h-16 text-sm"
        >
          Clear
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleKeyPress('backspace')}
          className="h-16 col-span-2"
        >
          <Delete className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};
