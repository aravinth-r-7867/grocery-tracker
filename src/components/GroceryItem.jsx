function GroceryItem({ grocery }) {
  return (
    <div className="grocery-item">
      <div className="grocery-info">
        <h3>{grocery.name}</h3>
        <span className="grocery-meta">
          {grocery.quantity} {grocery.unit}
        </span>
      </div>
      <div className="grocery-actions">
        {/* Actions like delete/check can go here in future */}
        <input type="checkbox" className="grocery-checkbox" />
      </div>
    </div>
  );
}

export default GroceryItem;
