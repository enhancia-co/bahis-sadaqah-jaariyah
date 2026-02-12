import { useState } from 'react';
import { CalendarIcon, Check, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { Layout } from '@/components/layout';
import { PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { mockContributors, mockCollections } from '@/data/mockData';
import { PaymentMode, Collection } from '@/types';
import { cn, formatCurrency, formatDate } from '@/lib/utils';

const paymentModes: { value: PaymentMode; label: string }[] = [
  { value: 'cash', label: 'Cash' },
  { value: 'upi', label: 'UPI' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'online', label: 'Online Payment' },
];

export default function CollectionPage() {
  const [selectedContributor, setSelectedContributor] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('cash');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const contributor = mockContributors.find(c => c.id === selectedContributor);
  const recentCollections = mockCollections.filter(c => c.contributorId === selectedContributor).slice(0, 3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowSuccess(true);
    setIsSubmitting(false);
    
    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedContributor('');
      setAmount('');
      setNotes('');
      setDate(new Date());
      setPaymentMode('cash');
    }, 2000);
  };

  return (
    <Layout>
      <div className="container safe-padding-x safe-padding-y space-y-6">
        <PageHeader
          title="New Collection"
          subtitle="Record a new contribution entry"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Collection Details
                </CardTitle>
                <CardDescription>
                  Enter the collection information for the contributor
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 mb-4">
                      <Check className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Collection Recorded!</h3>
                    <p className="text-muted-foreground mt-2">
                      {formatCurrency(Number(amount))} collected successfully
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contributor Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="contributor">Select Contributor *</Label>
                      <Select value={selectedContributor} onValueChange={setSelectedContributor} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a contributor" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockContributors.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              <span className="flex items-center gap-2">
                                <span className="font-medium">{c.name}</span>
                                <span className="text-muted-foreground text-sm">({c.boxId})</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Amount */}
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount (₹) *</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          min="1"
                          required
                          className="text-lg"
                        />
                      </div>

                      {/* Date */}
                      <div className="space-y-2">
                        <Label>Collection Date *</Label>
                        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(d) => {
                                if (d) {
                                  setDate(d);
                                  setIsDatePickerOpen(false);
                                }
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Payment Mode */}
                      <div className="space-y-2">
                        <Label htmlFor="paymentMode">Payment Mode *</Label>
                        <Select value={paymentMode} onValueChange={(v) => setPaymentMode(v as PaymentMode)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentModes.map((mode) => (
                              <SelectItem key={mode.value} value={mode.value}>
                                {mode.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Box ID (Auto-filled) */}
                      <div className="space-y-2">
                        <Label htmlFor="boxId">Box ID</Label>
                        <Input
                          id="boxId"
                          value={contributor?.boxId || ''}
                          disabled
                          placeholder="Select contributor first"
                          className="bg-muted"
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional notes about this collection..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full sm:w-auto btn-glow"
                      size="lg"
                      disabled={!selectedContributor || !amount || isSubmitting}
                    >
                      {isSubmitting ? 'Recording...' : 'Record Collection'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contributor Info Card */}
            {contributor && (
              <Card className="shadow-card animate-fade-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Contributor Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-semibold">
                      {contributor.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{contributor.name}</p>
                      <p className="text-sm text-muted-foreground">{contributor.mobile}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Contributed</p>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(contributor.totalContributed)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last Contribution</p>
                      <p className="text-sm font-medium">
                        {contributor.lastContribution ? formatDate(contributor.lastContribution) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Amount Buttons */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {[500, 1000, 2000, 2500, 5000, 10000].map((value) => (
                    <Button
                      key={value}
                      variant={amount === String(value) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAmount(String(value))}
                      className="text-sm"
                    >
                      ₹{value >= 1000 ? `${value / 1000}K` : value}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Collections */}
            {recentCollections.length > 0 && (
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Recent Collections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {recentCollections.map((collection) => (
                    <div
                      key={collection.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                    >
                      <div>
                        <p className="text-sm font-medium">{formatCurrency(collection.amount)}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(collection.date)}</p>
                      </div>
                      <span className="text-xs text-muted-foreground capitalize">
                        {collection.paymentMode.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
