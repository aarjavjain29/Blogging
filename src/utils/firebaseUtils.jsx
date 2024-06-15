import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import {Toastify, ToastifyInfo} from "./toastNotify";

const firebaseApp = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const app = initializeApp(firebaseApp);

const auth = getAuth(app);

//register sayfasından email ve password u çekmek için :
export const createUser = async (email, password, displayName, navigate) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: "",
    });
    navigate("/");
  } catch (err) {
    alert(err.message);
  }
};

export const signIn = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  } catch (err) {
    alert(err.message);
  }
};

export const logOut = () => {
  signOut(auth);
  ToastifyInfo("logged out successfully")
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setCurrentUser(currentUser);
    } else {
      // User is signed out
      setCurrentUser(false);
    }
  });
};

export const signUpProvider = (navigate) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const forgotPassword = (email) => {
  // Email yoluyla şifre sıfırlama için kullanılan firebase metodu
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // toastWarnNotify("Please check your mail box!");
      // alert("Please check your mail box!");
    })
    .catch((err) => {
      // toastErrorNotify(err.message);
      // alert(err.message);

    });
};

//! --- firebase realtime data ------

// Bilgi ekleme
export const AddBlog = (info, currentUser) => {
  const db = getDatabase();
  const blogRef = ref(db, "blogs");
  const newBlogRef = push(blogRef);

  set(newBlogRef, {
    title: info.title,
    imgUrl: info.imgUrl,
    content: info.content,
    date: info.date,
    likes: 0,
    user: currentUser.email,
  });
};

//Bilgi çağırma
export const useFetch = () => {
  const [isLoading, setIsLoading] = useState();
  const [blogList, setBlogList] = useState();

  useEffect(() => {
    setIsLoading(true);

    const db = getDatabase();
    const blogRef = ref(db, "blogs");

    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      const blogsArray = [];

      for (let id in data) {
        blogsArray.push({ id, ...data[id] });
      }
      setBlogList(blogsArray);
      setIsLoading(false);
    });
  }, []);
  return { isLoading, blogList };
};

//Bilgi silme
export const DeleteBlog = (id) => {
  const db = getDatabase();
  remove(ref(db, "/blogs/" + id));

  Toastify("deletion succeeded");
};

//Bilgi Değiştirme
export const EditUser = (info) => {
  const db = getDatabase();
  const updates = {};

  updates["/blogs/" + info.id] = info;
  return update(ref(db), updates);
};
