import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href={"/"}
      className="flex items-center text-sm hover:opacity-75 transition mb-6"
    >
      <Image height={130} width={130} alt="logo" src="/logo.svg" />
    </Link>
  );
};
