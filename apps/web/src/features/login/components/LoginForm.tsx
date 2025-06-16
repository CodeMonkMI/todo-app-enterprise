import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokenData, useAuth } from "@/contexts/AuthContext";
import { authToken } from "@/lib/token/AuthToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../api/loginApi";
import { LoginFormInputs, LoginUserSchema } from "../schema";

export function LoginForm() {
  const {
    mutateAsync: login,
    isSuccess,
    isPending,
    isError,
    error,
    data,
  } = useLogin();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    setError,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginUserSchema),
  });

  const { login: authLogin } = useAuth();

  const onSubmit = async (values: LoginFormInputs) => {
    await login(values);
  };

  const navigate = useNavigate();

  const onSwitchToRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (isSuccess) {
      const token = (data as any).data.token;
      authToken.setItem(token);
      const user = authToken.decode(token) as TokenData;
      authLogin(user);
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        const errs: any[] = error.response?.data;
        errs?.forEach((item) => {
          item?.path?.forEach((field: any) => {
            setError(field, { message: item.message });
          });
        });
      }
    }
  }, [error, isError, setError]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <Alert className="border-0 ml-0 p-0">
                <AlertDescription className="text-red-800">
                  {errors.email.message}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <Alert className="border-0 ml-0 p-0">
                <AlertDescription className="text-red-800">
                  {errors.password.message}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing In..." : "Sign In"}
          </Button>

          <div className="text-sm text-center">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up
            </button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
