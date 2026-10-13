import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="font-display text-amber2 text-7xl sm:text-8xl font-bold mb-4">404</div>
        <h1 className="font-display text-2xl sm:text-3xl text-midnight font-bold mb-4">Page Not Found</h1>
        <p className="text-muted mb-8">The page you're looking for doesn't exist or has moved.</p>
        <Link href="/" className="btn btn-primary">Return Home</Link>
      </div>
    </main>
  );
}
