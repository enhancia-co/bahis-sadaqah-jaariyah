import { Link } from 'react-router-dom';
import { Users, PlusCircle, TrendingUp, Clock, ArrowRight, Wallet, Target } from 'lucide-react';
import { Layout } from '@/components/layout';
import { StatCard, PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDashboardStats, mockCollections, mockContributors } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function Dashboard() {
  const stats = mockDashboardStats;
  const recentCollections = mockCollections.slice(0, 5);
  const topContributors = [...mockContributors]
    .sort((a, b) => b.totalContributed - a.totalContributed)
    .slice(0, 5);

  return (
    <Layout>
      <div className="container safe-padding-x safe-padding-y space-y-6 sm:space-y-8">
        {/* Welcome Section */}
        <div className="gradient-primary rounded-2xl p-6 sm:p-8 text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 text-8xl opacity-10 pointer-events-none select-none">
            ☪
          </div>
          <div className="relative z-10">
            <p className="text-sm sm:text-base opacity-80 font-bold">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <h1 className="text-responsive-2xl font-bold mt-2">Welcome to Bahis - Sadaqah Jaariyah</h1>
            <p className="text-responsive-base opacity-80 mt-1">
              Sadaqah Jaariyah Fund Management System
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link to="/collection">
                <Button variant="secondary" className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  New Collection
                </Button>
              </Link>
              <Link to="/contributors">
                <Button variant="ghost" className="gap-2 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
                  <Users className="h-4 w-4" />
                  View Contributors
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title="Total Collected"
            value={formatCurrency(stats.totalCollected)}
            subtitle="All time"
            icon={Wallet}
            variant="primary"
          />
          <StatCard
            title="This Month"
            value={formatCurrency(stats.thisMonthCollection)}
            // trend={{ value: Math.abs(stats.growthPercentage), isPositive: stats.growthPercentage >= 0 }}
            // subtitle="vs last month"
            icon={TrendingUp}
            variant="accent"
          />
          <StatCard
            title="Contributors"
            value={stats.activeContributors}
            subtitle={`${stats.totalContributors} total`}
            icon={Users}
          />
          <StatCard
            title="Pending"
            value={formatCurrency(stats.pendingAmount)}
            subtitle="To be collected"
            icon={Clock}
            variant="warning"
          />
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Collections */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-responsive-lg font-semibold">Recent Collections</CardTitle>
              <Link to="/reports">
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {recentCollections.map((collection) => (
                  <div
                    key={collection.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium flex-shrink-0">
                        {collection.contributorName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {collection.contributorName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(collection.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-foreground">
                        {formatCurrency(collection.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {collection.paymentMode.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-responsive-lg font-semibold">Top Contributors</CardTitle>
              <Link to="/contributors">
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div
                    key={contributor.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-accent-foreground text-sm font-bold flex-shrink-0">
                        #{index + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {contributor.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{contributor.boxId}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-primary">
                        {formatCurrency(contributor.totalContributed)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="gradient-card border-primary/20">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Monthly Target Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(stats.thisMonthCollection)} of {formatCurrency(15000)} collected this month
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex-1 sm:w-48 h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((stats.thisMonthCollection / 15000) * 100, 100)}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-primary">
                {Math.round((stats.thisMonthCollection / 15000) * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
