import Header from "@/components/header"
import { Separator } from "@/components/ui/separator"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className="pt-6">
        <Header />
      </div>

      <Separator className="mt-4"/>

      <main className="mx-auto w-full max-w-[1200px] py-4">{children}</main>
    </div>
  )
}