import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminNav from '@/app/components/AdminNav';
import ProjectForm from '../ProjectForm';

export const metadata = { title: 'New Project - Admin' };

export default async function NewProjectPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');

  if (!adminSession?.value) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-100 mb-6">CMS Dashboard</h1>
          <AdminNav />
        </header>

        <ProjectForm />
      </div>
    </div>
  );
}
