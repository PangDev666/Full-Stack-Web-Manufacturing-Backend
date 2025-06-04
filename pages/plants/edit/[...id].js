import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/router";
import LoginLayout from "@/components/LoginLayout";
import { PiFactory } from "react-icons/pi";
import Plant from "@/components/Plant";

export default function EditProject() {
    const router = useRouter();

    const { id } = router.query;
  
    const [plantInfo, setPlantInfo] = useState(null);
  
    useEffect(() => {
      if (!id) {
        return;
      } else {
        axios.get("/api/plants?id=" + id).then((response) => {
          setPlantInfo(response.data);
        });
      }
    }, [id]);
  

    return <>
     <Head>
        <title>Update Plant</title>
      </Head>

      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{plantInfo?.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <PiFactory /> 
            <span>/</span> <span>Edit Plant</span>
          </div>
        </div>
        <div className="mt-3">
          {plantInfo && <Plant {...plantInfo} />}
        </div>
      </div>
    </>
}