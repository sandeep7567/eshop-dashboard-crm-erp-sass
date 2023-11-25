interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({children}: HeaderProps) => {
  return (
    <p className="flex text-xl w-full font-semibold font-[Nunito,sans-serif,sans]">
      {children}
    </p>
  );
};

export default Header;