import Navbar from '@/components/landing/Navbar';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: "BookNest",
  description: "BookNest is a place where u will be allowed to manage your books and update/record their statuses.",
};

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <LoginForm />
      </main>
    </div>
  );
}
export default LoginPage;