import Icon from "../icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/pulse.png";

const LeftSideBar = () => {
  const url = window.location.pathname.substr(1);
  const [hovered, setHovered] = useState(Array(10).fill(false));

  const handlePressIn = (index: any) => {
    setHovered((prev) => prev.map((state, i) => (i === index ? true : state)));
  };

  const handlePressOut = (index: any) => {
    setHovered((prev) => prev.map((state, i) => (i === index ? false : state)));
  };
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-[#fff] hidden sm:flex ">
      <div
        id="default-sidebar"
        className="w-64 transition-transform -translate-x-full sm:translate-x-0 overflow-hidden background-left"
        aria-label="Sidebar"
      >
        <div
          className="flex justify-center cursor-pointer"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <img src={Logo} className=" w-fit h-fit p-10" alt="TimeTracker" />
        </div>

        <div className="flex px-3 pb-4 flex-col justify-between">
          <ul className="space-y-2 font-medium ">
            <li>
              <a
                href="/dashboard"
                className=" flex items-center p-2 text-gray-900 rounded-lg dark:text-onPrimary"
                onMouseEnter={() => handlePressIn(1)}
                onMouseLeave={() => handlePressOut(1)}
                style={{
                  backgroundColor:
                    (url === "dashboard" || hovered[1]) &&
                    "rgb(192, 224, 220,0.2)",
                  borderLeftWidth: (url === "dashboard" || hovered[1]) && 4,
                  borderLeftColor:
                    (url === "dashboard" || hovered[1]) && "#018273",
                }}
              >
                <Icon
                  name="dashboard"
                  fill={
                    url === "dashboard" || hovered[1] ? "#018273" : "#3A3B3F"
                  }
                  height={18}
                  width={18}
                />
                <span
                  className="flex-1 ml-3 whitespace-nowrap  hover:text-[#018273]"
                  style={{
                    color: "#3a3b3f",
                  }}
                >
                  Dashboard
                </span>
              </a>
            </li>
            <li>
              <a
                href="/calender"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-onPrimary"
                onMouseEnter={() => handlePressIn(2)}
                onMouseLeave={() => handlePressOut(2)}
                style={{
                  backgroundColor:
                    (url === "calender" || hovered[2]) &&
                    "rgb(192, 224, 220,0.2)",
                  borderLeftWidth: (url === "calender" || hovered[2]) && 4,
                  borderLeftColor:
                    (url === "calender" || hovered[2]) && "#018273",
                }}
              >
                <Icon
                  name="calender"
                  fill={
                    url === "calender" || hovered[2] ? "#018273" : "#3A3B3F"
                  }
                  height={18}
                  width={18}
                />
                <span
                  className="flex-1 ml-3 whitespace-nowrap  hover:text-[#018273]"
                  style={{
                    color: "#3a3b3f",
                  }}
                >
                  Calender
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className=" flex items-center p-2 text-gray-900 rounded-lg dark:text-onPrimary"
                onClick={() => {
                  navigate("/timereport");
                }}
                onMouseEnter={() => handlePressIn(3)}
                onMouseLeave={() => handlePressOut(3)}
                style={{
                  backgroundColor:
                    (url === "reports" || hovered[3]) &&
                    "rgb(192, 224, 220,0.2)",
                  borderLeftWidth: (url === "reports" || hovered[3]) && 4,
                  borderLeftColor:
                    (url === "reports" || hovered[3]) && "#018273",
                }}
              >
                <Icon
                  name="reports"
                  fill={url === "reports" || hovered[3] ? "#018273" : "#3A3B3F"}
                  height={18}
                  width={18}
                />
                <span
                  className="flex-1 ml-3 whitespace-nowrap  hover:text-[#018273]"
                  style={{
                    color: "#3a3b3f",
                  }}
                >
                  Time Reports
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-onPrimary "
                onMouseEnter={() => handlePressIn(4)}
                onMouseLeave={() => handlePressOut(4)}
                style={{
                  backgroundColor:
                    (url === "settings" || hovered[4]) &&
                    "rgb(192, 224, 220,0.2)",
                  borderLeftWidth: (url === "settings" || hovered[4]) && 4,
                  borderLeftColor:
                    (url === "settings" || hovered[4]) && "#018273",
                }}
              >
                <Icon
                  name="settings"
                  fill={
                    url === "settings" || hovered[4] ? "#018273" : "#3A3B3F"
                  }
                  height={18}
                  width={18}
                />
                <span
                  className="flex-1 ml-3 whitespace-nowrap hover:text-[#018273]"
                  style={{
                    color: "#3a3b3f",
                  }}
                >
                  Settings
                </span>
              </a>
            </li>

            <li>
              <a
                href="/my-approvals"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-onPrimary "
                onMouseEnter={() => handlePressIn(5)}
                onMouseLeave={() => handlePressOut(5)}
                style={{
                  backgroundColor:
                    (url === "my-approvals" || hovered[5]) &&
                    "rgb(192, 224, 220,0.2)",
                  borderLeftWidth: (url === "my-approvals" || hovered[5]) && 5,
                  borderLeftColor:
                    (url === "my-approvals" || hovered[5]) && "#018273",
                }}
              >
                <Icon
                  name="project"
                  fill={
                    url === "my-approvals" || hovered[5] ? "#018273" : "#3A3B3F"
                  }
                  height={18}
                  width={18}
                />
                <span
                  className="flex-1 ml-3 whitespace-nowrap hover:text-[#018273]"
                  style={{
                    color: "#3a3b3f",
                  }}
                >
                  My Approvals
                </span>
              </a>
            </li>

            <li>
              <a
                href="/addUser"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-onPrimary "
                onMouseEnter={() => handlePressIn(6)}
                onMouseLeave={() => handlePressOut(6)}
                style={{
                  backgroundColor:
                    (url === "addUser" || hovered[6]) &&
                    "rgb(192, 224, 220,0.2)",
                  borderLeftWidth: (url === "addUser" || hovered[6]) && 6,
                  borderLeftColor:
                    (url === "addUser" || hovered[6]) && "#018273",
                }}
              >
                <Icon
                  name="user"
                  fill={url === "addUser" || hovered[6] ? "#018273" : "#3A3B3F"}
                  height={18}
                  width={18}
                />
                <span
                  className="flex-1 ml-3 whitespace-nowrap hover:text-[#018273]"
                  style={{
                    color: "#3a3b3f",
                  }}
                >
                  User
                </span>
              </a>
            </li>
            <li>
              <a
                href="/addproduct"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-onPrimary "
                onMouseEnter={() => handlePressIn(9)}
                onMouseLeave={() => handlePressOut(9)}
                style={{
                  backgroundColor:
                    (url === "addproduct" || hovered[9]) &&
                    "rgb(192, 224, 220,0.2)",
                  borderLeftWidth: (url === "addproduct" || hovered[9]) && 9,
                  borderLeftColor:
                    (url === "addproduct" || hovered[9]) && "#018273",
                }}
              >
                <Icon
                  name="project"
                  fill={
                    url === "addproduct" || hovered[9] ? "#018273" : "#3A3B3F"
                  }
                  height={18}
                  width={18}
                />
                <span
                  className="flex-1 ml-3 whitespace-nowrap hover:text-[#018273]"
                  style={{
                    color: "#3a3b3f",
                  }}
                >
                  Project
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end px-3 pb-4">
        <ul className="space-y-2 font-medium ">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-onPrimary"
              onMouseEnter={() => handlePressIn(7)}
              onMouseLeave={() => handlePressOut(7)}
              style={{
                backgroundColor:
                  (url === "support" || hovered[7]) && "rgb(192, 224, 220,0.2)",
                borderLeftWidth: (url === "support" || hovered[7]) && 7,
                borderLeftColor: (url === "support" || hovered[7]) && "#018273",
              }}
            >
              <Icon
                name="support"
                fill={url === "support" || hovered[7] ? "#018273" : "#3A3B3F"}
                height={18}
                width={18}
              />
              <span
                className="flex-1  ml-3 whitespace-nowrap  hover:text-[#018273]"
                style={{
                  color: "#3a3b3f",
                }}
              >
                Support
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-onPrimary"
              onMouseEnter={() => handlePressIn(8)}
              onMouseLeave={() => handlePressOut(8)}
              style={{
                backgroundColor:
                  (url === "terms" || hovered[8]) && "rgb(192, 224, 220,0.2)",
                borderLeftWidth: (url === "terms" || hovered[8]) && 8,
                borderLeftColor: (url === "terms" || hovered[8]) && "#018273",
              }}
            >
              <Icon
                name="terms"
                fill={url === "terms" || hovered[8] ? "#018273" : "#3A3B3F"}
                height={18}
                width={18}
              />
              <span
                className="flex-1 ml-3 whitespace-nowrap hover:text-[#018273]"
                style={{
                  color: "#3a3b3f",
                }}
              >
                Terms & Conditions
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSideBar;
