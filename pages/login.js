
import { signIn, useSession} from "next-auth/react";
import { useRouter } from "next/router";


export default function Login() {
const {data: session, status} = useSession();
const router = useRouter();

if(status !== "loading" && status === 'authenticated'){
    router.push('/');
}

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => signIn("github")}
      >
        Signin with GitHub
      </button>
    </div>
  );
}
