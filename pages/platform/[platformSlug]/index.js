export async function getServerSideProps(context) {
  const { platformSlug } = context.query;
  return {
    redirect: {
      permanent: true,
      destination: `/platform/${platformSlug}/1`,
    },
  };
}

export default function GenreIndex() {
  return <p>You are in an wrong page lol</p>;
}
