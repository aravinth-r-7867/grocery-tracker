import { useGroceries } from './hooks/useGroceries';
import GroceryItem from './components/GroceryItem';
import AddGroceryForm from './components/AddGroceryForm';

function App() {
  const { groceries, loading, error, addGrocery } = useGroceries();

  return (
    <div className="container">
      <h1>Hi Rudhra! here is your grocery list tracker</h1>
      
      {loading && <div className="status-msg">Loading groceries...</div>}
      
      {error && <div className="status-msg" style={{ color: '#f87171' }}>{error}</div>}
      
      {!loading && !error && (
        <div className="grocery-list">
          {groceries.length === 0 ? (
            <div className="status-msg">No groceries yet. Add some!</div>
          ) : (
            groceries.map((item) => (
              <GroceryItem key={item._id} grocery={item} />
            ))
          )}
        </div>
      )}

      <AddGroceryForm onAdd={addGrocery} />
    </div>
  );
}

export default App;
