import { useState } from 'react';

function AddGroceryForm({ onAdd }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('pcs');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quantity) return;

    setIsSubmitting(true);
    try {
      await onAdd({ name, quantity, unit });
      setName('');
      setQuantity('');
      setUnit('pcs');
    } catch (error) {
      console.error("Failed to add grocery", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-grocery-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Item name (e.g., Milk)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-row">
        <input
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          min="1"
          className="form-input qty-input"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="form-select"
        >
          <option value="pcs">pcs</option>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="ltr">ltr</option>
          <option value="pkt">pkt</option>
        </select>
      </div>
      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Item'}
      </button>
    </form>
  );
}

export default AddGroceryForm;
