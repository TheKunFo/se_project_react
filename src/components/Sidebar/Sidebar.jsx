import './Sidebar.css';


export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar__profile">
                <img
                    alt="Profile avatar"
                    className="sidebar__avatar"
                    src="https://storage.googleapis.com/a1aa/image/a83da40a-5b97-4e09-64b6-cf7892ea912b.jpg"
                    width="32"
                    height="32"
                    draggable="false"
                />
                <span>Terrence Tegegne</span>
            </div>
        </div>
    )
}