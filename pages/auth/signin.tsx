import { getProviders, signIn } from "next-auth/react";
import { FC } from "react";
import { Header } from "../../components";
import facebook from "../../assets/facebook1.png";
import Image from "next/image";

interface ProvidersProps {
  providers: ProviderType[];
}

type ProviderType = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

const SignIn: FC<ProvidersProps> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider: ProviderType) => (
        <div key={provider.name}>
          <Header />
          <div className="flex flex-col items-center mt-12">
            <div className="w-48 h-48">
              <Image src={facebook} alt="logo" />
            </div>
            <div className="mt-8 bg-blue-500 rounded-full p-3">
              <button
                className="text-white"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignIn;
