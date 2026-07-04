import { useQuery } from "@tanstack/react-query";
import type { Tables } from "@/integrations/supabase/types";
import { profileQuery } from "@/queries/homeQueries";

export type Profile = Tables<"profiles">;

export const useProfile = () => {
  return useQuery({
    ...profileQuery,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
