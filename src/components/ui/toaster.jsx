"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      expand={false}
      richColors={false}
      style={{ fontFamily: "inherit" }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-start gap-3 w-[356px] p-4 border border-black/[0.08] dark:border-white/[0.08] bg-background text-foreground rounded-xl backdrop-blur-xl shadow-sm",
          icon: "mt-0.5 shrink-0",
          content: "flex flex-col gap-0.5 flex-1 min-w-0",
          title: "text-[13px] font-bold leading-tight",
          description: "text-[12px] text-muted-foreground leading-snug",
          actionButton:
            "mt-2 border border-black/[0.1] dark:border-white/[0.1] text-[12px] h-6 px-2 bg-black/[0.04] dark:bg-white/[0.06] text-foreground rounded-lg shrink-0 font-semibold",
          cancelButton:
            "mt-2 border border-black/[0.1] dark:border-white/[0.1] text-[12px] h-6 px-2 bg-transparent text-foreground rounded-lg shrink-0",
          closeButton:
            "absolute top-2 right-2 border border-black/[0.1] dark:border-white/[0.1] rounded-lg bg-background text-foreground",
          error:
            "!border-destructive/30 !bg-destructive/10 !text-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
