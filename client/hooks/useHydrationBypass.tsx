import { useState, useEffect } from 'react';

const useHydrationBypass = (condition: boolean): any => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  }

  return condition && <></>
}

export default useHydrationBypass;
