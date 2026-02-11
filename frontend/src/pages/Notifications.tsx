import { MessageSquare, Mail, Phone, Send, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Layout } from '@/components/layout';
import { PageHeader, StatusBadge, EmptyState } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockNotifications } from '@/data/mockData';
import { formatDate } from '@/lib/utils';

const typeIcons = {
  whatsapp: MessageSquare,
  sms: Phone,
  email: Mail,
};

const typeColors = {
  whatsapp: 'bg-success/10 text-success',
  sms: 'bg-primary/10 text-primary',
  email: 'bg-accent/10 text-accent-foreground',
};

export default function Notifications() {
  const notifications = mockNotifications;

  return (
    <Layout>
      <div className="container safe-padding-x safe-padding-y space-y-6">
        <PageHeader
          title="Notifications"
          subtitle="View sent and pending notification logs"
        >
          <Button className="gap-2 btn-glow">
            <Send className="h-4 w-4" />
            Send Notification
          </Button>
        </PageHeader>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {notifications.filter(n => n.status === 'sent').length}
                </p>
                <p className="text-xs text-muted-foreground">Sent</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {notifications.filter(n => n.status === 'pending').length}
                </p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {notifications.filter(n => n.status === 'failed').length}
                </p>
                <p className="text-xs text-muted-foreground">Failed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-responsive-lg">Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.length === 0 ? (
              <EmptyState
                icon={<MessageSquare className="h-8 w-8 text-muted-foreground" />}
                title="No notifications yet"
                description="Notification logs will appear here once you send messages"
              />
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => {
                  const Icon = typeIcons[notification.type];
                  return (
                    <div
                      key={notification.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 ${typeColors[notification.type]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">{notification.recipientName}</h4>
                            <StatusBadge status={notification.status} />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(notification.sentAt || notification.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-medium capitalize px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                            {notification.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
