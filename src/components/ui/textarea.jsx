import * as React from "react"

export const Textarea = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${className}`}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"
