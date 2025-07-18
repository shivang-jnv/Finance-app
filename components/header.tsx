import { Loader2 } from "lucide-react"
import { ClerkLoaded, ClerkLoading, SignOutButton, UserButton } from "@clerk/nextjs"

import { Navigation } from "@/components/navigation"
import { HeaderLogo } from "@/components/header-logo"
import { WelcomeMsg } from "@/components/welcome-msg"
import { Filters } from "@/components/filters"

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-4 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <SignOutButton>
              <UserButton />
            </SignOutButton>
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-slate-400 size-8" />
          </ClerkLoading>
        </div>
        <WelcomeMsg />
        <Filters />
      </div>
    </header>
  )
}