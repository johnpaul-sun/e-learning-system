import { useState, useEffect } from 'react';

const useHydrationBypass = (): any => {
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
}

export default useHydrationBypass;
