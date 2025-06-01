import './ToggleSwitch.css'

export default function ToggleSwitch({handleToggleSwitchChange}) {
    return (
        <label className="switch">
            <input type="checkbox" onChange={handleToggleSwitchChange} />
            <span className="slider">
                <span className="thumb-label">F</span> 
            </span>
        </label>
    );

}