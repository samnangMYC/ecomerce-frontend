
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

const RouteChangeLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, [location]);

  return (
    loading && (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
       <Loader/>
      </div>
    )
  );
};

export default RouteChangeLoader;
