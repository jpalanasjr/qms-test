import { QueueTicket } from '@/lib/queueManager';
import { PhilippineClock } from './PhilippineClock';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Printer, Home } from 'lucide-react';

interface QueueTicketDisplayProps {
  ticket: QueueTicket;
  onHome: () => void;
}

export const QueueTicketDisplay = ({ ticket, onHome }: QueueTicketDisplayProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-background to-success/10">
      <div className="container mx-auto max-w-2xl">
        <Card className="p-8 md:p-12 text-center card-elevated print:shadow-none">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">Philippine Banking</h1>
            <p className="text-muted-foreground">Queue Management System</p>
          </div>

          {/* Queue Number - Large */}
          <div className="mb-8 p-8 bg-primary text-primary-foreground rounded-lg">
            <p className="text-sm font-medium mb-2 opacity-90">Your Queue Number</p>
            <p className="text-7xl md:text-8xl font-bold tracking-wider">{ticket.queueNumber}</p>
          </div>

          {/* Details */}
          <div className="space-y-4 mb-8 text-left bg-muted/50 p-6 rounded-lg">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Service Type:</span>
              <span className="font-semibold">{ticket.serviceType}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Estimated Wait:</span>
              <span className="font-semibold text-accent">~{ticket.estimatedWait} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time Issued:</span>
              <span className="font-semibold">
                <PhilippineClock className="inline-block text-sm" />
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="text-sm font-medium text-accent-foreground">
              Please proceed to the counter when your number is called. Thank you for your patience!
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-center print:hidden">
            <Button size="lg" onClick={handlePrint} className="gap-2">
              <Printer className="w-5 h-5" />
              Print Ticket
            </Button>
            <Button size="lg" variant="outline" onClick={onHome} className="gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground">
            <p>For concerns, please approach our customer service desk.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
