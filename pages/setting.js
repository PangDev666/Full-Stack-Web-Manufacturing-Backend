import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Setting() {
  return (
    <>
      <div className="settingpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Admin <span>Settings</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <IoSettingsOutline /> <span>/</span> <span>Settings</span>
          </div>
        </div>

        <div className="profilesettings">
            <div className="leftprofile_details flex">
                <img src="/img/spy.png" alt="unp" />
                <div className="w-100">
                    <div className="flex flex-sb flex-left mt-2">
                        <h2>My Profile:</h2>
                        <h3>UNIPRO <br /> Manufucturing</h3>
                    </div>
                    <div className="flex flex-sb mt-2">
                        <h3>Phone:</h3>
                        <input type="text" defaultValue={'123-456-7890'} />
                    </div>
                    <div className="mt-2">
                        <input type="email" defaultValue={'uniprogroupmanufacturing@gmail.com'} />
                    </div>
                    <div className="flex flex-center w-100 mt-2">
                        <button>Save</button>
                    </div>
                </div>
            </div>
            <div className="rightlogoutsec">
            <div className="topaccoutnbox">
                <h2>My Account <MdOutlineAccountCircle/></h2>
                <hr />
                <div className="flex flex-sb mt-1">
                    <h3>Active Account <br /> <span>Email</span></h3>
                    <button>Log Out</button>
                </div>
            </div>
        </div>
        </div>

      </div>
    </>
  );
}
