import type { componentTitleProps } from "../../types/componentProps";

export function Card({ title, children }: componentTitleProps) {
  return (
    <div className="bg-white border border-blue-100 rounded-lg shadow-sm p-6">
      {title && <h2 className="text-xl font-medium mb-4">{title}</h2>}
      {children}
    </div>
  );
}
