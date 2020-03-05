import React from 'react'

export default function SearchInput () {
    return <>
        <div className="flex items-center px-2 py-1 rounded-full border border-transparent focus-within:border-primary-200 bg-primary-100 focus-within:bg-white">
            <div className="mr-2 text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2="16.65" y2="16.65" /></svg>
            </div>
            <div className="flex-grow">
                <input className="bg-transparent w-full placeholder-primary-400" type="search" placeholder="search ..." />
            </div>
        </div>
    </> 
}