
const UserLogo = ({ css = "w-36 absolute -left-5 -top-10" }) => {
  return (
    <img
      className={`z-30 ${css}`}
      src="/images/self/sawari.png"
      alt="User Logo"
    />
  );
};

export default UserLogo;
