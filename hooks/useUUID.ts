import { useMemo } from "react";
import { v4 } from "uuid";

const useUUID = (arraySize: number) => {
  const ids: string[] = [];

  for (let i = 0; i < arraySize; i += 1) {
    ids.push(v4());
  }

  return useMemo(() => ids, []);
};

export default useUUID;