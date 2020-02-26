import React from 'react'
import Avatar from './common/Avatar'

export default function CurrentConversationHeader ({ user }) {
    return <div className="p-3 border-b-2 border-primary-100 sticky top-0 z-10 bg-white">
        <div className="relative flex justify-between">
            <div className="flex items-center">
                <div className="mr-3">
                    <Avatar user={user} className="w-8 h-8" src="https://images.pexels.com/photos/3569566/pexels-photo-3569566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                </div>
                <div>
                    <span className="text-sm font-semibold">
                        {user.username}
                    </span>
                    &nbsp;
                    <span className="text-sm">
                        @{user.username}
                    </span>
                </div>
            </div>
            <div className="flex items-center text-primary-500">
                <button className="rounded-full h-8 w-8 flex justify-center items-center mr-2 bg-primary-100 hover:bg-white hover:shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-video"><polygon points="23 7 16 12 23 17 23 7" /><rect x={1} y={5} width={15} height={14} rx={2} ry={2} /></svg>
                </button>
                <button className="rounded-full h-8 w-8 flex justify-center items-center mr-2 bg-primary-100 hover:bg-white hover:shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </button>
                <button className="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx={12} cy={12} r={1} /><circle cx={12} cy={5} r={1} /><circle cx={12} cy={19} r={1} /></svg>
                </button>
            </div>
        </div>
    </div>
}