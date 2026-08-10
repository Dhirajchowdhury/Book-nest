import Navbar from '@/components/landing/Navbar';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Log In - BookNest',
  description: 'Log in to your BookNest account to access your personal reading tracker.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <LoginForm />
      </main>
    </div>
  );
}
