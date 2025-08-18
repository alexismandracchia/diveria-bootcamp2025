import "./SkeletonProducts.css";

export default function SkeletonProducts() {
  return (
      <div className="products-container">
        {[...Array(4)].map((_, i) => (
          <div className="product-card" key={i}>
            <div className="skeleton skeleton-img"></div>
            <div className="text-content">
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-price"></div>
            </div>
          </div>
        ))}
      </div>
  );
}
