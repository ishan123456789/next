export default function Login() {
  return (
    <div className="bg-gradient-to-tr from-fuchsia-300 to-sky-500">
      <section
        id="login"
        className="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto"
      >
        <div className="p-6 bg-sky-100 rounded">
          <form
            id="login_form"
            action="api_login"
            method="POST"
            className="flex flex-col justify-center"
          >
            <input
              className="mb-3 px-2 py-1.5 mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
              type="text"
              name="email"
              placeholder="john@exmple.com"
            />
            <input
              className="mb-3 px-2 py-1.5 mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
              type="password"
              name="password"
              placeholder="Password"
            />
            <button
              className="px-4 py-1.5 rounded-md shadow-lg bg-gradient-to-r from-pink-600 to-red-600 font-medium text-gray-100 block transition duration-300"
              type="submit"
            >
              <span id="login_default_state">Login</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
