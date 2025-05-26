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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../api/registerApi";
import { RegisterFormInputs, RegisterUserSchema } from "../schema";

export function RegisterForm() {
  const { toast } = useToast();
  const {
    mutateAsync: registerUser,
    isSuccess,
    isPending: isLoading,
    isError,
    error,
    data,
  } = useRegistration();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    setError,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const onSubmit = async (values: RegisterFormInputs) => {
    await registerUser(values);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Registration",
        description: `${(data.data as any).message}! Redirecting.....`,
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isSuccess, data, toast, navigate]);

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        const errs: any[] = error.response?.data;
        if (Array.isArray(errs)) {
          errs?.forEach((item) => {
            item?.path?.forEach((field: any) => {
              setError(field, { message: item.message });
            });
          });
        }
      }
    }
  }, [error, isError, setError]);

  const onSwitchToLogin = () => {
    navigate("/login");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
        <CardDescription className="text-center">
          Create an account to get started
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register("name")}
            />
            {errors.name && (
              <Alert className="border-0 ml-0 p-0">
                <AlertDescription className="text-red-800">
                  {errors.name.message}
                </AlertDescription>
              </Alert>
            )}
          </div>

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
              placeholder="Create a password"
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>

          <div className="text-sm text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign in
            </button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
