import Image from "next/image";

export function ZayanLogo({ height = 36 }) {
  return <Image src="/logo/zayan-soft-tech.png" alt="Zayan Soft Tech logo" width={Math.round((height * 408) / 139)} height={height} className="rounded-sm" style={{ height, width: "auto" }} />;
}
export function MyLogo({ size = 36 }) {
  return <Image src="/logo/my-logo.jpeg" alt="Muhammad Yasir monogram" width={size} height={size} className="rounded-sm bg-white" />;
}
