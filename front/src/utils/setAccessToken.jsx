
function setAccessToken(accessToken) {
    console.log({accessToken});
  localStorage.setItem("accessToken", accessToken);
  return;
}

export default setAccessToken;
