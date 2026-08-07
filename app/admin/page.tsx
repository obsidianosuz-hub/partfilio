import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import pool from '@/lib/db';
import AdminNav from '@/app/components/AdminNav';

export const metadata = {
  title: 'Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  }
};

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');

  // Verify session (middleware also checks, but we double check here)
  if (!adminSession?.value) {
    redirect('/admin/login');
  }

  // Fetch metrics
  let visitors = [];
  let totalVisitors = 0;
  let totalVisits = 0;
  let visitors7Days = 0;
  let visitors24Hours = 0;

  try {
    const res = await pool.query(`
      SELECT 
        id, email, name, first_visit_at, last_visit_at, visit_count, ip_address 
      FROM visitors 
      ORDER BY last_visit_at DESC
    `);
    visitors = res.rows;

    totalVisitors = visitors.length;
    totalVisits = visitors.reduce((sum, v) => sum + v.visit_count, 0);

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    visitors.forEach((v) => {
      const lastVisit = new Date(v.last_visit_at);
      if (lastVisit >= sevenDaysAgo) visitors7Days++;
      if (lastVisit >= oneDayAgo) visitors24Hours++;
    });

  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-100">Monitoring Dashboard</h1>
          <a href="/api/admin/export" className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
            Download CSV
          </a>
        </header>

        <AdminNav />

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="glass-card p-6">
            <h3 className="text-sm font-medium text-slate-400 mb-1">Total Unique Visitors</h3>
            <p className="text-3xl font-bold text-cyan-400">{totalVisitors}</p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-sm font-medium text-slate-400 mb-1">Total Visits</h3>
            <p className="text-3xl font-bold text-purple-400">{totalVisits}</p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-sm font-medium text-slate-400 mb-1">Last 7 Days</h3>
            <p className="text-3xl font-bold text-slate-100">{visitors7Days}</p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-sm font-medium text-slate-400 mb-1">Last 24 Hours</h3>
            <p className="text-3xl font-bold text-slate-100">{visitors24Hours}</p>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden p-0 border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 border-b border-slate-800 text-slate-300">
                <tr>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">First Visit</th>
                  <th className="px-6 py-4 font-semibold">Last Visit</th>
                  <th className="px-6 py-4 font-semibold text-right">Visits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {visitors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No visitors recorded yet.
                    </td>
                  </tr>
                ) : (
                  visitors.map((visitor) => (
                    <tr key={visitor.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 text-slate-200">{visitor.email}</td>
                      <td className="px-6 py-4 text-slate-400">{visitor.name || '-'}</td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {new Date(visitor.first_visit_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {new Date(visitor.last_visit_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-cyan-400">
                        {visitor.visit_count}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
