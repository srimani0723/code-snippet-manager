import { CgSpinner } from "react-icons/cg";

const Spinner = ({ className }) => {
  return <CgSpinner className={`animate-spin  mx-auto ${className}`} />;
};

export default Spinner;
