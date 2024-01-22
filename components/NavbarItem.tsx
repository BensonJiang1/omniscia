import React from "react";

interface NavbarItemProps {
  label: string;
  onclick?: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({label,onclick})=> {
  return (
    <div onClick={onclick} className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  )

}

export default NavbarItem;