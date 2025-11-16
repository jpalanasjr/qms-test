import { Monitor, TicketIcon, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationBarProps {
  onNavigate: (view: 'display' | 'ticket' | 'admin') => void;
  currentView: 'display' | 'ticket' | 'admin';
}

export const NavigationBar = ({ onNavigate, currentView }: NavigationBarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={currentView === 'display' ? 'default' : 'outline'}
            size="lg"
            onClick={() => onNavigate('display')}
            className="gap-2"
          >
            <Monitor className="w-5 h-5" />
            <span className="hidden sm:inline">Display (TV Mode)</span>
            <span className="sm:hidden">Display</span>
          </Button>
          
          <Button
            variant={currentView === 'ticket' ? 'default' : 'outline'}
            size="lg"
            onClick={() => onNavigate('ticket')}
            className="gap-2"
          >
            <TicketIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Get Ticket</span>
            <span className="sm:hidden">Ticket</span>
          </Button>
          
          <Button
            variant={currentView === 'admin' ? 'default' : 'outline'}
            size="lg"
            onClick={() => onNavigate('admin')}
            className="gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="hidden sm:inline">Admin</span>
          </Button>
        </div>
        
        <div className="text-sm font-semibold text-primary">
          Philippine Banking Queue System
        </div>
      </div>
    </nav>
  );
};
