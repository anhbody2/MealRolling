    import {
    Map,
    Info,
    Utensils,
    User,
    MessageSquare,
    } from "lucide-react";

    const navItems = [
    {
        label: "Maps",
        icon: Map,
        href: "#maps",
    },
    {
        label: "About",
        icon: Info,
        href: "#about",
    },
    {
        label: "Menu",
        icon: Utensils,
        href: "#menu",
        main: true,
    },
    {
        label: "User",
        icon: User,
        href: "#user",
    },
    {
        label: "Feedback",
        icon: MessageSquare,
        href: "#feedback",
    },
    ];

    export default function Navigation() {
    return (
        <nav
        className="
            fixed z-50
            top-4 left-1/2 -translate-x-1/2
            w-[calc(100%-2rem)] max-w-4xl

            md:top-6

            border-4 border-black
            bg-[#f5e6c8]
            shadow-[6px_6px_0px_#00
            font-mono
        "
        >
        <div className="flex items-center justify-between px-2 py-2 md:px-4">
            {navItems.map((item) => {
            const Icon = item.icon;

            return (
                <a
                key={item.label}
                href={item.href}
                className={`
                    group
                    relative
                    flex flex-1
                    flex-col items-center justify-center
                    gap-1
                    px-1 py-2
                    transition-transform

                    hover:-translate-y-1
                    active:translate-y-1

                    ${
                    item.main
                        ? `
                        mx-1
                        border-4 border-black
                        bg-[#e85d3f]
                        text-white
                        shadow-[3px_3px_0px_#000]
                        md:-mt-8
                        md:min-h-[76px]
                        `
                        : `
                        text-black
                        hover:bg-[#e8d4ad]
                        `
                    }
                `}
                >
                <Icon
                    size={item.main ? 28 : 22}
                    strokeWidth={3}
                    className="pixelated"
                />

                <span
                    className={`
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-tight
                    sm:text-[11px]
                    md:text-xs
                    `}
                >
                    {item.label}
                </span>

                {/* Pixel-style hover indicator */}
                <span
                    className="
                    absolute
                    -top-1
                    h-1
                    w-0
                    bg-black
                    transition-all
                    group-hover:w-8
                    "
                />
                </a>
            );
            })}
        </div>
        </nav>
    );
    }