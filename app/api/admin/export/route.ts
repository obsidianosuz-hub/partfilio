import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');

  // Verify auth
  if (!adminSession?.value) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const res = await pool.query(`
      SELECT 
        id, email, name, first_visit_at, last_visit_at, visit_count, ip_address 
      FROM visitors 
      ORDER BY last_visit_at DESC
    `);
    
    const visitors = res.rows;
    
    // Build CSV
    const header = ['ID', 'Email', 'Name', 'First Visit', 'Last Visit', 'Visits', 'IP Address'];
    const rows = visitors.map(v => [
      v.id,
      v.email,
      v.name || '',
      v.first_visit_at.toISOString(),
      v.last_visit_at.toISOString(),
      v.visit_count,
      v.ip_address || ''
    ]);
    
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="visitors_export.csv"',
      },
    });

  } catch (error) {
    console.error('Export error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
