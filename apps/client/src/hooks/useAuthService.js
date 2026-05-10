import { useMutation } from "@tanstack/react-query";
import authService from "../services/authService";
// import { UseAppContext } from "../context/AppContext";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import toastUtils from "../utils/toastUtils";

const useAuthService = () => {
  const { setUser, setShowUserLogin, setUserAddresses, logout } = useAuth();
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: ({ name, email, password }) =>
      authService.signup(name, email, password),
  });

  // -- VERIFY OTP MUTATION --
  const verifyOtpMutation = useMutation({
    mutationFn: ({ email, otp }) => authService.verifyOtp(email, otp),
  });

  // -- RESEND OTP MUTATION --
  const resendOtpMutation = useMutation({
    mutationFn: (email) => authService.resendOtp(email),
  });

  // -- LOGIN MUTATION --
  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (res) => {
      console.group("from onsuccess");
      if (res.ok) {
        console.group("from succes  req");
        const { token, user, addresses } = res.data;
        console.log("token", token);
        console.log("user", user);
        localStorage.setItem("authToken", token);
        setUser(user);
        setUserAddresses(addresses);
        setShowUserLogin(false);
        navigate("/");
        // toastUtils.success("Login successful");
      } else {
        // toastUtils.error(res.message);
      }
    },
  });

  // -- FORGOT PASSWORD MUTATION --
  const forgotPasswordMutation = useMutation({
    mutationFn: (email) => authService.forgotPassword(email),
  });

  // -- RESET PASSWORD MUTATION --
  const resetPasswordMutation = useMutation({
    mutationFn: ({ email, otp, newPassword }) =>
      authService.resetPassword(email, otp, newPassword),
  });

  return {
    signup: signupMutation.mutateAsync,
    verifyOtp: verifyOtpMutation.mutateAsync,
    resendOtp: resendOtpMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    logout: () => {
      logout();
      navigate("/");
    },
    // Loading states
    isLoadingSignup: signupMutation.isPending,
    isLoadingVerify: verifyOtpMutation.isPending,
    isLoadingResend: resendOtpMutation.isPending,
    isLoadingLogin: loginMutation.isPending,
    isLoadingForgotPassword: forgotPasswordMutation.isPending,
    isLoadingResetPassword: resetPasswordMutation.isPending,
    isLoading:
      signupMutation.isPending ||
      verifyOtpMutation.isPending ||
      loginMutation.isPending ||
      resendOtpMutation.isPending ||
      forgotPasswordMutation.isPending ||
      resetPasswordMutation.isPending,
  };
};

export default useAuthService;
