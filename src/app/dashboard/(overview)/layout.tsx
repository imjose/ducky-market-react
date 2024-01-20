import NavBar from '@/app/ui/nav-bar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar/>
      <div>{ children }</div>
    </>
  )
}