import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-auto p-5">
        <h3>OOPS! PAGE NOT FOUND</h3>
        <div className="relative flex flex-col items-center justify-center">
          <h1 className="my-5 text-9xl font-black text-neutral-700">404</h1>
        </div>
        <div className="flex w-[421px] flex-col items-center justify-center">
          <h2 className="text-center font-normal p-5">
            WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND
          </h2>
        </div>
      </div>
    </>
  );
};

export default NotFound;
