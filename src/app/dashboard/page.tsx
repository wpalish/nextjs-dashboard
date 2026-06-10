import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { Users, LayoutDashboard, TrendingUp, Activity } from 'lucide-react';

async function getDashboardStats(userId: string) {
  const [widgetCount] = await Promise.all([
    db.widget.count({ where: { userId } }),
  ]);
  return { widgetCount };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/auth/signin');

  const stats = await getDashboardStats(session.user.id);

  const cards = [
    { label: 'Widgets', value: stats.widgetCount, icon: LayoutDashboard, color: 'text-blue-500' },
    { label: 'Active Sessions', value: 1, icon: Activity, color: 'text-green-500' },
    { label: 'This Month', value: '+12%', icon: TrendingUp, color: 'text-purple-500' },
    { label: 'Team Members', value: 1, icon: Users, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Good {getGreeting()}, {session.user.name?.split(' ')[0] ?? 'there'} 👋
        </h1>
        <p className="mt-1 text-sm text-neutral-500">Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-500">{label}</span>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
}
