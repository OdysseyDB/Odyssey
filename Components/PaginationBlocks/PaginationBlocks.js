import Link from "next/link";
import { useEffect, useRef } from "react";
import "./PaginationBlocks.scss";

function PaginationBlocks({ maxBlocks, currentPage, slug, pageType }) {
  const activeRef = useRef(null);

  // useEffect(() => {
  //   if (activeRef.current) {
  //     activeRef.current.scrollIntoView();
  //   }
  // }, [currentPage,activeRef]);

  return (
    <div className="PaginationBlocks">
      <Link
        href={
          Number(currentPage) === 1
            ? `/${pageType}/${slug}/${1}`
            : `/${pageType}/${slug}/${Number(currentPage) - 1}`
        }
      >
        <a
          className="PaginationBlocks__left"
          data-icon={String.fromCharCode(58090)}
        >
          <p>Previous</p>
        </a>
      </Link>
      <ul className="PaginationBlocks__middle">
        {[...Array(maxBlocks)].map((_, index) => (
          <li
            key={index}
            ref={`${index + 1}` === currentPage ? activeRef : null}
            className={`${
              currentPage === `${index + 1}`
                ? "PaginationBlocks__middle--active"
                : ""
            }`}
          >
            <Link href={`/${pageType}/${slug}/${index + 1}`}>
              <a
                className={`${
                  currentPage === `${index + 1}`
                    ? "PaginationBlocks__middle--active"
                    : ""
                }`}
              >
                {index + 1}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={
          Number(currentPage) === maxBlocks
            ? `/${pageType}/${slug}/${maxBlocks}`
            : `/${pageType}/${slug}/${Number(currentPage) + 1}`
        }
      >
        <a
          className="PaginationBlocks__right"
          data-icon={String.fromCharCode(58090)}
        >
          <p>Next</p>
        </a>
      </Link>
    </div>
  );
}

export default PaginationBlocks;
