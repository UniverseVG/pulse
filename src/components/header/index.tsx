import React, { useState, useEffect, useRef } from "react";
import Icon from "../../icons";
import Text from "../text";
import { Input, SearchInputWrapper } from "../index";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  pageTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }: any) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const MenuRef = useRef(null); // Ref to store reference to the menu div
  const AvatarButtonRef = useRef(null); // Ref to store reference to the avatar button

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        showMenu &&
        AvatarButtonRef.current &&
        !(AvatarButtonRef.current as HTMLDivElement).contains(
          event.target as Node
        ) &&
        MenuRef.current &&
        !(MenuRef.current as HTMLDivElement).contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showMenu, AvatarButtonRef, MenuRef]);

  const HandleAvatarClick = () => {
    setShowMenu((prevState) => !prevState); // Toggle the menu
  };

  return (
    <div className="flex flex-row md:flex-row justify-between items-center w-full mb-4 md:mb-[40px]">
      <Text
        className="md:text-3xl text-base font-bold md:mr-8"
        style={{ color: "#3A3B3F" }}
      >
        {pageTitle}
      </Text>
      <div className="flex md:flex-row md:pl-8">
        <div className="md:pr-10 md:w-96 pl-1 md:pt-1">
          <SearchInputWrapper handleSelect={() => {}} field="name">
            <Input
              id="global_search"
              placeholder="search"
              onChange={() => {}}
              iconLeft={
                <Icon
                  name="searchIcon"
                  height={12}
                  width={12}
                  color="#c1bfc1"
                />
              }
              inputStyle={{ paddingLeft: "30px" }}
              className="search-bar-input" // Add a class to the Input component for styling
              style={{ width: "100%", maxWidth: "300px", height: 30 }} // Reduce the width of the search bar
            />
          </SearchInputWrapper>
        </div>
        <div
          className="flex text-black flex-row items-center gap-2 md:gap-10 pl-2 md:pl-0"
          onClick={HandleAvatarClick}
          ref={AvatarButtonRef}
        >
          <div className="hidden md:block md:pl-4">
            <Icon
              name="notification"
              height={16}
              width={16}
              className="notification-icon"
            />
          </div>
          <button className="avatar-button">
            <Icon
              name="defaultAvatar"
              fill="#3A3B3F"
              height={36}
              width={37}
              className="avatar-icon"
            />
          </button>
        </div>
      </div>

      <div
        ref={MenuRef}
        className={`menu ${showMenu ? "show" : ""} rounded-lg z-10`}
      >
        <Text
          className="mg:text-lg md:pb-2 text-sm"
          style={{ color: "#3A3B3F" }}
        >
          {localStorage.getItem("email")}
        </Text>
        <div className="border-t border-black pb-1 w-full "></div>
        <button
          className="md:text-lg text-sm font-bold"
          style={{ color: "#3A3B3F" }}
          onClick={async () => {
            await navigate("/logout", { replace: true });
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
