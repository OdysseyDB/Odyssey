
export async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/#login",
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/my/dashboard",
    },
  };
}

export default function MyIndex() {
  return (
    <main className="MyIndex">
      <div className="MyIndex__container">
        <h2> You have to login to see your data!</h2>
        <a href="#login" className="route--active">
          Login
        </a>
      </div>
    </main>
  );
}
