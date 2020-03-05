import React from 'react'
import Avatar from './common/Avatar'
import { useSelector } from 'react-redux'
import MyEvent from '../services/MyEvent'

export default function ConversationItem (props) {
    const { item } = props
    const user = useSelector(state => state.account.user)
    const receiver = () => {
        return item.participants.filter(u => u.id !== user.id)[0]
    }

    return <div
            className="p-3 border-b border-primary-100 last:border-transparent hover:bg-primary-100 cursor-pointer"
            onClick={() => MyEvent.emit('open-conversation', item)}
        >
        <div className="flex items-center">
            <div className="mr-3">
                <Avatar className="h-8 w-8" user={receiver()} />
            </div>
            <div className="flex-grow">
                <div className="text-sm">
                    {receiver().username}
                </div>
            </div>
        </div>
    </div>
}