"use client"

import { resumeSession } from "@/lib/api";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function useUser() {
    const { data } = useSuspenseQuery({
        queryKey: ["user"],
        queryFn: resumeSession,
        staleTime: Infinity
    })
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
  
export default function AuthProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const { isPending } = useQuery({
      queryKey: ["user"],
      queryFn: resumeSession,
      staleTime: Infinity,
    });
  
    if (isPending) {
      return <p>Loading</p>
    }
  
    return children;
  }