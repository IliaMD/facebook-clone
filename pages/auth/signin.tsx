import { getProviders, signIn } from "next-auth/react";
import { FC } from "react";

interface ProvidersProps {
  providers: any;
}

const SignIn: FC<ProvidersProps> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
};

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignIn;
