"use client"

import { resumeSession } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: resumeSession,
        staleTime: Infinity,
    });

    if (error) {
        console.error("Error in useUser hook:", error); // Detailed error logging
    }

    return { user: data, isLoading };
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
  const { data: user, isLoading, error } = useQuery({
      queryKey: ["user"],
      queryFn: resumeSession,
      staleTime: Infinity,
  });

  if (isLoading) {
      return <p>Loading...</p>;
  }

  if (error) {
      console.error("Error in AuthProvider:", error); // Detailed error logging
      return <p>Error loading user data</p>;
  }

  return children;
}