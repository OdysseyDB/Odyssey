import "./HProduct.scss";
import Link from "next/link";

export default function HProduct({ gameData }) {
  return (
    <div className="HProduct">
      <div className="HProduct__left">
        <div
          style={{
            backgroundImage: `url(https:${gameData.CoverImage[0].url.replace(
              "t_thumb",
              "t_cover_big"
            )})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
      <div className="HProduct__right">
        <div className="HProduct__rightTop">
          <h2>
            <Link href={`/game/${gameData.slug}`}>
              <a>{gameData.name}</a>
            </Link>
          </h2>
          <span> ({new Date(gameData.created_at).toDateString()})</span>
          <p>{gameData.summary}</p>
          <div className="HProduct__rightTop--ageRating">
            {gameData.ageRatingDesc.length !== 0 && (
              <>
                <label>Age Rating</label>
                <ul>
                  {gameData.ageRatingDesc.map((ageRating, index) => (
                    <li key={index}>
                      {ageRating.AgeRatingCategory &&
                      ageRating.AgeRatingCategory !== "NA"
                        ? ` ${index !== 0 ? "・" : ""} (${
                            ageRating.AgeRatingCategory.age_limit
                          }) `
                        : " "}
                      {ageRating.description}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="HProduct__rightBottom">
          {gameData.platform.map((platform, index) => (
            <a href={platform.url} key={index}>
              {platform.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
