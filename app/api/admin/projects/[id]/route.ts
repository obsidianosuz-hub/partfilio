import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const cookieStore = await cookies();
  if (!cookieStore.get('admin_session')?.value) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, role, context, start_date, duration, status, team_size, responsibilities, problem_statement, solution_overview, metrics, key_achievements, architecture_decisions, business_impact, tech_stack, live_url, repo_url, display_order, is_published } = body;

    const res = await pool.query(`
      UPDATE projects SET
      title = $1, role = $2, context = $3, start_date = $4, duration = $5, status = $6, team_size = $7, 
        responsibilities = $8, problem_statement = $9, solution_overview = $10, metrics = $11, 
        key_achievements = $12, architecture_decisions = $13, business_impact = $14, tech_stack = $15, 
        live_url = $16, repo_url = $17, display_order = $18, is_published = $19, updated_at = CURRENT_TIMESTAMP
      WHERE id = $20
      RETURNING *
    `, [
      JSON.stringify(title || {}), JSON.stringify(role || {}), JSON.stringify(context || {}), start_date, duration, status, team_size, 
      JSON.stringify(responsibilities || {}), JSON.stringify(problem_statement || {}), JSON.stringify(solution_overview || {}), 
      JSON.stringify(metrics || {}), JSON.stringify(key_achievements || {}), 
      JSON.stringify(architecture_decisions || {}), JSON.stringify(business_impact || {}), 
      JSON.stringify(tech_stack || []), live_url, repo_url, display_order || 0, is_published !== undefined ? is_published : true, params.id
    ]);

    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error('Failed to update project', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const cookieStore = await cookies();
  if (!cookieStore.get('admin_session')?.value) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    await pool.query('DELETE FROM projects WHERE id = $1', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete project', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  // Expected to receive { display_order: number }
  const cookieStore = await cookies();
  if (!cookieStore.get('admin_session')?.value) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { display_order } = await req.json();
    const res = await pool.query('UPDATE projects SET display_order = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *', [display_order, params.id]);
    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error('Failed to reorder project', error);
    return NextResponse.json({ error: 'Failed to reorder project' }, { status: 500 });
  }
}
