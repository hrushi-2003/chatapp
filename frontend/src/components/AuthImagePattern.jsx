const AuthImagePattern = ({ title, subtitle, authImage }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 ">
      <div className="max-w-md text-center ">
        <div className="flex justify-center h-full">
          <img src={authImage} alt="auth" className="rounded-2xl h-96 " />
        </div>
        <br />
        <h2 className="text-2xl font-bold mb-4 text-blue-600">{title}</h2>
        {title !== "Be like sanji" ? (
          <p className="text-base-content/60">{subtitle}</p>
        ) : (
          <p className="text-base-content/60 text-xl ">{subtitle}</p>
        )}
      </div>
    </div>
  );
};
export default AuthImagePattern;
