import Home from "./components/Home";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const tsStyle = {
	position: "top-right",
	autoClose: 3500,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true
}

function App() {

  const errorToast = (error) => toast.error(`${error}`, tsStyle);

  return (
    <>
      <ToastContainer />
      <Home errorToast={errorToast} />
    </>
  );
}

export default App;
