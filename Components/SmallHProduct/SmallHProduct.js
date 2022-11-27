import Link from "next/link";
import "./SmallHProduct.scss";

function SmallHProduct({ product }) {
  return (
    <div className="SmallHProduct">
      <div
        className="SmallHProduct__image"
        style={{
          backgroundImage: `url(${product.CoverImage[0].url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          
        }}
      />
      <div className="SmallHProduct__content">
        <Link href={`/game/${product.slug}`}>
          <a>
            <h2>{product.name}</h2>
          </a>
        </Link>
        <span>{new Date(product.created_at).toDateString()}</span>
      </div>
    </div>
  );
}

export default SmallHProduct;
