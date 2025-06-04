import ParentComponent from "@/components/ParentComponent";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
//import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // use userouter hook

  useEffect(() => {
    const handleStart = () => setLoading(true);

    const handleComplate = () => setLoading(true);

    // check if the route is alreaduy complate when the component mounts
    if (router.isReady) {
      setLoading(false);
    }

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplate);
    router.events.on("routeChangeError", handleComplate);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplate);
      router.events.off("routeChangeError", handleComplate);
    };
  }, [router.isReady]); // add router.events to the dependency array

  const [asideOpen, setAsideOpen] = useState(false);

  const contAsideOpen = () => {
    setAsideOpen(!asideOpen);
  };

  return (
    <>
      <>
        <ParentComponent appOpen={asideOpen} appAsideOpen={contAsideOpen} />
        <main>
          <div className={asideOpen ? "container" : "container active"}>
            <Component {...pageProps} />
          </div>
        </main>
      </>
    </>
  );
}
