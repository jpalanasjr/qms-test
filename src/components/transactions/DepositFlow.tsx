import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { NumericKeyboard } from '../NumericKeyboard';

interface DepositFlowProps {
  onBack: () => void;
  onComplete: (data: any) => void;
  isPriority: boolean;
}

export const DepositFlow = ({ onBack, onComplete, isPriority }: DepositFlowProps) => {
  const [step, setStep] = useState<'type' | 'input' | 'review'>('type');
  const [depositType, setDepositType] = useState<'cash' | 'check' | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [checkNumber, setCheckNumber] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeField, setActiveField] = useState<'account' | 'check'>('account');

  const handleTypeSelect = (type: 'cash' | 'check') => {
    setDepositType(type);
    setStep('input');
  };

  const handleSubmit = () => {
    if (depositType === 'cash' && accountNumber.length >= 10) {
      setStep('review');
    } else if (depositType === 'check' && checkNumber.length > 0) {
      setStep('review');
    }
  };

  const handleConfirm = () => {
    onComplete({
      type: 'Deposit',
      subType: depositType === 'cash' ? 'Cash' : 'Check',
      accountNumber: depositType === 'cash' ? accountNumber : undefined,
      checkNumber: depositType === 'check' ? checkNumber : undefined,
      serviceType: isPriority ? 'priority' : 'cash',
    });
  };

  const handleKeyboardInput = (value: string) => {
    if (activeField === 'account') {
      setAccountNumber(value);
    } else {
      setCheckNumber(value);
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
                <span className="font-bold">Deposit - {depositType === 'cash' ? 'Cash' : 'Check'}</span>
              </div>
              {depositType === 'cash' && (
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">Account Number:</span>
                  <span className="font-bold">{accountNumber}</span>
                </div>
              )}
              {depositType === 'check' && (
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">Check Number:</span>
                  <span className="font-bold">{checkNumber}</span>
                </div>
              )}
            </div>

            <Button size="lg" className="w-full" onClick={handleConfirm}>
              Confirm & Get Queue Number
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'input') {
    return (
      <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto max-w-2xl">
          <Button variant="outline" onClick={() => setStep('type')} className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Card className="p-8 card-elevated">
            <h2 className="text-2xl font-bold mb-6">
              {depositType === 'cash' ? 'Cash Deposit' : 'Check Deposit'}
            </h2>

            {depositType === 'cash' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Account Number</label>
                  <Input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                    onFocus={() => {
                      setActiveField('account');
                      setShowKeyboard(true);
                    }}
                    placeholder="Enter 10-13 digit account number"
                    maxLength={13}
                    className="text-xl p-6"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
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
              </div>
            )}

            {showKeyboard && (
              <div className="mt-6">
                <NumericKeyboard
                  value={activeField === 'account' ? accountNumber : checkNumber}
                  onChange={handleKeyboardInput}
                  onClose={() => setShowKeyboard(false)}
                  alphanumeric={depositType === 'check'}
                />
              </div>
            )}

            <Button
              size="lg"
              className="w-full mt-6"
              onClick={handleSubmit}
              disabled={
                (depositType === 'cash' && accountNumber.length < 10) ||
                (depositType === 'check' && checkNumber.length === 0)
              }
            >
              Continue to Review
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

        <h1 className="text-3xl font-bold mb-8 text-center">Select Deposit Type</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className="p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all hover:scale-105 card-elevated"
            onClick={() => handleTypeSelect('cash')}
            role="button"
          >
            <h2 className="text-2xl font-bold">Cash</h2>
            <p className="text-muted-foreground text-center mt-2">Deposit cash to account</p>
          </Card>

          <Card
            className="p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all hover:scale-105 card-elevated"
            onClick={() => handleTypeSelect('check')}
            role="button"
          >
            <h2 className="text-2xl font-bold">Check</h2>
            <p className="text-muted-foreground text-center mt-2">Deposit check to account</p>
          </Card>
        </div>
      </div>
    </div>
  );
};
