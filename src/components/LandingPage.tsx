import { PhilippineClock } from './PhilippineClock';
import { Landmark, Banknote, QrCode, Star, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface LandingPageProps {
  onServiceSelect: (service: 'cash' | 'priority' | 'qr' | 'other') => void;
}

export const LandingPage = ({ onServiceSelect }: LandingPageProps) => {
  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto">
        {/* 3 Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[calc(100vh-8rem)]">
          
          {/* LEFT SECTION - Welcome */}
          <Card className="p-8 flex flex-col justify-center items-center text-center relative card-elevated">
            <div className="absolute top-4 right-4">
              <PhilippineClock className="text-xs" />
            </div>
            
            <Landmark className="w-20 h-20 text-primary mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Welcome to Philippine Banking
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              Please let us know how we can help you today.
            </p>
          </Card>

          {/* MIDDLE SECTION - Cash/Check Transaction */}
          <Card 
            className="p-8 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-xl transition-all hover:scale-105 card-elevated bg-primary text-primary-foreground"
            onClick={() => onServiceSelect('cash')}
            role="button"
            tabIndex={0}
          >
            <Banknote className="w-24 h-24 mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Start a Cash or Check Transaction
            </h2>
            <p className="text-lg opacity-90">
              Deposit, Withdraw, Encash, Pay Bills
            </p>
          </Card>

          {/* RIGHT SECTION - Three Options */}
          <div className="flex flex-col gap-6">
            
            {/* Scan QR */}
            <Card 
              className="p-6 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105 card-elevated flex-1"
              onClick={() => onServiceSelect('qr')}
              role="button"
              tabIndex={0}
            >
              <div className="bg-primary/10 p-4 rounded-full">
                <QrCode className="w-10 h-10 text-primary" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-bold mb-1">Scan QR</h3>
                <p className="text-sm text-muted-foreground">Quick transaction via QR code</p>
              </div>
            </Card>

            {/* Priority Lane */}
            <Card 
              className="p-6 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105 card-elevated flex-1 bg-accent text-accent-foreground"
              onClick={() => onServiceSelect('priority')}
              role="button"
              tabIndex={0}
            >
              <div className="bg-background/20 p-4 rounded-full">
                <Star className="w-10 h-10" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-bold mb-1">Priority Lane</h3>
                <p className="text-sm opacity-80">Senior citizens, PWD, pregnant</p>
              </div>
            </Card>

            {/* Other Transactions */}
            <Card 
              className="p-6 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105 card-elevated flex-1"
              onClick={() => onServiceSelect('other')}
              role="button"
              tabIndex={0}
            >
              <div className="bg-primary/10 p-4 rounded-full">
                <MoreHorizontal className="w-10 h-10 text-primary" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-bold mb-1">Other Transactions</h3>
                <p className="text-sm text-muted-foreground">Account opening, inquiries</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
