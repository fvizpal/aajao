"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"
import { currentUser } from "@/lib/data/auth"
import { logout } from "@/lib/actions/auth/logout"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Image from "next/image"
import { CircleUser } from "lucide-react"
import { useCurrentUser } from "@/hooks/authHooks"

const Header = () => {

  const user = useCurrentUser();

  const isLogged = !!user;

  const onClick = () => {
    logout();
  }


  return (
    <header className="w-full border-b">
      <div className="p-4 md:px-10 w-full flex items-center justify-between">
        <Link href="/" className="w-36 text-xl font-bold text-slate-800">
          Aa<span className="text-emerald-800">jao</span>
        </Link>

        {isLogged && (
          <nav className="md:flex md:justify-center md:items-center hidden w-full max-w-xs">
            <NavItems />
          </nav>
        )}

        <div className="flex w-32 justify-end gap-3">
          {isLogged ? (
            // TODO: ADD USER PROFILE AND SINGOUT OPTION
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel> {user.name} </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onClick}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <MobileNav />
            </>
          ) : (
            <Button asChild className="rounded-full" size="lg">
              <Link href="/auth/login">
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header