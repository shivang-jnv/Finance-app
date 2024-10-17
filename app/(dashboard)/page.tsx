import { ClerkLoaded, ClerkLoading, SignOutButton, UserButton, } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"

export default function Home() {
 return (
  <div className="mt-2">
          <ClerkLoaded>
            <SignOutButton>
              <UserButton />
            </SignOutButton>
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
  
 )
}
