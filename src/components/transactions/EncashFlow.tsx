import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { NumericKeyboard } from '../NumericKeyboard';

interface EncashFlowProps {
  onBack: () => void;
  onComplete: (data: any) => void;
  isPriority: boolean;
}

export const EncashFlow = ({ onBack, onComplete, isPriority }: EncashFlowProps) => {
  const [checkNumber, setCheckNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'input' | 'review'>('input');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeField, setActiveField] = useState<'check' | 'amount'>('check');

  const handleSubmit = () => {
    if (checkNumber.length > 0 && amount.length > 0) {
      setStep('review');
    }
  };

  const handleConfirm = () => {
    onComplete({
      type: 'Encash Check',
      checkNumber,
      amount: `₱${parseFloat(amount).toLocaleString('en-PH')}`,
      serviceType: isPriority ? 'priority' : 'cash',
    });
  };

  const handleKeyboardInput = (value: string) => {
    if (activeField === 'check') {
      setCheckNumber(value);
    } else {
      setAmount(value);
    }
  };

  if (step === 'review') {
    return (
      <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto max-w-2xl">
          <Button variant="outline" onClick={() => setStep('input')} className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Edit
          </Button>

          <Card className="p-8 card-elevated">
            <h2 className="text-2xl font-bold mb-6">Review Your Transaction</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Transaction Type:</span>
                <span className="font-bold">Encash Check</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Check Number:</span>
                <span className="font-bold">{checkNumber}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-bold text-2xl text-primary">₱{parseFloat(amount).toLocaleString('en-PH')}</span>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={handleConfirm}>
              Confirm & Get Queue Number
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto max-w-2xl">
        <Button variant="outline" onClick={onBack} className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <Card className="p-8 card-elevated">
          <h2 className="text-2xl font-bold mb-6">Encash Check</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Check Number</label>
              <Input
                type="text"
                value={checkNumber}
                onChange={(e) => setCheckNumber(e.target.value)}
                onFocus={() => {
                  setActiveField('check');
                  setShowKeyboard(true);
                }}
                placeholder="Enter check number"
                maxLength={20}
                className="text-xl p-6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Amount (PHP)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground">₱</span>
                <Input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                  onFocus={() => {
                    setActiveField('amount');
                    setShowKeyboard(true);
                  }}
                  placeholder="0.00"
                  className="text-xl p-6 pl-10"
                />
              </div>
            </div>
          </div>

          {showKeyboard && (
            <div className="mt-6">
              <NumericKeyboard
                value={activeField === 'check' ? checkNumber : amount}
                onChange={handleKeyboardInput}
                onClose={() => setShowKeyboard(false)}
                alphanumeric={activeField === 'check'}
              />
            </div>
          )}

          <Button
            size="lg"
            className="w-full mt-6"
            onClick={handleSubmit}
            disabled={checkNumber.length === 0 || amount.length === 0}
          >
            Continue to Review
          </Button>
        </Card>
      </div>
    </div>
  );
};
