import API from '@configs/api'
import { AutoComplete, Input } from 'antd'
import { useEffect, useState } from 'react'

type User = {
    id: string
}

const SearchUser: React.FC<{
    onSelect: (user: User) => any
}> = (props) => {
    const [key, setKey] = useState('')
    const [users, setUser] = useState<User[]>([])
    useEffect(() => {
        let isWatching = true
        ;(async () => {
            const users: User[] = (
                await API.searchUser({
                    search: key,
                })
            ).data
            isWatching && setUser(users)
        })()

        return () => {
            isWatching = false
        }
    }, [key])

    return (
        <AutoComplete
            onSearch={(key) => {
                setKey(key)
            }}
            onSelect={(value) => {
                props.onSelect(users.find((user) => user.id === value))
            }}
            options={users.map((user) => ({
                value: user.id,
            }))}
            placeholder="Search"
            style={{
                width: '100%',
            }}
        />
    )
}

export default SearchUser
