import { useContext, useState } from "react";
import axios from "axios";
import { LoginRes, User } from "../interface/Types";
import { MyContext } from "../components/ContextProvider";

const baseurl = import.meta.env.VITE_BASE_URL;

type UseUserAuthResult = {
  loading: boolean;
  data: { type: string; res: string };
  error: string | null;
  login: (user: User) => Promise<void>;
  signUp: (user: User) => Promise<void>;
};

export default function useUserAuth(): UseUserAuthResult {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ type: string; res: string }>({
    type: "",
    res: "",
  });
  const { setAuth } = useContext(MyContext);
  const [error, setError] = useState<string | null>(null);

  async function login(user: User) {
    setLoading(true);
    setError(null);
    try {
      const response: LoginRes = (
        await axios.post(`${baseurl}/auth/login`, user)
      ).data;
      if (response.verified) {
      console.log(response)
        setAuth({auth: true, username: user.username });
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function signUp(user: User) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseurl}/auth/register`, user);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return { loading, data, error, login, signUp };
}
