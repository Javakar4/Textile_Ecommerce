import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../../hooks/useApp";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useWishlist } from "../../hooks/useWishlist";
import { useCategoryServices } from "../../hooks/useCategoryServices";


function Navbar() {
    const { useCategories } = useCategoryServices();
    const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
    const categoriesData = categories;
    const [open, setOpen] = useState(false);
    const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false)
    const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
    const { assets } = useApp();
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const { user, setShowUserLogin, logout: contextLogout } = useAuth();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    const logout = async () => {
        contextLogout();
        navigate('/')
    }

    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchText.trim()) return;

        navigate(`/all-collections?search=${encodeURIComponent(searchText)}`);
        // setSearchText("");
        setOpen(false);
    };

    return (
        <nav className="fixed font-semibold top-0 left-0 w-full z-50 border-b border-gray-300 bg-white/90 backdrop-blur-md transition-all">
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-4">


            {/* LEFT: Logo */}
            <div className="flex items-center">
                <NavLink to='/'>
                    <img className="text-3xl h-13 font-extrabold tracking-wide text-amber-700 hover:text-amber-700-dull drop-shadow-lg uppercase select-none"
                         src="/logoN2.png"
                         alt="Logo"
                    />
                </NavLink>
            </div>

            {/* CENTER: Desktop Menu Links */}
            <div className="hidden lg:flex items-center justify-center gap-4 lg:gap-8 uppercase text-sm lg:text-base whitespace-nowrap">
                <NavLink to="/" className="hover:text-amber-700 transition duration-200 font-semibold">
                    Home
                </NavLink>

                {/* Desktop: Collections */}
                <div className="group relative cursor-pointer">
                    <div className="flex items-center gap-1 hover:text-amber-700 transition duration-200 font-semibold">
                        <span>Collections</span>
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-40">
                        <div className="bg-white shadow-xl border border-gray-100 py-2 w-56 rounded-xl text-sm flex flex-col overflow-hidden">
                            {isLoadingCategories ? (
                                <div className="px-5 py-3 text-stone-500">Loading...</div>
                            ) : categoriesData.filter(cat => !cat.parentId).length > 0 ? (
                                categoriesData.filter(cat => !cat.parentId).map((cat) => (
                                    <NavLink
                                        key={cat._id}
                                        to={`/all-collections?category=${cat.slug}`}
                                        className="block px-5 py-3 hover:bg-amber-50 hover:text-amber-700 transition-colors font-medium"
                                    >
                                        {cat.name}
                                    </NavLink>
                                ))
                            ) : (
                                <div className="px-5 py-3 text-stone-500">No collections</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Desktop: Categories */}
                <div className="group relative cursor-pointer">
                    <div className="flex items-center gap-1 hover:text-amber-700 transition duration-200 font-semibold">
                        <span>Categories</span>
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-40">
                        <div className="bg-white shadow-xl border border-gray-100 py-2 w-56 rounded-xl text-sm flex flex-col overflow-hidden">
                            {isLoadingCategories ? (
                                <div className="px-5 py-3 text-stone-500">Loading...</div>
                            ) : categoriesData.length > 0 ? (
                                categoriesData.map((cat) => (
                                    <NavLink
                                        key={cat._id}
                                        to={`/all-collections?category=${cat._id}`}
                                        className="block px-5 py-3 hover:bg-amber-50 hover:text-amber-700 transition-colors font-medium"
                                    >
                                        {cat.name}
                                    </NavLink>
                                ))
                            ) : (
                                <div className="px-5 py-3 text-stone-500">No categories</div>
                            )}
                        </div>
                    </div>
                </div>

                <NavLink to="/about" className="hover:text-amber-700 transition duration-200 font-semibold">
                    About
                </NavLink>
                <NavLink to="/contact" className="hover:text-amber-700 transition duration-200 font-semibold">
                    Contact
                </NavLink>
            </div>

            {/* RIGHT: Actions (Search, Cart, Profile) & Mobile Toggle */}
            <div className="flex items-center gap-4 lg:gap-6">
                
                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-4 lg:gap-6">
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full"
                    >
                        <input
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="py-1.5 w-32 xl:w-36 bg-transparent outline-none placeholder-gray-500"
                            type="text"
                            placeholder="Search products"
                        />
                        <button type="submit">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" />
                                <path d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                                    stroke="#7A7B7D"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </form>

                    <NavLink className="relative cursor-pointer" onClick={() => navigate('/cart')} to={'/cart'}>
                        <svg width="18" height="18" viewBox="0 0 14 14" fill="none" className="text-amber-700" xmlns="http://www.w3.org/2000/svg">
                            <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <button className="absolute -top-2 -right-3 text-xs text-black bg-amber-700 w-[18px] h-[18px] rounded-full">{cartItems.length}</button>
                    </NavLink>

                    {!user ? (
                        <button onClick={() => navigate("/auth")}
                            className="cursor-pointer px-6 xl:px-8 py-2 bg-amber-700 hover:bg-amber-700-dull transition text-white rounded-full">
                            Login
                        </button>
                    ) : (
                        <div className="relative group">
                            <img src={assets.profileIcon} alt="ProfileIcon" className="w-10 cursor-pointer" />
                            <div className="absolute top-full right-0 pt-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-40">
                                <ul className="bg-white shadow-xl border border-gray-100 py-2 w-48 rounded-xl text-sm flex flex-col overflow-hidden text-left">
                                    <NavLink
                                        to="profile"
                                        className="block px-5 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors font-medium"
                                    >
                                        Profile
                                    </NavLink>
                                    <NavLink
                                        to="my-orders"
                                        className="block px-5 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors font-medium"
                                    >
                                        My Orders
                                    </NavLink>
                                    <NavLink
                                        to="wishlist"
                                        className="block px-5 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors font-medium"
                                    >
                                        Wishlist
                                    </NavLink>
                                    <NavLink
                                        onClick={logout}
                                        className="block px-5 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-medium cursor-pointer"
                                    >
                                        Logout
                                    </NavLink>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="lg:hidden">
                    {/* Menu Icon SVG */}
                    <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="21" height="1.5" rx=".75" fill="#426287" />
                        <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                        <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="bg-white absolute top-full left-0 w-full max-h-[calc(100vh-64px)] overflow-y-auto text-black shadow-lg py-5 pb-10 flex flex-col gap-5 px-6 text-lg lg:hidden z-[100] animate-fadeSlide border-t border-gray-200">
                    <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-amber-700 transition duration-200">
                        Home
                    </NavLink>

                    {/* Mobile: Collections */}
                    <div>
                        <button
                            onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                            className="w-full flex justify-between items-center hover:text-amber-700"
                        >

                            <span>Collections</span>
                            <svg
                                width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
                                style={{
                                    transition: 'transform 0.25s ease',
                                    transform: mobileCollectionsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    verticalAlign: 'middle'
                                }}
                            >
                                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                            </svg>
                        </button>

                        {mobileCollectionsOpen && (
                            <div className="flex flex-col mt-2 ml-4 gap-2 animate-fadeSlide text-base ">
                                {isLoadingCategories ? (
                                    <div className="text-stone-500">Loading...</div>
                                ) : categoriesData.filter(cat => !cat.parentId).length > 0 ? (
                                    categoriesData.filter(cat => !cat.parentId).map((cat) => (
                                        <NavLink
                                            key={cat._id}
                                            to={`/all-collections?category=${cat.slug}`}
                                            onClick={() => setOpen(false)}
                                            className={'hover:text-amber-700'}
                                        >
                                            {cat.name}
                                        </NavLink>
                                    ))
                                ) : (
                                    <div className="text-stone-500">No collections</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile: Categories */}
                    <div>
                        <button
                            onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                            className="w-full flex justify-between items-center hover:text-amber-700"
                        >
                            <span>Categories</span>
                            <svg
                                width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
                                style={{
                                    transition: 'transform 0.25s ease',
                                    transform: mobileCategoriesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    verticalAlign: 'middle'
                                }}
                            >
                                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                            </svg>
                        </button>

                        {mobileCategoriesOpen && (
                            <div className="flex flex-col mt-2 ml-4 gap-2 animate-fadeSlide text-base">
                                {isLoadingCategories ? (
                                    <div className="text-stone-500">Loading...</div>
                                ) : categoriesData.length > 0 ? (
                                    categoriesData.map((cat) => (
                                        <NavLink
                                            key={cat._id}
                                            to={`/all-collections?category=${cat._id}`}
                                            onClick={() => setOpen(false)}
                                            className={'hover:text-amber-700'}
                                        >
                                            {cat.name}
                                        </NavLink>
                                    ))
                                ) : (
                                    <div className="text-stone-500">No categories</div>
                                )}
                            </div>
                        )}
                    </div>

                    <NavLink to="/about" className={'hover:text-amber-700'} onClick={() => setOpen(false)}>About</NavLink>
                    <NavLink to="/contact" className={'hover:text-amber-700'} onClick={() => setOpen(false)}>Contact</NavLink>
                    {user && <NavLink to="/profile" className={'hover:text-amber-700'} onClick={() => setOpen(false)}>Profile</NavLink>}
                    {user && <NavLink to="/wishlist" className={'hover:text-amber-700'} onClick={() => setOpen(false)}>WishList</NavLink>}
                    {user && <NavLink to="/my-orders" className={'hover:text-amber-700'} onClick={() => setOpen(false)}>My Orders</NavLink>}


                    {/* Mobile Cart */}
                    <div className="relative flex items-center gap-3 cursor-pointer py-2 hover:text-amber-700" onClick={() => setOpen(false)}>
                        <span className="text-3xl">🛒</span>
                        <span className="absolute -top-1 left-5 text-xs w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-md">
                            {cartItems.length}
                        </span>
                        <span className="text-lg">Cart</span>
                    </div>

                    {!user ? (
                        <button onClick={() => { setOpen(false); navigate("/auth") }} className="cursor-pointer px-6 py-2 hover:bg-amber-700-dull bg-amber-700 transition text-white rounded-full shadow-md">
                            Login
                        </button>
                    ) : (
                        <button onClick={() => { logout(); setOpen(false) }} className="cursor-pointer px-6 py-2 hover:bg-amber-700-dull bg-amber-700 transition text-white rounded-full shadow-md">
                            LogOut
                        </button>
                    )}
                </div>
            )}

        </div>
        </nav>
    );
}

export default Navbar;
