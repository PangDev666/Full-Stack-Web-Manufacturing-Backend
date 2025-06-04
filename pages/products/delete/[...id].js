import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import { FaShoppingBag } from "react-icons/fa";

export default function DeleteProduct() {
  const router = useRouter();

  const { id } = router.query;

  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/api/products?id=" + id).then((response) => {
        setProductInfo(response.data);
      });
    }
  }, [id]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    toast.success("delete successfully");
    goBack();
  }

  return (
    <>
      <Head>
        <title>Delete Product</title>
      </Head>

      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{productInfo?.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <FaShoppingBag />
            <span>/</span> <span>Edit Product</span>
          </div>
        </div>
        <div className="deletesec flex flex-center wh-100">
          <div className="deletecard">
            <svg viewBox="0 0 24 24" fill="red" hanging="6em" width="6em">
              <path d="M4 19V7h12v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2M6 9v10h8V9H6m7.5-5H17v2H3V4h3.5l1-1h5l1 1M19 17v-2h2v2h-2m0-4V7h2v6h-2z" />
            </svg>
            <p className="cookieHeading">Are you sure?</p>
            <p className="cookieDescription">If you delete this website content it will be permenent delete your content.</p>
            <div className="buttonContainer">
                <button onClick={deleteProduct} className="acceptButton">Delete</button>
                <button onClick={goBack} className="declineButton">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
