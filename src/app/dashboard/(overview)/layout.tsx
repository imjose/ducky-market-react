import { auth } from "@/app/lib/auth";
import NavBar from "@/app/ui/nav-bar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <main className="p-5 max-w-5xl mx-auto">
      <div className="mb-4 px-2">
        <NavBar name={session?.user?.name ?? "User"} />
      </div>
      <div>{children}</div>
    </main>
  );
}
