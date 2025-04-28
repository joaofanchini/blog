import Link from "next/link";

interface InlineMenuProps {
  navLinks?: Array<{ label: string; href: string }> | null;
}
export default function InlineMenu(props: InlineMenuProps) {
  return (
    <nav className="hidden md:flex">
      <ul>
        {props.navLinks?.map((link, index) => (
          <li
            key={index}
            className="inline-block border-r-2 border-gray-200 last:border-r-0"
          >
            <Link
              href={link.href}
              className="block text-white text-lg font-semibold hover:bg-[#374151] px-4 py-0.5 text-center cursor-pointer transition-all duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
