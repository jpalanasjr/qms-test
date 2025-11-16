import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loadCounters, resetCounters, getQueueLog, exportQueueLog } from '@/lib/queueManager';
import { Download, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast.success('Admin access granted');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all queue counters? This cannot be undone.')) {
      resetCounters();
      toast.success('Queue counters reset successfully');
      window.location.reload();
    }
  };

  const handleExport = () => {
    const csv = exportQueueLog();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bpi-queue-log-${Date.now()}.csv`;
    a.click();
    toast.success('Queue log exported');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <Card className="p-8 max-w-md w-full card-elevated">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full">
              Login
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Default password: admin123
            </p>
          </form>
        </Card>
      </div>
    );
  }

  const counters = loadCounters();
  const queueLog = getQueueLog();

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Current Counters */}
        <Card className="p-6 mb-6 card-elevated">
          <h2 className="text-xl font-bold mb-4">Current Queue Counters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Cash/Check</p>
              <p className="text-4xl font-bold text-primary">C{String(counters.C).padStart(3, '0')}</p>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Priority</p>
              <p className="text-4xl font-bold text-accent">P{String(counters.P).padStart(3, '0')}</p>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">QR</p>
              <p className="text-4xl font-bold text-success">Q{String(counters.Q).padStart(3, '0')}</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Other</p>
              <p className="text-4xl font-bold text-foreground">O{String(counters.O).padStart(3, '0')}</p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <Card className="p-6 mb-6 card-elevated">
          <h2 className="text-xl font-bold mb-4">Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleExport} className="gap-2">
              <Download className="w-4 h-4" />
              Export Queue Log (CSV)
            </Button>
            <Button onClick={handleReset} variant="destructive" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Reset All Counters
            </Button>
          </div>
        </Card>

        {/* Recent Queue Log */}
        <Card className="p-6 card-elevated">
          <h2 className="text-xl font-bold mb-4">Recent Queue Tickets ({queueLog.length} total)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left">Queue #</th>
                  <th className="px-4 py-2 text-left">Service Type</th>
                  <th className="px-4 py-2 text-left">Time</th>
                  <th className="px-4 py-2 text-left">Est. Wait</th>
                </tr>
              </thead>
              <tbody>
                {queueLog.slice(-20).reverse().map((ticket, idx) => (
                  <tr key={idx} className="border-b border-border">
                    <td className="px-4 py-3 font-bold">{ticket.queueNumber}</td>
                    <td className="px-4 py-3">{ticket.serviceType}</td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(ticket.timestamp).toLocaleString('en-PH', { 
                        timeZone: 'Asia/Manila',
                        hour12: true 
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm">{ticket.estimatedWait} mins</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {queueLog.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No queue tickets yet</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
