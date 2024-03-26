// Desc: Get user info from local storage

export const useGetUserInfo = () => {
    const { name, profilePhoto, userID, isAuth } =
      JSON.parse(localStorage.getItem("auth")) || {}; // get auth info from local storage
  
    return { name, profilePhoto, userID, isAuth }; // return auth info
  };