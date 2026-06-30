import React from 'react';

export default function UserAddresses({ user }) {
  const addresses = user.addresses || [];

  return (
    <div className="glass rounded-2xl p-6 shadow-xl space-y-4">
      <h3 className="text-lg font-bold font-serif text-white border-b border-[#d4af37]/10 pb-2 flex items-center gap-2">
        <span>📍</span> Saved Addresses
      </h3>
      
      {addresses.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-emerald-100/40 text-xs sm:text-sm">No saved addresses on file.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address, idx) => (
            <div key={idx} className="p-4 bg-[#031d17]/40 border border-emerald-500/10 rounded-xl space-y-1">
              <span className="block font-bold text-white text-xs">{address.name}</span>
              <span className="block text-emerald-100/70 text-xs leading-relaxed">
                {address.address}
              </span>
              <span className="block text-emerald-100/70 text-xs">
                {address.city}, {address.state} - {address.pincode}
              </span>
              <span className="block font-mono text-[#d4af37] text-[10px] mt-2">
                📞 {address.phone}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
