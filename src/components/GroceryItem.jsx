import { useMemo } from 'react';

const CARD_COLORS = [
  'yellow', 'red', 'orange', 'green', 'teal', 
  'blue', 'purple', 'pink', 'brown', 'gray'
];

function GroceryItem({ grocery, onDelete }) {
  // Assign a consistent color based on the item's ID
  const cardColor = useMemo(() => {
    if (!grocery._id) return 'yellow';
    // Use the ID to generate a consistent color index
    const hash = grocery._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return CARD_COLORS[hash % CARD_COLORS.length];
  }, [grocery._id]);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(grocery._id);
    }
  };

  return (
    <div className={`grocery-item color-${cardColor}`}>
      <div className="grocery-info">
        <h3>{grocery.name}</h3>
        <span className="grocery-meta">
          {grocery.quantity} {grocery.unit}
        </span>
      </div>
      <div className="grocery-actions">
        <input type="checkbox" className="grocery-checkbox" />
        <button 
          className="delete-btn" 
          onClick={handleDelete}
          aria-label="Delete item"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default GroceryItem;
