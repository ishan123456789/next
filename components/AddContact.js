import { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { validateEmail } from "../utils/validations";

export const AddContactForm = () => {
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
    if (result.error) {
      setError(result.error);
    }
  }

  return (
    <div className="p-2">
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <section id="login" className="flex mx-auto">
          {error && (
            <div
              className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
              role="alert"
            >
              <strong className="font-bold">{error}</strong>
            </div>
          )}
          <div className="w-full rounded bg-sky-100">
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Contact Number
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="contactNumber"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Add Account
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
