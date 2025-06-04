import Machine from "@/components/Machine";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/router";
import LoginLayout from "@/components/LoginLayout";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";

export default function EditMachine() {
  const router = useRouter();

  const { id } = router.query;

  const [machineInfo, setMachineInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/api/machines?id=" + id).then((response) => {
        setMachineInfo(response.data);
      });
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Update Machine</title>
      </Head>

      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{machineInfo?.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <MdOutlinePrecisionManufacturing />
            <span>/</span> <span>Edit Machine</span>
          </div>
        </div>
        <div className="mt-3">
          {machineInfo && <Machine {...machineInfo} />}
        </div>
      </div>
    </>
  );
}
