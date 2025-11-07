import type { componentProps } from "../../types/componentProps";

export default function Title({ children }: componentProps) {
  return <h1 className="text-3xl font-semibold mb-8">{children}</h1>;
}
