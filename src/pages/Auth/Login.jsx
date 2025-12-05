import { Link } from 'react-router';
import Container from '../../shared/Container';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  return (
    <section className="min-h-screen bg-base-100 py-8">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-base-200 p-8">

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary">Welcome Back!</h1>
              <p className="text-neutral mt-2">Log in to manage your clubs and events</p>
            </div>

            <form className="space-y-6">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>

              {/* Remember + Forgot */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded text-primary" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-primary hover:underline">Forgot password?</a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-[#0F766E] transition-all shadow-md"
              >
                Log In
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-base-300"></div>
              <span className="px-4 text-sm text-neutral">OR</span>
              <div className="flex-1 h-px bg-base-300"></div>
            </div>

            {/* Google */}
            <button className="w-full flex items-center justify-center gap-3 border border-base-300 hover:border-primary text-neutral font-medium py-3 rounded-lg transition-all">
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center mt-6 text-neutral">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Login;