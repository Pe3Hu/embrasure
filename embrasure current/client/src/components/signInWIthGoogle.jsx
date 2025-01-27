import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GoogleOutlined } from "@ant-design/icons";
import { auth, db } from "../config/firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { Image } from "antd";

<GoogleOutlined />;

export default function SignInwithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        window.location.href = "/profile";
      }
    });
  }
  return <GoogleOutlined onClick={googleLogin} />;
}
