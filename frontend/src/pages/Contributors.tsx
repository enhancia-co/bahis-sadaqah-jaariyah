import { useState } from 'react';
import { Plus, Edit2, Trash2, Phone, Mail, Box, Filter } from 'lucide-react';
import { Layout } from '@/components/layout';
import { PageHeader, SearchInput, StatusBadge, EmptyState } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockContributors } from '@/data/mockData';
import { Contributor } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>(mockContributors);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingContributor, setEditingContributor] = useState<Contributor | null>(null);

  // Filter contributors
  const filteredContributors = contributors.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.mobile.includes(searchQuery) ||
      c.boxId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    setContributors(contributors.filter((c) => c.id !== id));
  };

  return (
    <Layout>
      <div className="container safe-padding-x safe-padding-y space-y-6">
        <PageHeader
          title="Contributors"
          subtitle={`Manage ${contributors.length} registered contributors`}
        >
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 btn-glow">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Contributor</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Contributor</DialogTitle>
                <DialogDescription>
                  Register a new contributor to the fund collection system.
                </DialogDescription>
              </DialogHeader>
              <ContributorForm onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </PageHeader>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, mobile, or box ID..."
            className="flex-1"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contributors List */}
        {filteredContributors.length === 0 ? (
          <EmptyState
            icon={<Box className="h-8 w-8 text-muted-foreground" />}
            title="No contributors found"
            description={searchQuery ? "Try adjusting your search or filters" : "Start by adding your first contributor"}
            action={
              <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Contributor
              </Button>
            }
          />
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {filteredContributors.map((contributor) => (
              <ContributorCard
                key={contributor.id}
                contributor={contributor}
                onEdit={() => setEditingContributor(contributor)}
                onDelete={() => handleDelete(contributor.id)}
              />
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingContributor} onOpenChange={() => setEditingContributor(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Contributor</DialogTitle>
              <DialogDescription>
                Update contributor information.
              </DialogDescription>
            </DialogHeader>
            <ContributorForm 
              contributor={editingContributor || undefined} 
              onClose={() => setEditingContributor(null)} 
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}

interface ContributorCardProps {
  contributor: Contributor;
  onEdit: () => void;
  onDelete: () => void;
}

function ContributorCard({ contributor, onEdit, onDelete }: ContributorCardProps) {
  return (
    <Card className="shadow-card card-hover overflow-hidden">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Avatar and Info */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-semibold flex-shrink-0">
              {contributor.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground truncate">
                  {contributor.name}
                </h3>
                <StatusBadge status={contributor.status} />
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {contributor.mobile}
                </span>
                <span className="flex items-center gap-1">
                  <Box className="h-3.5 w-3.5" />
                  {contributor.boxId}
                </span>
                {contributor.email && (
                  <span className="flex items-center gap-1 hidden lg:flex">
                    <Mail className="h-3.5 w-3.5" />
                    {contributor.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stats and Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-4 pl-14 sm:pl-0">
            <div className="text-left sm:text-right">
              <p className="text-lg font-bold text-primary">
                {formatCurrency(contributor.totalContributed)}
              </p>
              <p className="text-xs text-muted-foreground">
                Last: {contributor.lastContribution ? formatDate(contributor.lastContribution) : 'Never'}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={onEdit}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ContributorFormProps {
  contributor?: Contributor;
  onClose: () => void;
}

function ContributorForm({ contributor, onClose }: ContributorFormProps) {
  const isEditing = !!contributor;

  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" defaultValue={contributor?.name} placeholder="Enter full name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number *</Label>
          <Input id="mobile" defaultValue={contributor?.mobile} placeholder="+91 98765 43210" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="boxId">Box ID *</Label>
          <Input id="boxId" defaultValue={contributor?.boxId} placeholder="BOX-001" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue={contributor?.email} placeholder="email@example.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" defaultValue={contributor?.address} placeholder="Full address" />
      </div>
      <DialogFooter className="gap-2 sm:gap-0">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? 'Update' : 'Add'} Contributor
        </Button>
      </DialogFooter>
    </form>
  );
}
