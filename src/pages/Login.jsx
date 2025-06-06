import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') // reset error

    // For demo purposes - admin login with password 123
    if (form.username === 'admin' && form.password === '123') {
      localStorage.setItem('access_token', 'demo_token')
      localStorage.setItem('refresh_token', 'demo_refresh')
      localStorage.setItem('user_role', 'patient') // Set as patient for dashboard
      console.log('Admin login successful ✅')
      navigate('/dashboard/patient') // Redirect to patient dashboard
      return
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (response.ok) {
        // Save JWT tokens
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)
        localStorage.setItem('user_role', data.role) // Store user role
        console.log('Login successful ✅')

        // Navigate based on user role
        if (data.role === 'doctor') {
          navigate('/doctors-dashboard')
        } else if (data.role === 'patient') {
          navigate('/dashboard/patient')
        } else {
          setError('Invalid user role')
        }
      } else {
        setError(data.detail || 'Login failed. Check your credentials.')
      }
    } catch (err) {
      setError('Something went wrong. Try again later.')
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#E1F5FE] via-white to-[#F3E5F5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="https://img.freepik.com/free-photo/happy-black-male-doctor-pointing-empty-space-presenting-product_1262-12349.jpg?t=st=1749311091~exp=1749314691~hmac=077b444b397db6e69a8f76e1a91a6cf7f76d6a27d80ad645568310adff2edbe7&w=1380"
          alt="Doctor Presenting"
          className="absolute top-0 right-0 w-full h-full object-cover opacity-30 transform rotate-6 scale-110"
        />
        <div className="absolute -bottom-48 -left-48 w-196 h-196 bg-gradient-to-br from-[#0288D1]/30 to-[#9C27B0]/30 rounded-full blur-3xl"></div>
        <div className="absolute -top-48 -right-48 w-126 h-126 bg-gradient-to-br from-[#03A9F4]/30 to-[#03A9F4]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
        {/* Left Side - Login Form */}
        <div className="w-full max-w-md space-y-8 relative">
          <div className="relative group cursor-pointer mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#03A9F4] to-[#03A9F4] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/80 backdrop-blur-xl ring-1 ring-gray-200/50 rounded-lg p-8">
              <div className="flex justify-center">
                <img src="/src/assets/tibanow logo.png" alt="TibaNow Logo" className="h-16 w-16 transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight bg-gradient-to-r from-[#03A9F4] to-[#03A9F4] bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-[#03A9F4] hover:text-[#0288D1] transition-colors duration-300">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>

          {error && (
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-lg blur"></div>
              <div className="relative bg-red-50 text-red-700 p-4 rounded-lg border border-red-100">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#03A9F4]/30 to-[#9C27B0]/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={form.username}
                    onChange={handleChange}
                    className="relative block w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#03A9F4] focus:outline-none focus:ring-[#03A9F4] sm:text-sm bg-white/50 backdrop-blur-sm transition-all duration-300 focus:bg-white"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9C27B0]/30 to-[#E91E63]/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="relative block w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#9C27B0] focus:outline-none focus:ring-[#9C27B0] sm:text-sm bg-white/50 backdrop-blur-sm transition-all duration-300 focus:bg-white"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#03A9F4] focus:ring-[#03A9F4] transition duration-300"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-[#03A9F4] hover:text-[#0288D1] transition-colors duration-300">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-lg border border-transparent py-3 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#03A9F4] focus:ring-offset-2 bg-gradient-to-r from-[#03A9F4] to-[#9C27B0] hover:from-[#0288D1] hover:to-[#7B1FA2] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-white/70 group-hover:text-white/90 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="group relative flex justify-center py-2 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4285F4]/30 to-[#34A853]/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <span className="relative flex items-center justify-center">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </span>
              </button>

              <button className="group relative flex justify-center py-2 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1DA1F2]/30 to-[#1DA1F2]/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <span className="relative flex items-center justify-center text-[#1DA1F2]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </span>
              </button>

              <button className="group relative flex justify-center py-2 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#24292E]/30 to-[#24292E]/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <span className="relative flex items-center justify-center">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="w-full max-w-xl hidden lg:block">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/80 backdrop-blur-xl ring-1 ring-gray-200/50 rounded-2xl p-8 space-y-8">
              <h3 className="text-2xl font-bold text-gray-900">Why Choose TibaNow?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Secure & Private</h4>
                    <p className="mt-2 text-gray-600">Your health information is protected with state-of-the-art encryption and security measures.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">24/7 Access</h4>
                    <p className="mt-2 text-gray-600">Connect with healthcare professionals anytime, anywhere through our platform.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Expert Care</h4>
                    <p className="mt-2 text-gray-600">Access a network of qualified healthcare professionals dedicated to your wellbeing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
