import Header from "../components/Header";
import SingleStep from "../components/SingleStep";
import Link from "next/link";

export default function Error() {
  return (
    <main>
      <Header first />
      <SingleStep
        isFirst
        prefix="Sorry the page you're looking for was not found."
      >
        <h1>404</h1>
        <h3>Page not found</h3>
        <Link href="/">
          <a>Back to homepage</a>
        </Link>
      </SingleStep>
      <style jsx>{`
        main {
          display: block;
          height: 88vh;
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }
      `}</style>
    </main>
  );
}
