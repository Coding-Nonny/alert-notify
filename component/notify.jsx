import AlertNotify from "./nonnyAlert";
import style from './alert-box.css';

export default function Alertify({ message }) {
  const handleClick = async () => {
    const Alertify = new AlertNotify(10000, "top-right");
    if (await Alertify.alert_Confirm("Do You Think This Is Awesome?")) {
      Alertify.alert_message("Button Clicked!", "success");
    } else {
      Alertify.alert_message("Button Clicked!", "danger");
    }
    Alertify.shouldAutoHide(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
