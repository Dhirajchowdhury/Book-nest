import Navbar from '@/components/landing/Navbar';
import SignupForm from '@/components/auth/SignupForm';

export const metadata = {
  title: 'Sign Up - BookNest',
  description: 'Create your BookNest account to start tracking your personal reading journey.',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <SignupForm />
      </main>
    </div>
  );
}
