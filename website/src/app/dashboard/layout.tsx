"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ThemeTogglebutton from "@/components/ui/theme-toggle";
import { useState } from "react";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSOS, setShowSOS] = useState(true);
  const router = useRouter();

  return (
    <div className=" h-screen  ">
      <div className="flex h-14 justify-between items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-[3px] font-semibold">
          <div className=" ml-2">
            <Image src={"/shield.png"} width={32} height={32} alt="Shield" />
          </div>
          <span className="text-lg font-semibold tracking-tight ">
            S.H.I.E.L.D
          </span>
        </Link>

        <div className=" flex gap-2 items-center ">
          <Button
            variant={showSOS ? "default" : "outline"}
            onClick={() => {
              setShowSOS(true);
              router.replace("/dashboard/sos");
            }}
          >
            SOS
          </Button>
          <Button
            variant={!showSOS ? "default" : "outline"}
            onClick={() => {
              setShowSOS(false);
              router.replace("/dashboard/reports");
            }}
          >
            Reports
          </Button>

          <ThemeTogglebutton />
        </div>
      </div>

      <main className=" h-screen p-4 ">{children}</main>
    </div>
  );
}
