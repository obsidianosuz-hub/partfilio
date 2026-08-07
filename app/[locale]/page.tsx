import { cookies } from 'next/headers';
import pool from '@/lib/db';
import PortfolioContent from '@/app/components/PortfolioContent';

export default async function Home(context: { params: Promise<{ locale: string }> }) {
  const { locale } = await context.params;

  let projects = [];
  try {
    const res = await pool.query('SELECT * FROM projects WHERE is_published = true ORDER BY display_order ASC, created_at DESC');
    projects = res.rows;
  } catch (err) {
    console.error('Failed to fetch public projects', err);
  }

  return (
    <PortfolioContent projects={projects} />
  );
}
