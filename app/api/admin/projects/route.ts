import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  if (!cookieStore.get('admin_session')?.value) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const res = await pool.query('SELECT * FROM projects ORDER BY display_order ASC, created_at DESC');
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error('Failed to fetch projects', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get('admin_session')?.value) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, role, context, start_date, duration, status, team_size, responsibilities, problem_statement, solution_overview, metrics, key_achievements, architecture_decisions, business_impact, tech_stack, live_url, repo_url, display_order, is_published } = body;

    const res = await pool.query(`
      INSERT INTO projects (title, role, context, start_date, duration, status, team_size, responsibilities, problem_statement, solution_overview, metrics, key_achievements, architecture_decisions, business_impact, tech_stack, live_url, repo_url, display_order, is_published)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      RETURNING *
    `, [
      JSON.stringify(title || {}), JSON.stringify(role || {}), JSON.stringify(context || {}), start_date, duration, status, team_size, 
      JSON.stringify(responsibilities || {}), JSON.stringify(problem_statement || {}), JSON.stringify(solution_overview || {}), 
      JSON.stringify(metrics || {}), JSON.stringify(key_achievements || {}), 
      JSON.stringify(architecture_decisions || {}), JSON.stringify(business_impact || {}), 
      JSON.stringify(tech_stack || []), live_url, repo_url, display_order || 0, is_published !== undefined ? is_published : true
    ]);

    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error('Failed to create project', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
