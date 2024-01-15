import { Link as RouteLink, useNavigate } from "react-router-dom";

import { setUserInfo } from "../slices/userInfoSlice";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../slices/authSlice";

const SignUp = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const res = await register({
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
      }).unwrap();

      dispatch(setUserInfo({ ...res }));
      navigate("/chat");
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <div className="dark:bg-slate-900 bg-gray-100 flex h-screen items-center py-16">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-medium text-gray-800 dark:text-white">
                Sign up
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Already have an account?
                <RouteLink
                  to="/signin"
                  className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ml-1"
                >
                  Sign in here
                </RouteLink>
              </p>
            </div>
            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-2">
                  <div>
                    <label htmlFor="name" className="hidden">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="name"
                        id="name"
                        name="name"
                        placeholder="Name"
                        className="py-3 px-4 block w-full border-gray-200 border rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="hidden">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        className="py-3 px-4 block w-full border-gray-200 border rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="hidden">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="py-3 px-4 block w-full border-gray-200 border rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
