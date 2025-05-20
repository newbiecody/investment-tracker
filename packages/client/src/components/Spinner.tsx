import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

interface ISpinner {
  size?: SizeProp;
}
function Spinner({ size }: ISpinner) {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      spin
      size={size}
      className="text-blue-500"
    />
  );
}
export default Spinner;
