import Plant from "@/components/Plant";
import { PiFactory } from "react-icons/pi";

export default function Addplant() {

    return <>
     <div className="addblogspage">
             <div className="titledashboard flex flex-sb">
               <div>
                 <h2>
                   Add <span>Plant</span>
                 </h2>
                 <h3>ADMIN PANEL</h3>
               </div>
               <div className="breadcrumb">
                 <PiFactory /> <span>/</span> <span>Add Plant</span>
               </div>
             </div>
             <div className="blogsadd">
               <Plant />
             </div>
           </div>
    </>
}