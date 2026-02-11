import { Layout } from '@/components/layout';
import { PageHeader, StatCard } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { TrendingUp, Users, Wallet, PieChartIcon, BarChart3 } from 'lucide-react';
import {
  mockDashboardStats,
  mockMonthlyReports,
  monthlyCollectionData,
  paymentModeData,
  contributorStatusData,
} from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

const COLORS = ['hsl(270, 77%, 40%)', 'hsl(280, 70%, 50%)', 'hsl(42, 90%, 55%)', 'hsl(290, 65%, 55%)', 'hsl(270, 80%, 65%)'];

export default function Reports() {
  const stats = mockDashboardStats;

  return (
    <Layout>
      <div className="container safe-padding-x safe-padding-y space-y-6">
        <PageHeader
          title="Reports & Analytics"
          subtitle="Track collection performance and contributor statistics"
        />

        {/* Stats Overview */}
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
            trend={{ value: Math.abs(stats.growthPercentage), isPositive: stats.growthPercentage >= 0 }}
            icon={TrendingUp}
          />
          <StatCard
            title="Active Contributors"
            value={stats.activeContributors}
            subtitle={`of ${stats.totalContributors} total`}
            icon={Users}
          />
          <StatCard
            title="Pending Amount"
            value={formatCurrency(stats.pendingAmount)}
            subtitle="To be collected"
            icon={Wallet}
            variant="warning"
          />
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="monthly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
            <TabsTrigger value="monthly" className="gap-2">
              <BarChart3 className="h-4 w-4 hidden sm:inline" />
              Monthly
            </TabsTrigger>
            <TabsTrigger value="payment" className="gap-2">
              <PieChartIcon className="h-4 w-4 hidden sm:inline" />
              Payment Modes
            </TabsTrigger>
            <TabsTrigger value="contributors" className="gap-2">
              <Users className="h-4 w-4 hidden sm:inline" />
              Contributors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-responsive-lg">Monthly Collection Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyCollectionData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                      />
                      <YAxis 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                        tickFormatter={(value) => `₹${value / 1000}K`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number) => [formatCurrency(value), '']}
                      />
                      <Legend />
                      <Bar 
                        dataKey="collected" 
                        name="Collected" 
                        fill="hsl(270, 77%, 40%)" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="pending" 
                        name="Pending" 
                        fill="hsl(38, 92%, 50%)" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Breakdown Table */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-responsive-lg">Monthly Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="w-full min-w-[500px]">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Month</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Collected</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Pending</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Contributors</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Entries</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockMonthlyReports.map((report) => (
                        <tr key={`${report.month}-${report.year}`} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2 text-sm font-medium">{report.month} {report.year}</td>
                          <td className="py-3 px-2 text-sm text-right text-success font-medium">
                            {formatCurrency(report.totalCollected)}
                          </td>
                          <td className="py-3 px-2 text-sm text-right text-warning font-medium">
                            {formatCurrency(report.totalPending)}
                          </td>
                          <td className="py-3 px-2 text-sm text-right">{report.contributorCount}</td>
                          <td className="py-3 px-2 text-sm text-right">{report.collectionCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-responsive-lg">Payment Mode Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentModeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      >
                        {paymentModeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributors">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-responsive-lg">Contributor Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={contributorStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                        labelLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      >
                        <Cell fill="hsl(142, 70%, 45%)" />
                        <Cell fill="hsl(38, 92%, 50%)" />
                        <Cell fill="hsl(0, 84%, 60%)" />
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
