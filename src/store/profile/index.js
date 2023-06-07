import StoreModule from "../module";

class Profile extends StoreModule {
  initState() {
    return {
      errorText: "",
      name: "",
      telephone: "",
      email: "",
      waiting: false, // признак ожидания загрузки
    };
  }

  checkToken(token) {
    return fetch(`/api/v1/users/self`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        if (res.result) {
          this.setState(
            {
              ...this.getState(),
              errorText: "",
              name: res.result.profile.name,
              telephone: res.result.profile.phone,
              email: res.result.email,
              waiting: false,
            },
            "Получаем данные пользователя при проверке токена"
          );
        }
        return res;
      });
  }
}

export default Profile;
