import React from 'react';


const TabSwitchers =({activeTab, tabSwitchHandler})=>{

    return(
        <div className="flex bg-[#041e18]/70 p-1 rounded-xl border border-emerald-500/15 w-fit animate-fade-in">
        <button 
          onClick={() =>  tabSwitchHandler('products')} 
          className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
            activeTab === 'products' 
              ? 'bg-[#d4af37] text-emerald-950 font-bold shadow' 
              : 'text-emerald-100/60 hover:text-white'
          }`}
        >
          📦 Products
        </button>
        <button 
          onClick={() => tabSwitchHandler('categories')} 
          className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
            activeTab === 'categories' 
              ? 'bg-[#d4af37] text-emerald-950 font-bold shadow' 
              : 'text-emerald-100/60 hover:text-white'
          }`}
        >
          📂 Categories
        </button>
      </div>
    )
}

export default TabSwitchers;