import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { NumericKeyboard } from '../NumericKeyboard';

interface WithdrawFlowProps {
  onBack: () => void;
  onComplete: (data: any) => void;
  isPriority: boolean;
}

export const WithdrawFlow = ({ onBack, onComplete, isPriority }: WithdrawFlowProps) => {
  const [step, setStep] = useState<'type' | 'input' | 'review'>('type');
  const [accountType, setAccountType] = useState<'savings' | 'checking' | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeField, setActiveField] = useState<'account' | 'amount'>('account');

  const handleTypeSelect = (type: 'savings' | 'checking') => {
    setAccountType(type);
    setStep('input');
  };

  const handleSubmit = () => {
    if (accountNumber.length >= 10 && amount.length > 0) {
      setStep('review');
    }
  };

  const handleConfirm = () => {
    onComplete({
      type: 'Withdraw',
      accountType: accountType === 'savings' ? 'Savings' : 'Checking',
      accountNumber,
      amount: `₱${parseFloat(amount).toLocaleString('en-PH')}`,
      serviceType: isPriority ? 'priority' : 'cash',
    });
  };

  const handleKeyboardInput = (value: string) => {
    if (activeField === 'account') {
      setAccountNumber(value);
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
                <span className="font-bold">Withdraw - {accountType === 'savings' ? 'Savings' : 'Checking'}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Account Number:</span>
                <span className="font-bold">{accountNumber}</span>
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
              Withdraw from {accountType === 'savings' ? 'Savings' : 'Checking'}
            </h2>

            <div className="space-y-6">
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
                  placeholder="Enter account number"
                  maxLength={13}
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
                  value={activeField === 'account' ? accountNumber : amount}
                  onChange={handleKeyboardInput}
                  onClose={() => setShowKeyboard(false)}
                />
              </div>
            )}

            <Button
              size="lg"
              className="w-full mt-6"
              onClick={handleSubmit}
              disabled={accountNumber.length < 10 || amount.length === 0}
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

        <h1 className="text-3xl font-bold mb-8 text-center">Select Account Type</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className="p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all hover:scale-105 card-elevated"
            onClick={() => handleTypeSelect('savings')}
            role="button"
          >
            <h2 className="text-2xl font-bold">Savings</h2>
            <p className="text-muted-foreground text-center mt-2">Withdraw from savings account</p>
          </Card>

          <Card
            className="p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all hover:scale-105 card-elevated"
            onClick={() => handleTypeSelect('checking')}
            role="button"
          >
            <h2 className="text-2xl font-bold">Checking</h2>
            <p className="text-muted-foreground text-center mt-2">Withdraw from checking account</p>
          </Card>
        </div>
      </div>
    </div>
  );
};
