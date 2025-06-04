import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import Machine from "@/components/Machine";

export default function Addmachine() {

    return <>
            <div className="addblogspage">
                    <div className="titledashboard flex flex-sb">
                      <div>
                        <h2>
                          Add <span>Machine</span>
                        </h2>
                        <h3>ADMIN PANEL</h3>
                      </div>
                      <div className="breadcrumb">
                        <MdOutlinePrecisionManufacturing /> <span>/</span> <span>Add Machine</span>
                      </div>
                    </div>
                    <div className="blogsadd">
                      <Machine />
                    </div>
                  </div>
    </>
}