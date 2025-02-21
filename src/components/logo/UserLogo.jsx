
const UserLogo = ({css}) => {
  return (
    <img
      className={`z-30 ${css ? css : 'w-16 absolute left-5 top-5'}`}
      src="/images/self/userlogo.webp"
      alt=""
    />
  );
};

export default UserLogo;