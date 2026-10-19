import React, { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300",
      className
    )}
    {...props}
  >
    {background && <div className="absolute inset-0 pointer-events-none">{background}</div>}
    <div className="relative z-10 flex flex-col gap-2">
      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 transition-transform duration-300 group-hover:scale-105">
        <Icon className="w-5 h-5 text-emerald-600" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 tracking-tight mt-2">
        {name}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>

    <div className="relative z-10 mt-6 flex items-center">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
      >
        <span>{cta}</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
