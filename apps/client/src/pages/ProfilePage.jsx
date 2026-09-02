import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProfileServices } from '../hooks/useProfileServices';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPlus, FaTrash, FaCheck, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toastUtils from "../utils/toastUtils";

const ProfilePage = () => {
    const { user: authUser, logout } = useAuth();
    const { 
        addresses, 
        userProfile,
        isLoadingProfile, 
        addAddress, 
        removeAddress, 
        setDefaultAddress,
        isAddingAddress
    } = useProfileServices();
    
    const navigate = useNavigate();
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: "",
        phone: "",
        address: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        isDefault: false
    });

    // Use profile data from API if available, otherwise fallback to auth context
    const user = userProfile || authUser;

    const handleLogout = () => {
        logout();
        navigate('/')
        toastUtils.success("Logged out successfully");
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            const res = await addAddress(newAddress);
            if (res && (res.ok || res.success)) {
                setShowAddAddress(false);
                setNewAddress({
                    name: "",
                    phone: "",
                    address: "",
                    landmark: "",
                    city: "",
                    state: "",
                    pincode: "",
                    country: "India",
                    isDefault: false
                });
            }
        } catch (error) {
            // Error handled by hook toast
        }
    };

    const handleSetDefaultAddress = async (id) => {
        await setDefaultAddress(id);
    };

    const handleRemoveAddress = async (id) => {
        await removeAddress(id);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                <FaUser className="text-[var(--color-primary)]" /> My Profile
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* User Info Section */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-gradient-to-br from-white to-amber-50/30 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border border-amber-100">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-700 mb-4 shadow-md hover:scale-105 transition-transform duration-300">
                            <img src={user?.avatar || user?.image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} alt={user?.name} className="w-full h-full object-cover" />

                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{user?.name || "User"}</h2>
                        <p className="text-gray-500 text-sm mt-1">Member since {user?.joined || user?.createdAt ? new Date(user.joined || user.createdAt).toLocaleDateString() : "N/A"}</p>
                        
                        <div className="w-full mt-6 space-y-3 text-left">
                            <h3 className="text-lg font-semibold text-gray-700 border-b border-amber-700 pb-2">Personal Info</h3>
                            <div className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-colors">
                                <FaEnvelope className="text-amber-700" />
                                <span className="text-sm">{user?.email || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-colors">
                                <FaPhone className="text-amber-700" />
                                <span className="text-sm">{user?.phone || "N/A"}</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleLogout}
                            className="mt-8 w-full bg-red-50 text-amber-700 py-2.5 px-4 rounded-lg hover:bg-red-100 hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 font-medium border border-red-200"
                        >
                            <FaSignOutAlt /> Log Out
                        </button>
                    </div>
                </div>

                {/* Shipping Addresses Section */}
                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-amber-700" /> Shipping Addresses
                            </h2>
                            <button 
                                onClick={() => setShowAddAddress(!showAddAddress)}
                                className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-all duration-200 font-medium flex items-center gap-2 shadow-sm hover:shadow-md"
                            >
                                <FaPlus /> Add New
                            </button>
                        </div>

                        {showAddAddress && (
                            <form onSubmit={handleAddAddress} className="bg-gradient-to-br from-amber-50/50 to-white p-5 rounded-xl mb-6 border-2 border-amber-700 shadow-sm animate-in fade-in slide-in-from-top-4">
                                <h3 className="font-semibold mb-4 text-gray-800 text-lg">Add New Address</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input required placeholder="Full Name" className="border-2 border-gray-200 p-2.5 rounded-lg focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all" value={newAddress.name} onChange={e => setNewAddress({...newAddress, name: e.target.value})} />
                                    <input required placeholder="Phone Number" className="border-2 border-gray-200 p-2.5 rounded-lg focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all" value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} />
                                    <input required placeholder="Address Line" className="border-2 border-gray-200 p-2.5 rounded-lg col-span-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all" value={newAddress.address} onChange={e => setNewAddress({...newAddress, address: e.target.value})} />
                                    <input placeholder="Landmark" className="border-2 border-gray-200 p-2.5 rounded-lg focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all" value={newAddress.landmark} onChange={e => setNewAddress({...newAddress, landmark: e.target.value})} />
                                    <input required placeholder="City" className="border-2 border-gray-200 p-2.5 rounded-lg focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} />
                                    <input required placeholder="State" className="border-2 border-gray-200 p-2.5 rounded-lg focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all" value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} />
                                    <input required placeholder="Pincode" className="border-2 border-gray-200 p-2.5 rounded-lg focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all" value={newAddress.pincode} onChange={e => setNewAddress({...newAddress, pincode: e.target.value})} />
                                    <input required placeholder="Country" className="border-2 border-gray-200 p-2.5 rounded-lg focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all" value={newAddress.country} onChange={e => setNewAddress({...newAddress, country: e.target.value})} />
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <input type="checkbox" id="defaultAddr" checked={newAddress.isDefault} onChange={e => setNewAddress({...newAddress, isDefault: e.target.checked})} className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500" />
                                    <label htmlFor="defaultAddr" className="text-sm text-gray-600 font-medium">Set as default address</label>
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit" disabled={isAddingAddress} className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md disabled:bg-gray-400">
                                        {isAddingAddress ? "Saving..." : "Save Address"}
                                    </button>
                                    <button type="button" onClick={() => setShowAddAddress(false)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium">Cancel</button>
                                </div>
                            </form>
                        )}

                        <div className="space-y-4">
                            {isLoadingProfile ? (
                                <p className="text-gray-500 text-center py-4">Loading profile...</p>
                            ) : addresses.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No addresses saved yet.</p>
                            ) : (
                                addresses.map((addr) => (
                                    <div key={addr._id} className={`border rounded-lg p-4 relative transition-all ${addr.isDefault ? 'border-amber-700 bg-amber-50' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
                                        {addr.isDefault && (
                                            <span className="absolute top-2 right-2 bg-amber-700 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                                <FaCheck size={10} /> Default
                                            </span>
                                        )}
                                        <div className="pr-16">
                                            <h4 className="font-bold text-gray-800">{addr.name} <span className="text-gray-500 font-normal text-sm ml-2">{addr.phone}</span></h4>
                                            <p className="text-gray-600 text-sm mt-1">
                                                {addr.address}, {addr.landmark && `${addr.landmark}, `} 
                                                {addr.city}, {addr.state} - {addr.pincode}, {addr.country}
                                            </p>
                                        </div>
                                        <div className="absolute bottom-4 right-4 flex gap-2">
                                            {!addr.isDefault && (
                                                <button onClick={() => handleSetDefaultAddress(addr._id)} className="text-sm text-amber-600 hover:text-amber-700 font-medium hover:underline">
                                                    Set Default
                                                </button>
                                            )}
                                            <button onClick={() => handleRemoveAddress(addr._id)} className="text-red-400 hover:text-red-600 ml-2" title="Remove Address">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
