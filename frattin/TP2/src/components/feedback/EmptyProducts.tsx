import "./EmptyProducts.css"

export default function EmptyProducts() {
  return (
    <div className="app-content empty-container">
      <div className="products-container empty-message">
        <h2>No products found 😔</h2>
        <p>Try adjusting your filters or search for something else.</p>
      </div>
    </div>
  );
}
