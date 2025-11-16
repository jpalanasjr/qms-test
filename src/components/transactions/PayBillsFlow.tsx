import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Zap, Droplet, CreditCard } from 'lucide-react';
import { NumericKeyboard } from '../NumericKeyboard';

interface PayBillsFlowProps {
  onBack: () => void;
  onComplete: (data: any) => void;
  isPriority: boolean;
}

const BILLERS = [
  { id: 'meralco', name: 'Meralco', icon: Zap, color: 'text-yellow-600' },
  { id: 'maynilad', name: 'Maynilad', icon: Droplet, color: 'text-blue-600' },
  { id: 'bdo_card', name: 'BDO Card', icon: CreditCard, color: 'text-blue-800' },
  { id: 'metrobank_card', name: 'Metrobank Card', icon: CreditCard, color: 'text-red-600' },
  { id: 'pldt', name: 'PLDT', icon: Zap, color: 'text-orange-600' },
  { id: 'globe', name: 'Globe', icon: Zap, color: 'text-blue-500' },
  { id: 'smart', name: 'Smart', icon: Zap, color: 'text-green-600' },
  { id: 'skycable', name: 'Sky Cable', icon: Zap, color: 'text-purple-600' },
];

export const PayBillsFlow = ({ onBack, onComplete, isPriority }: PayBillsFlowProps) => {
  const [step, setStep] = useState<'select' | 'input' | 'review'>('select');
  const [selectedBiller, setSelectedBiller] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeField, setActiveField] = useState<'account' | 'amount'>('account');

  const handleBillerSelect = (billerId: string) => {
    setSelectedBiller(billerId);
    setStep('input');
  };

  const handleSubmit = () => {
    if (accountNumber.length > 0 && amount.length > 0) {
      setStep('review');
    }
  };

  const handleConfirm = () => {
    const biller = BILLERS.find(b => b.id === selectedBiller);
    onComplete({
      type: 'Pay Bills',
      biller: biller?.name,
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
    const biller = BILLERS.find(b => b.id === selectedBiller);
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
                <span className="font-bold">Pay Bills</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Biller:</span>
                <span className="font-bold">{biller?.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Account/Reference Number:</span>
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
    const biller = BILLERS.find(b => b.id === selectedBiller);
    return (
      <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto max-w-2xl">
          <Button variant="outline" onClick={() => setStep('select')} className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Card className="p-8 card-elevated">
            <h2 className="text-2xl font-bold mb-6">Pay {biller?.name}</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Account/Reference Number</label>
                <Input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  onFocus={() => {
                    setActiveField('account');
                    setShowKeyboard(true);
                  }}
                  placeholder="Enter account or reference number"
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
                  alphanumeric={activeField === 'account'}
                />
              </div>
            )}

            <Button
              size="lg"
              className="w-full mt-6"
              onClick={handleSubmit}
              disabled={accountNumber.length === 0 || amount.length === 0}
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
      <div className="container mx-auto max-w-4xl">
        <Button variant="outline" onClick={onBack} className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <h1 className="text-3xl font-bold mb-8 text-center">Select Biller</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BILLERS.map((biller) => {
            const Icon = biller.icon;
            return (
              <Card
                key={biller.id}
                className="p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all hover:scale-105 card-elevated"
                onClick={() => handleBillerSelect(biller.id)}
                role="button"
              >
                <Icon className={`w-12 h-12 mb-3 ${biller.color}`} />
                <h3 className="text-lg font-bold text-center">{biller.name}</h3>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
