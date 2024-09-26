import '../Styling/UpperMenu.css'


export function ProfilePicture(username: string) {
    return (
        <div className="profile"><a>{username}</a></div>
    )
}