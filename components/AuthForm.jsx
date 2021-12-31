import { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { validateEmail } from "../utils/validations";

function AuthForm() {
  const [error, setError] = useState("");
  const [isOTP, setIsOTP] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (
      !enteredEmail ||
      !enteredPassword ||
      // TODO: Validate on backend as well
      !validateEmail(enteredEmail) ||
      // TODO: Make password validation more strict
      enteredPassword.length < 4
    ) {
      setError("Valid email and password are required");
    }
    let passwordObj = isOTP
      ? { OTP: enteredPassword }
      : { password: enteredPassword };
    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      ...passwordObj,
    });
    console.log("result", result);
    if (result.error) {
      setError(result.error);
    }
    // if (!result.error) {
    //   // set some auth state
    //   router.replace("/profile");
    // }
  }

  return (
    <div className="bg-gradient-to-tr from-fuchsia-300 to-sky-500">
      <section
        id="login"
        className="flex flex-col justify-center max-w-md min-h-screen p-4 mx-auto"
      >
        {error && (
          <div
            className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
            role="alert"
          >
            <strong className="font-bold">{error}</strong>
          </div>
        )}
        <div className="p-6 rounded bg-sky-100">
          <form
            id="login_form"
            onSubmit={submitHandler}
            className="flex flex-col justify-center"
          >
            <input
              className="mb-3 px-2 py-1.5 mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
              type="text"
              name="email"
              placeholder="john@exmple.com"
              ref={emailInputRef}
            />
            <input
              className="mb-3 px-2 py-1.5 mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
              type={"password"}
              name="password"
              placeholder="Password"
              ref={passwordInputRef}
            />
            <button
              className="px-4 py-1.5 rounded-md shadow-lg bg-gradient-to-r from-pink-600 to-red-600 font-medium text-gray-100 block transition duration-300"
              type="submit"
            >
              <span id="login_default_state">
                {isOTP ? "Verify OTP" : "Login/Sign up"}
              </span>
            </button>
          </form>
          <div className="flex items-center justify-between mt-3">
            <hr className="w-full" />
            <span className="p-2 mb-1 text-gray-400">OR</span>
            <hr className="w-full" />
          </div>
          <span
            onClick={() => setIsOTP((current) => !current)}
            className="w-full h-12 mt-3 text-blue-600 underline cursor-pointer hover:text-blue-800 visited:text-purple-600"
          >
            {isOTP ? "Login/Sign Up" : "Verify via OTP"}
          </span>
        </div>
      </section>
    </div>
  );
}

export default AuthForm;
