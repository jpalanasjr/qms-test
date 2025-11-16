import { useState } from 'react';
import { NavigationBar } from '@/components/NavigationBar';
import { LandingPage } from '@/components/LandingPage';
import { TVDisplayMode } from '@/components/TVDisplayMode';
import { AdminDashboard } from '@/components/AdminDashboard';
import { CashCheckFlow } from '@/components/transactions/CashCheckFlow';
import { QueueTicketDisplay } from '@/components/QueueTicketDisplay';
import { generateQueueNumber, QueueTicket, ServiceType } from '@/lib/queueManager';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, ArrowLeft } from 'lucide-react';

type View = 'landing' | 'display' | 'admin' | 'cash' | 'priority' | 'qr' | 'other' | 'ticket';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [currentTicket, setCurrentTicket] = useState<QueueTicket | null>(null);

  const handleServiceSelect = (service: ServiceType) => {
    if (service === 'cash') {
      setCurrentView('cash');
    } else if (service === 'priority') {
      setCurrentView('priority');
    } else if (service === 'qr') {
      setCurrentView('qr');
    } else if (service === 'other') {
      setCurrentView('other');
    }
  };

  const handleTransactionComplete = (data: any) => {
    const serviceType: ServiceType = data.serviceType || 'cash';
    const ticket = generateQueueNumber(serviceType);
    setCurrentTicket(ticket);
    setCurrentView('ticket');
  };

  const handleOtherTransactionSelect = (type: 'open' | 'teller') => {
    const ticket = generateQueueNumber('other');
    setCurrentTicket(ticket);
    setCurrentView('ticket');
  };

  const handleNavigate = (view: 'display' | 'ticket' | 'admin') => {
    if (view === 'display') {
      setCurrentView('display');
    } else if (view === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('landing');
      setCurrentTicket(null);
    }
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setCurrentTicket(null);
  };

  // QR Scanner Mock View
  if (currentView === 'qr') {
    return (
      <>
        <NavigationBar 
          onNavigate={handleNavigate} 
          currentView="ticket"
        />
        <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-background to-secondary/20">
          <div className="container mx-auto max-w-2xl">
            <Button variant="outline" onClick={handleBackToLanding} className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Card className="p-8 card-elevated text-center">
              <Camera className="w-24 h-24 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">QR Scanner</h2>
              <p className="text-muted-foreground mb-6">
                Position your QR code within the frame to scan.
              </p>
              <div className="w-64 h-64 mx-auto bg-muted border-4 border-dashed border-primary rounded-lg flex items-center justify-center mb-6">
                <p className="text-sm text-muted-foreground">Camera view (mock)</p>
              </div>
              <Button size="lg" onClick={() => {
                // Mock successful QR scan
                handleTransactionComplete({ serviceType: 'qr' });
              }}>
                Simulate QR Scan
              </Button>
            </Card>
          </div>
        </div>
      </>
    );
  }

  // Other Transactions View
  if (currentView === 'other') {
    return (
      <>
        <NavigationBar 
          onNavigate={handleNavigate} 
          currentView="ticket"
        />
        <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-background to-secondary/20">
          <div className="container mx-auto max-w-2xl">
            <Button variant="outline" onClick={handleBackToLanding} className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <h1 className="text-3xl font-bold mb-8 text-center">Other Transactions</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className="p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all hover:scale-105 card-elevated"
                onClick={() => handleOtherTransactionSelect('open')}
                role="button"
              >
                <h2 className="text-2xl font-bold mb-2">Open an Account</h2>
                <p className="text-muted-foreground text-center">New account registration</p>
              </Card>

              <Card
                className="p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all hover:scale-105 card-elevated"
                onClick={() => handleOtherTransactionSelect('teller')}
                role="button"
              >
                <h2 className="text-2xl font-bold mb-2">Talk to a Teller</h2>
                <p className="text-muted-foreground text-center">General inquiries & assistance</p>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavigationBar 
        onNavigate={handleNavigate} 
        currentView={currentView === 'display' ? 'display' : currentView === 'admin' ? 'admin' : 'ticket'}
      />
      
      {currentView === 'display' && <TVDisplayMode />}
      
      {currentView === 'admin' && <AdminDashboard />}
      
      {currentView === 'landing' && (
        <LandingPage onServiceSelect={handleServiceSelect} />
      )}
      
      {currentView === 'cash' && (
        <CashCheckFlow 
          onBack={handleBackToLanding}
          onComplete={handleTransactionComplete}
          isPriority={false}
        />
      )}
      
      {currentView === 'priority' && (
        <CashCheckFlow 
          onBack={handleBackToLanding}
          onComplete={handleTransactionComplete}
          isPriority={true}
        />
      )}
      
      {currentView === 'ticket' && currentTicket && (
        <QueueTicketDisplay 
          ticket={currentTicket}
          onHome={handleBackToLanding}
        />
      )}
    </>
  );
};

export default Index;
