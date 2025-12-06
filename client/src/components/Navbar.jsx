import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UseAppContext } from "../context/AppContext";

function Navbar() {
    const [open, setOpen] = useState(false);
    const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState()
    const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState()
    const { navigate, user, setUser, setShowUserLogin, assets } = UseAppContext()

    const logout = async () => {
        setUser(null);
        navigate('/')
    }

    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white/90 backdrop-blur-md transition-all">


            <NavLink to='/'>
                <h2 className="text-3xl font-extrabold tracking-wide text-amber-700 hover:text-amber-700-dull drop-shadow-lg uppercase select-none">Textile</h2>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8 uppercase">
                <NavLink to="/" className="hover:text-amber-700 transition duration-200">
                    Home
                </NavLink>

                {/* Desktop: Collections */}
                {/* Desktop: Collections */}
                <div className="group relative cursor-pointer">
                    <div className="flex items-center hover:text-amber-700 transition duration-200">
                        <span>Collections</span> ▾
                    </div>

                    <div className="hidden group-hover:block absolute top-6  bg-white shadow border border-gray-200 py-2 w-40 rounded-md text-sm z-40">
                        <NavLink
                            to="/collections/men"
                            className="block px-4 py-2 hover:bg-gray-100 hover:text-amber-700"
                        >
                            Men&apos;s Collections
                        </NavLink>

                        <NavLink
                            to="/collections/kids"
                            className="block px-4 py-2 hover:bg-gray-100 hover:text-amber-700"
                        >
                            Kid&apos;s Collections
                        </NavLink>
                    </div>
                </div>

                {/* Desktop: Categories */}
                <div className="group relative cursor-pointer">
                    <div className="flex items-center hover:text-amber-700 transition duration-200">
                        <span>Categories</span> ▾
                    </div>

                    <div className="hidden group-hover:block absolute top-6 bg-white shadow border border-gray-200 py-2 w-40 rounded-md text-sm z-40">
                        <NavLink
                            to="/categories/category1"
                            className="block px-4 py-2 hover:bg-gray-100 hover:text-amber-700"
                        >
                            Category 1
                        </NavLink>

                        <NavLink
                            to="/categories/category2"
                            className="block px-4 py-2 hover:bg-gray-100 hover:text-amber-700"
                        >
                            Category 2
                        </NavLink>

                        <NavLink
                            to="/categories/category3"
                            className="block px-4 py-2 hover:bg-gray-100 hover:text-amber-700"
                        >
                            Category 3
                        </NavLink>
                    </div>
                </div>


                <NavLink to="/about" className="hover:text-amber-700 transition duration-200">
                    About
                </NavLink>
                <NavLink to="/contact" className="hover:text-amber-700 transition duration-200">
                    Contact
                </NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" className="text-amber-700" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <button className="absolute -top-2 -right-3 text-xs text-black bg-amber-700 w-[18px] h-[18px] rounded-full">3</button>
                </div>

                {!user ? (
                    <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-amber-700 hover:bg-amber-700-dull transition text-white rounded-full">
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <img src={assets.profileIcon} alt="ProfileIcon" className="w-10" />
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                            <li onClick={() => navigate('profile')} className="p-1.5 pl-3 hover:bg-amber-700/10 cursor-pointer">Profile</li>
                            <li onClick={() => navigate('my-orders')} className="p-1.5 pl-3 hover:bg-amber-700/10 cursor-pointer">My Orders</li>
                            <li onClick={() => navigate('wishlist')} className="p-1.5 pl-3 hover:bg-amber-700/10 cursor-pointer">WishList</li>
                            <li onClick={logout} className="p-1.5 pl-3 hover:bg-amber-700/10 cursor-pointer">LogOut</li>
                        </ul>
                    </div>
                )}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            {open && (
                <div className="absolute top-[60px] left-0 w-full text-black shadow-lg py-5 flex flex-col gap-5 px-6 text-lg sm:hidden z-40 animate-fadeSlide border-t border-[--color-secondary]/40 backdrop-blur-md">
                    <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-amber-700 transition duration-200">
                        Home
                    </NavLink>

                    {/* Mobile: Collections */}
                    <div>
                        <button
                            onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                            className="w-full flex justify-between items-center hover:text-amber-700"
                        >
                            Collections ▾
                        </button>

                        {mobileCollectionsOpen && (
                            <div className="flex flex-col mt-2 ml-4 gap-2 animate-fadeSlide text-base ">
                                <NavLink to="/collections/men" onClick={() => setOpen(false)} className={'hover:text-amber-700'}>Men's Collections</NavLink>
                                <NavLink to="/collections/kids" onClick={() => setOpen(false)} className={'hover:text-amber-700'}>Kid's Collections</NavLink>
                            </div>
                        )}
                    </div>

                    {/* Mobile: Categories */}
                    <div>
                        <button
                            onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                            className="w-full flex justify-between items-center hover:text-amber-700"
                        >
                            Categories ▾
                        </button>

                        {mobileCategoriesOpen && (
                            <div className="flex flex-col mt-2 ml-4 gap-2 animate-fadeSlide text-base">
                                <NavLink to="/categories/category1" onClick={() => setOpen(false)} className={'hover:text-amber-700'}>Category 1</NavLink>
                                <NavLink to="/categories/category2" onClick={() => setOpen(false)} className={'hover:text-amber-700'}>Category 2</NavLink>
                                <NavLink to="/categories/category3" onClick={() => setOpen(false)} className={'hover:text-amber-700'}>Category 3</NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink to="/about" className={'hover:text-amber-700'} onClick={() => setOpen(false)}>About</NavLink>
                    <NavLink to="/contact" className={'hover:text-amber-700'} onClick={() => setOpen(false)}>Contact</NavLink>
                    {user && <NavLink to="/contact" className={'hover:text-amber-700'} onClick={() => setOpen(false)}>Profile</NavLink>}
                    {user && <NavLink to="/contact" className={'hover:text-amber-700'} onClick={() => setOpen(false)}>WishList</NavLink>}
                    {user && <NavLink to="/contact" className={'hover:text-amber-700'} onClick={() => setOpen(false)}>My Orders</NavLink>}


                    {/* Mobile Cart */}
                    <div className="relative flex items-center gap-3 cursor-pointer py-2 hover:text-amber-700" onClick={() => setOpen(false)}>
                        <span className="text-3xl">🛒</span>
                        <span className="absolute -top-1 left-5 text-xs w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-md">
                            3
                        </span>
                        <span className="text-lg">Cart</span>
                    </div>

                    {!user ? (
                        <button onClick={() => { setOpen(false); setShowUserLogin(true) }} className="cursor-pointer px-6 py-2 hover:bg-amber-700-dull bg-amber-700 transition text-white rounded-full shadow-md">
                            Login
                        </button>
                    ) : (
                        <button onClick={() => { logout(); setOpen(false) }} className="cursor-pointer px-6 py-2 hover:bg-amber-700-dull bg-amber-700 transition text-white rounded-full shadow-md">
                            LogOut
                        </button>
                    )}
                </div>
            )}

        </nav>
    );
}

export default Navbar;
