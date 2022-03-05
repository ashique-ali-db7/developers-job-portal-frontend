import axios from "axios";
let token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-type": "application/json",
  },
};
const config2 = {
  headers: {
    "Content-type": "application/json",
    Authorization: token,
  },
};

console.log(config2);
export const githubVerification = (code, config) =>
  axios.post("/github", code, config);

export const googleAuth = async (email) => {
  try {
    let { data } = await axios.post("/googleVerification", email, config);
    return new Promise(async (resolve, reject) => {
      resolve(data);
    });
  } catch (error) {
    return new Promise(async (resolve, reject) => {
      reject();
    });
  }
};

export async function emailGithubVerification(
  email,
  githubUserName,
  resultFunction
) {
  let { data } = await axios.get(
    "https://api.github.com/search/users?q=" + githubUserName + "in:" + email
  );

  let result;
  if (data.items.length > 0) {
    result = true;
    resultFunction(result);
  } else {
    result = false;
    resultFunction(result);
  }
}

export function profileForm(formData, resultFunction) {
  console.log("hh");
  for (let key of formData.entries()) {
    console.log(key);
  }

  axios.post("/profilePost", formData, config2).then((result) => {
    let { data } = result;
    resultFunction(data);
  });
}

export async function allUsers(sample, numberOfUsers) {
  let result = await axios.get("/allUsers?number=" + numberOfUsers);
  let { data } = result;
  sample(data);
}

export async function paginationCount(count) {
  let { data } = await axios.get("/paginationCount");
  count(data.count);
}

//https://api.github.com/search/users?q=ashique-ali-db7+in:ashiquealikmvkd@gmail.com

// google clientid : 680809948788-884h20uqor8gnboufpl40vdfi5rflo02.apps.googleusercontent.com

// lcient secert : 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
