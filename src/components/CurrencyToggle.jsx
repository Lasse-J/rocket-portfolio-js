"use client"

import * as React from "react"
import { DollarSign, Euro, Bitcoin } from "lucide-react"
import { useState } from 'react'
// import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CurrencyToggle() {
  const [currency, setCurrency] = useState('dollar')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          {currency === 'dollar' ? (
          	<DollarSign className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-0 dark:scale-100" />
          ) : currency === 'euro' ? (
          	<Euro className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-0 dark:scale-100" />
          ) : (
          	<Bitcoin className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-0 dark:scale-100" />
          )}
          <span className="sr-only">Toggle currency</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setCurrency("dollar")}>
          USD
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrency("euro")}>
          EUR
        </DropdownMenuItem>
         <DropdownMenuItem onClick={() => setCurrency("bitcoin")}>
          BTC
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
