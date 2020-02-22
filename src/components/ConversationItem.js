import React from 'react'
import Avatar from './common/Avatar'

export default function ConversationItem (props) {
    const { item } = props

    return <div className="mx-3 py-3 border-b border-primary-100 last:border-transparent">
        <div className="flex">
            <div className="mr-3">
                <Avatar src={item.avatar} />
            </div>
            <div className="flex-grow">
                <div className="text-sm font-semibold">
                    {item.title}
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        {item.message.body}
                    </div>
                    <div className="text-xs text-gray-500">
                        {item.updated_at}
                    </div>
                </div>
            </div>
        </div>
    </div>
}