import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import SocialProviders from "@/components/SocialProviders";

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      <SocialProviders />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or create account with
          </span>
        </div>
      </div>

      <AuthForm
        title="Create an account"
        subtitle="Get started in a few seconds"
        submitLabel="Sign up"
        footer={
          <>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </>
        }
      />
    </div>
  );
}
