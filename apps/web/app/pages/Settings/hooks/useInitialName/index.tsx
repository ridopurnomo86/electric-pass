import { useEffect, useState } from "react";

const useInitialName = ({ name = "" }: { name: string }) => {
  const [initialName, setInitialName] = useState("");

  useEffect(() => {
    const names = name.split(" ");
    let label = "";
    names.forEach((n) => {
      if (n.length > 0) label += n[0];
    });
    setInitialName(label);
  }, [name]);

  return { initialName };
};

export default useInitialName;
