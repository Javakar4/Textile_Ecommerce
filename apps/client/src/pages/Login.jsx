import React, { useState } from "react";

export default function Login() {
    const [isSignup, setIsSignup] = useState(false);

    return (
        <div className="flex h-[700px] w-full mt-7">
            <div className="w-full hidden md:inline-block">
                <img
                    className="h-full"
                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
                    alt="leftSideImage"
                />
            </div>

            <div className="w-full flex flex-col items-center justify-center">
                <form className="md:w-96 w-80 flex flex-col items-center justify-center">
                    {/* TITLE */}
                    <h2 className="text-4xl text-gray-900 font-medium">
                        {isSignup ? "Sign up" : "Sign in"}
                    </h2>

                    <p className="text-sm text-gray-500/90 mt-3">
                        {isSignup
                            ? "Create a new account to get started"
                            : "Welcome back! Please sign in to continue"}
                    </p>

                    {/* GOOGLE BUTTON (hidden in signup) */}
                    {!isSignup && (
                        <button
                            type="button"
                            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
                        >
                            <img
                                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                                alt="googleLogo"
                            />
                        </button>
                    )}

                    {!isSignup && (
                        <div className="flex items-center gap-4 w-full my-5">
                            <div className="w-full h-px bg-gray-300/90"></div>
                            <p className="w-full text-nowrap text-sm text-gray-500/90">
                                or sign in with email
                            </p>
                            <div className="w-full h-px bg-gray-300/90"></div>
                        </div>
                    )}

                    {/* USERNAME (signup only) */}
                    {isSignup && (
                        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-3 mb-5">
                            <input
                                type="text"
                                placeholder="User name"
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>
                    )}

                    {/* EMAIL */}
                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            type="email"
                            placeholder="Email id"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            type="password"
                            placeholder="Password"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            required
                        />
                    </div>

                    {/* CONFIRM PASSWORD (signup only) */}
                    {isSignup && (
                        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <input
                                type="password"
                                placeholder="Confirm password"
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>
                    )}

                    {/* REMEMBER + FORGOT (login only) */}
                    {!isSignup && (
                        <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                            <div className="flex items-center gap-2">
                                <input className="h-5" type="checkbox" id="checkbox" />
                                <label className="text-sm" htmlFor="checkbox">
                                    Remember me
                                </label>
                            </div>
                            <a className="text-sm underline" href="#">
                                Forgot password?
                            </a>
                        </div>
                    )}

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
                    >
                        {isSignup ? "Sign up" : "Login"}
                    </button>

                    {/* TOGGLE TEXT */}
                    <p className="text-gray-500/90 text-sm mt-4">
                        {isSignup ? (
                            <>
                                Click here to{" "}
                                <button
                                    type="button"
                                    className="text-indigo-400 hover:underline"
                                    onClick={() => setIsSignup(false)}
                                >
                                    login
                                </button>
                            </>
                        ) : (
                            <>
                                Don’t have an account?{" "}
                                <button
                                    type="button"
                                    className="text-indigo-400 hover:underline"
                                    onClick={() => setIsSignup(true)}
                                >
                                    Sign up
                                </button>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
}
