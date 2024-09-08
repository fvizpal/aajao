import Header from "@/components/shared/Header";
import Image from "next/image";

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Header />
      <div className="h-full mt-10 flex items-center justify-center">
        {children}
      </div>
    </>
  );
}

export default AuthLayout;