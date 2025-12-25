import Image from "next/image";

export default function SocialProviders() {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-background py-2.5 text-sm font-medium hover:bg-muted transition"
        aria-label="Sign in with Google"
      >
        <Image src="/auth/google.svg" alt="Google" width={18} height={18} />
        Continue with Google
      </button>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-background py-2.5 text-sm font-medium hover:bg-muted transition"
        aria-label="Sign in with Apple"
      >
        <Image src="/auth/apple.svg" alt="Apple" width={18} height={18} />
        Continue with Apple
      </button>
    </div>
  );
}
