import { useRef } from "react";

export const useRefetch = () => {
  const refetch = useRef<boolean>(false);

  const triggerRefetch = () => {
    refetch.current = !refetch.current;
  };
  return {
    refetch,
    triggerRefetch,
  };
};
