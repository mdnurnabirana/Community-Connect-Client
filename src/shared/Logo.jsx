import logo from "../assets/logo.png";

const Logo = ({ height = 80, width = 80, showText = true }) => {
  return (
    <div className="flex justify-between gap-2 items-center">
      <img
        src={logo}
        alt="Logo"
        style={{ height: `${height}px`, width: `${width}px` }}
      />
      <div
        className={`${!showText ? "hidden" : "flex"} flex-col justify-between text-xl font-semibold text-shadow-xs text-shadow-primary`}
      >
        <h1 className="text-primary">Community</h1>
        <h1 className="text-secondary">Connect</h1>
      </div>
    </div>
  );
};

export default Logo;