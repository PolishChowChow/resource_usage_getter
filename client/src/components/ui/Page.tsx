import type { componentTitleProps } from "../../types/componentProps";

export default function Page({ children, title }: componentTitleProps) {
    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
            {children}
        </div>
    );
}