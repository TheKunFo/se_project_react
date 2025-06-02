import './ItemDelete.css'
import { deleteItems } from '../../utils/itemsApi'

export default function ItemDelete({ 
    id,
    items,
    setItems,
    onClose,
    onDelete,
}) {
    const handleDeleteItem = () => {
        deleteItems(id)
            .then((res) => {
                if(res){
                    const newRow = items.filter(item => item._id !== id)
                    setItems(newRow)
                }
            }).catch((err) => {
                console.error("Error creating item:", err);
            }).finally(() => {
                onDelete(false)
            })
        
    }

    const handleCancelItem = () => {
        onClose(true)
        onDelete(false)
    }
    return (
        <div className="modal__delete">
            <div className="modal__delete-content">
                <span className='modal__delete-title'>Are you sure you want to delete this item? <br/>
                    This action is irreversible.</span>
                <button onClick={handleDeleteItem} className='modal__delete-button'>Yes, delete item</button>
                <button onClick={handleCancelItem} className='modal__delete-cancel'>Cancel</button>
            </div>
        </div>
    )
}