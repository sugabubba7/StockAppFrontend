import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming this utility function is for combining classes

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, candleName, imageSrc, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight", className)}
    {...props}
  >
    <img
      src={imageSrc}
      alt={candleName}
      className="w-full h-32 object-cover rounded-md"
    />
    <h2 className="mt-3">{candleName}</h2>
  </div>
));
CardTitle.displayName = "CardTitle";

export { Card, CardHeader, CardTitle };
