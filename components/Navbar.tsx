
import NavbarItem from "./NavbarItem";
import {BsChevronDown, BsSearch, BsBell} from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";
import { useRouter } from "next/router";



const TOP_OFFSET = 66;


const Navbar = () => {
  const router = useRouter();


  const goSet = () => {
    console.log("created set");
    router.push('/allsets');
  }

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  

  useEffect(()=>{
    const handleScroll = () => {
      if(window.scrollY > TOP_OFFSET){
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }

  },[]);

  const toggleMobileMenu = useCallback(()=>{
    setShowMobileMenu((currentValue)=> !currentValue );
  },[])

  const toggleAccountMenu = useCallback(()=>{
    setShowAccountMenu((currentValue)=> !currentValue );
  },[])

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`
        md:px-16
        px-4
        py-6
        flex
        flex-row
        items-center
        transition
        duration-500
        ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}
        `}>
          {/* <img className="h-4 lg:h-7" src="/images/logo.png" alt="" /> */}
          <div
            className="
            ml-8
            gap-7
            hidden
            lg:flex
            flex-row
            ">
              <NavbarItem  label="Home" onclick={()=>router.push('/')}/>
              <NavbarItem  label="Add Set" onclick={()=>router.push('/createset')}/>
              <NavbarItem  label="Delete Set" onclick={()=>{router.push('/deleteset')}}/>
              <NavbarItem  label="My Sets" onclick={goSet}/>
          </div>

          <div onClick={()=> toggleMobileMenu()} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
            <p className="text-white text-sm">Sets</p>
            <BsChevronDown className={`text-white transition ${showMobileMenu ? "rotate-180": "rotate-0"}`}/>
            <MobileMenu visible={showMobileMenu} />
          </div>

          <div className="flex flex-row ml-auto gap-7 items-center">
            <div className="text-gray-200 hover:text-gray-300 transition cursor-pointer">
              <BsSearch/>
            </div>
            <div className="text-gray-200 hover:text-gray-300 transition cursor-pointer">
              <BsBell/>
            </div>

            <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <img src="/images/default-green.png" alt="" />
              </div>
              <BsChevronDown className={`text-white transition ${showAccountMenu ? "rotate-180": "rotate-0"}`}/>
              <AccountMenu visible={showAccountMenu} />
            </div>
          </div>

      </div>
    </nav>
  )
}

export default Navbar;