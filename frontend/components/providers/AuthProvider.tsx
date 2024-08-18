"use client"

import { resumeSession } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
    const { data, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: resumeSession,
        staleTime: Infinity,
    });

    if(isLoading)return <p>loading</p>
    return data
}

// export async function signUp(body: SignUpSchema): Promise<User | null> {
//     const user = await apiSignUp(body);
//     queryClient.setQueryData(["user"], user);
//     return user;
//   }
  
//   export async function login(body: SignInSchema): Promise<User | null> {
//     const user = await apiLogin(body);
//     queryClient.setQueryData(["user"], user);
//     return user;
//   }
  
//   export async function logout() {
//     await apiLogout();
//     queryClient.setQueryData(["user"], null);
//   }
  
//   export async function editProfile(body: EditUserSchema): Promise<User> {
//     const user = await editUser(body);
//     queryClient.setQueryData(["user"], user);
//     return user;
// }
  
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, error } = useQuery({
      queryKey: ["user"],
      queryFn: resumeSession,
      staleTime: Infinity,
  });

  if (isLoading) {
      return <p>Loading...</p>;
  }

  if (error) {
      console.error("Error in AuthProvider:", error);
      return <p>Error loading user data</p>;
  }

  return children;
}