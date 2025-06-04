import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import About from "@/components/About";

export default function Addabout() {

    return <>
            <div className="addblogspage">
                    <div className="titledashboard flex flex-sb">
                      <div>
                        <h2>
                          Add <span>About</span>
                        </h2>
                        <h3>ADMIN PANEL</h3>
                      </div>
                      <div className="breadcrumb">
                        <MdOutlinePrecisionManufacturing /> <span>/</span> <span>Add About</span>
                      </div>
                    </div>
                    <div className="blogsadd">
                      <About />
                    </div>
                  </div>
    </>
}