import Image from "next/image";

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "#dfdede", backgroundColor: "#f6f6f6" }}
    >
      <div className="flex flex-col items-center justify-center gap-[10px] py-[34px] px-4 text-center">
        <Image
          src="/images/logo-footer.svg"
          alt="ShareGratitude"
          width={92}
          height={36}
          className="h-auto w-[92px]"
        />
        <div className="flex flex-col gap-1">
          <p className="text-[14px] font-semibold" style={{ color: "#091f48" }}>
            THE SHARE GRATITUDE COMPANY
          </p>
          <p className="text-[14px]" style={{ color: "#6c7070" }}>
            Copyright &copy; The Share Gratitude Company 2026. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
