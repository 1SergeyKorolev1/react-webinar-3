import StoreModule from "../module";

class Auth extends StoreModule {
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

  onExit(token) {
    return fetch(`/api/v1/users/sign`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        localStorage.removeItem("jwt");
        console.log(localStorage);
        this.setState(
          {
            ...this.getState(),
            errorText: "",
            name: "",
            telephone: "",
            email: "",
            waiting: false,
          },
          "Удаляем данные пользователя"
        );
      });
  }

  async onAuthorize(password, login) {
    this.setState({
      errorText: "",
      name: "",
      telephone: "",
      email: "",
      waiting: true,
    });

    return fetch(`/api/v1/users/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        if (res.result) {
          localStorage.setItem("jwt", res.result.token);
        }
        if (res.error) {
          this.setState(
            {
              ...this.getState(),
              errorText: res.error.data.issues[0].message,
              name: "",
              telephone: "",
              email: "",
              waiting: false,
            },
            "Получаем данные об ошибке при входе"
          );
        } else {
          this.setState(
            {
              ...this.getState(),
              errorText: "",
              name: res.result.user.username,
              telephone: res.result.user.profile.phone,
              email: res.result.user.email,
              waiting: false,
            },
            "Получаем данные пользователя при входе"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Auth;
