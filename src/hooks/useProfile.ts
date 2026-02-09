import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles">;

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        // Return default/fallback data if profile doesn't exist
        return null;
      }
      
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
