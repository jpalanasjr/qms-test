import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Banknote, Receipt, DollarSign, FileText } from 'lucide-react';
import { DepositFlow } from './DepositFlow';
import { WithdrawFlow } from './WithdrawFlow';
import { EncashFlow } from './EncashFlow';
import { PayBillsFlow } from './PayBillsFlow';

interface CashCheckFlowProps {
  onBack: () => void;
  onComplete: (data: any) => void;
  isPriority?: boolean;
}

type TransactionType = 'deposit' | 'withdraw' | 'encash' | 'paybills' | null;

export const CashCheckFlow = ({ onBack, onComplete, isPriority = false }: CashCheckFlowProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionType>(null);

  if (selectedTransaction === 'deposit') {
    return <DepositFlow onBack={() => setSelectedTransaction(null)} onComplete={onComplete} isPriority={isPriority} />;
  }

  if (selectedTransaction === 'withdraw') {
    return <WithdrawFlow onBack={() => setSelectedTransaction(null)} onComplete={onComplete} isPriority={isPriority} />;
  }

  if (selectedTransaction === 'encash') {
    return <EncashFlow onBack={() => setSelectedTransaction(null)} onComplete={onComplete} isPriority={isPriority} />;
  }

  if (selectedTransaction === 'paybills') {
    return <PayBillsFlow onBack={() => setSelectedTransaction(null)} onComplete={onComplete} isPriority={isPriority} />;
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto max-w-4xl">
        <Button variant="outline" onClick={onBack} className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <h1 className="text-3xl font-bold mb-8 text-center">
          {isPriority ? 'Priority Lane - ' : ''}Select Transaction Type
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className="p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all hover:scale-105 card-elevated"
            onClick={() => setSelectedTransaction('deposit')}
            role="button"
          >
            <Banknote className="w-20 h-20 text-primary mb-4" />
            <h2 className="text-2xl font-bold">Deposit</h2>
            <p className="text-muted-foreground text-center mt-2">Cash or check deposit</p>
          </Card>

          <Card
            className="p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all hover:scale-105 card-elevated"
            onClick={() => setSelectedTransaction('withdraw')}
            role="button"
          >
            <DollarSign className="w-20 h-20 text-primary mb-4" />
            <h2 className="text-2xl font-bold">Withdraw</h2>
            <p className="text-muted-foreground text-center mt-2">Savings or checking account</p>
          </Card>

          <Card
            className="p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all hover:scale-105 card-elevated"
            onClick={() => setSelectedTransaction('encash')}
            role="button"
          >
            <Receipt className="w-20 h-20 text-primary mb-4" />
            <h2 className="text-2xl font-bold">Encash</h2>
            <p className="text-muted-foreground text-center mt-2">Encash check</p>
          </Card>

          <Card
            className="p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all hover:scale-105 card-elevated"
            onClick={() => setSelectedTransaction('paybills')}
            role="button"
          >
            <FileText className="w-20 h-20 text-primary mb-4" />
            <h2 className="text-2xl font-bold">Pay Bills</h2>
            <p className="text-muted-foreground text-center mt-2">Utilities and services</p>
          </Card>
        </div>
      </div>
    </div>
  );
};
