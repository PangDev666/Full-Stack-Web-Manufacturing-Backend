import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/router";
import { LuShoppingCart } from "react-icons/lu";
import { useEffect, useState } from "react";
import { MdOutlineContactMail } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { PiFactory } from "react-icons/pi";

export default function Aside({asideOpen, handleAsideOpen}) {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLinkClick = (link) => {
    setActiveLink((prevActive) => (prevActive === link ? null : link));
    setClicked(false);
  };

  useEffect(() => {
    // update active link state when the page is reloaded
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <>
{/* <LoginLayout> */}
      <aside className={asideOpen ? "asideleft active" : "asideleft"}>
        <ul>
          <Link href="/">
            <li className="navactive">
              <IoHome />
              <span>Dashboard</span>
            </li>
          </Link>
          {/* ----------------- Products ------------------- */}
          <li
            className={
              activeLink === "/products"
                ? "navactive flex-col flex-left"
                : "flex-col flex-left"
            }
            onClick={() => handleLinkClick("/products")}
          >
            <div className="flex gap-1">
              <LuShoppingCart />
              <span>Products</span>
            </div>
            {activeLink === "/products" && (
              <ul>
                <Link href="/products">
                  <li>All Products</li>
                </Link>
                <Link href="/products/draftproduct">
                  <li>Draft Products</li>
                </Link>
                <Link href="/products/addproduct">
                  <li>Add Products</li>
                </Link>
              </ul>
            )}
          </li>

          {/* ----------------- About ------------------- */}
          <li
            className={
              activeLink === "/abouts"
                ? "navactive flex-col flex-left"
                : "flex-col flex-left"
            }
            onClick={() => handleLinkClick("/abouts")}
          >
            <div className="flex gap-1">
              <BsPostcard />
              <span>About</span>
            </div>
            {activeLink === "/abouts" && (
              <ul>
                <Link href="/abouts">
                  <li>About</li>
                </Link>
                <Link href="/abouts/draftabout">
                  <li>Draft About</li>
                </Link>
                <Link href="/abouts/addabout">
                  <li>Add About</li>
                </Link>
              </ul>
            )}
          </li>

          {/* ----------------- Plant ------------------- */}
          <li
            className={
              activeLink === "/plants"
                ? "navactive flex-col flex-left"
                : "flex-col flex-left"
            }
            onClick={() => handleLinkClick("/plants")}
          >
            <div className="flex gap-1">
              <PiFactory  />
              <span>Plant</span>
            </div>
            {activeLink === "/plants" && (
              <ul>
                <Link href="/plants">
                  <li>All Plant</li>
                </Link>
                <Link href="/plants/draftplant">
                  <li>Draft Plant</li>
                </Link>
                <Link href="/plants/addplant">
                  <li>Add Plant</li>
                </Link>
              </ul>
            )}
          </li>

          {/* ----------------- Machine ------------------- */}
          <li
            className={
              activeLink === "/machines"
                ? "navactive flex-col flex-left"
                : "flex-col flex-left"
            }
            onClick={() => handleLinkClick("/machines")}
          >
            <div className="flex gap-1">
            <MdOutlinePrecisionManufacturing />
              <span>Machine</span>
            </div>
            {activeLink === "/machines" && (
              <ul>
                <Link href="/machines">
                  <li>All Machine</li>
                </Link>
                <Link href="/machines/draftmachine">
                  <li>Draft Machine</li>
                </Link>
                <Link href="/machines/addmachine">
                  <li>Add Machine</li>
                </Link>
              </ul>
            )}
          </li>
          
          {/* ----------------- Contact ------------------- */}
          <Link href="/contacts">
            <li
              className={activeLink === "/contacts" ? "navactive" : ""}
              onClick={() => handleLinkClick("/contacts")}
            >
              <MdOutlineContactMail />
              <span>Contact</span>
            </li>
          </Link>
          {/* ----------------- Setting ------------------- */}
          <Link href="/setting">
            <li
              className={activeLink === "/setting" ? "navactive" : ""}
              onClick={() => handleLinkClick("/setting")}
            >
              <IoSettingsOutline />
              <span>Setting</span>
            </li>
          </Link>
        </ul>
        <button className="logoutbtn">Logout</button>
      </aside>
{/* </LoginLayout> */}
    </>
  );
}
