import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type CommonProps = {
  variant?: "primary" | "secondary";
};

type LinkButtonProps = CommonProps & ComponentPropsWithoutRef<typeof Link>;
type NativeButtonProps = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: never };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex min-h-11 items-center justify-center border px-7 py-3 text-base font-medium transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue",
    variant === "primary"
      ? "border-primary-blue bg-primary-blue text-white hover:bg-dark-blue"
      : "border-primary-blue bg-transparent text-primary-blue hover:bg-light-blue",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className,
  ].join(" ");

  if (props.href !== undefined) {
    return <Link {...props} className={classes} />;
  }

  return <button {...props} type={props.type ?? "button"} className={classes} />;
}
