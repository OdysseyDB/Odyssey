export async function getServerSideProps(context) {
  const { genreSlug } = context.query;
  return {
    redirect: {
      permanent: true,
      destination: `/genre/${genreSlug}/1`,
    },
  };
}

export default function GenreIndex() {
  return <p>You are in an wrong page lol</p>;
}
