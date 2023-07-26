import UserContext from "../context/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { User, Credential, CredentialReg } from "../types/User";
import { post, setToken } from "../utils/http";
import { DB_URL } from "../utils/dbString";
import getUser from "../mock_data/getUser";

type UserProviderProps = {
  children: React.ReactNode;
};

//dotenv.config();

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useLocalStorage<User | undefined>("user", getUser);
  if (user) {
    setToken(user.token);
  }

  const login = async (email: string, password: string) => {
    try {
      const user = await post<Credential, User>(`${DB_URL}/user/signin`, {
        email,
        password,
      });
      setUser(user);
      setToken(user.token);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "Unable to login at this moment, please try again";
    }
  };

  const register = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    try {
      const user = await post<CredentialReg, User>(`${DB_URL}/user/register`, {
        email,
        password,
        fullName,
      });
      setUser(user);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "Unable to login at this moment, please try again";
    }
  };

  const logout = () => {
    setUser(undefined);
    setToken("");
  };
  

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}
