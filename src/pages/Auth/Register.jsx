import { useState } from 'react';
import { Link } from 'react-router';
import Container from '../../shared/Container';
import { FcGoogle } from 'react-icons/fc';
import { FiCamera, FiX } from 'react-icons/fi';

const Register = () => {
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (e) => {
    e.stopPropagation();
    setPhotoPreview(null);
  };

  return (
    <section className="min-h-screen bg-base-100 py-8">
      <Container>
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-base-200 p-8">

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary">Join ClubSphere</h1>
              <p className="text-neutral mt-2">Create your account and discover local clubs</p>
            </div>

            <form className="space-y-6">

              {/* Photo Upload - Click Circle Only */}
              <div className="flex justify-center">
                <label htmlFor="photo" className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    id="photo"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />

                  <div className="relative group">
                    {photoPreview ? (
                      <>
                        <img
                          src={photoPreview}
                          alt="Profile"
                          className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-md"
                        />
                        <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <FiCamera className="text-white text-2xl" />
                        </div>
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600"
                        >
                          <FiX size={16} />
                        </button>
                      </>
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-base-200 border-4 border-dashed border-base-300 flex flex-col items-center justify-center gap-1 hover:border-primary transition-all">
                        <FiCamera className="text-3xl text-base-400" />
                        <span className="text-xs text-neutral">Click to upload</span>
                      </div>
                    )}
                  </div>
                </label>
              </div>

              <p className="text-center text-xs text-neutral -mt-2 mb-4">
                JPG, PNG • Max 5MB
              </p>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>

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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-[#0F766E] transition-all shadow-md"
              >
                Create Account
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

            {/* Login Link */}
            <p className="text-center mt-6 text-neutral">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Register;