import About from "@/components/About";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/router";
import LoginLayout from "@/components/LoginLayout";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";

export default function EditAbout() {
  const router = useRouter();

  const { id } = router.query;

  const [aboutInfo, setAboutInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/api/abouts?id=" + id).then((response) => {
        setAboutInfo(response.data);
      });
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Update About</title>
      </Head>

      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{aboutInfo?.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <MdOutlinePrecisionManufacturing />
            <span>/</span> <span>Edit About</span>
          </div>
        </div>
        <div className="mt-3">
          {aboutInfo && <About {...aboutInfo} />}
        </div>
      </div>
    </>
  );
}
