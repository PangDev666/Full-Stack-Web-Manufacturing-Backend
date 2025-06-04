import Product from "@/components/Product";
import { FaShoppingBag } from "react-icons/fa";

export default function Addproduct() {
  return (
    <>
      <div className="addblogspage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Add <span>Product</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <FaShoppingBag /> <span>/</span> <span>AddProduct</span>
          </div>
        </div>
        <div className="blogsadd">
          <Product />
        </div>
      </div>
    </>
  );
}
