import { RegisterForm } from '@/widgets/auth/ui/registerForm'

function RegisterPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-orange-950/30 to-gray-900">
        <div className="flex flex-col min-h-screen">
          <div className="flex-1 container mx-auto px-4 py-8">
            <RegisterForm />
          </div>
        </div>
    </div>
  );
}

export default RegisterPage;