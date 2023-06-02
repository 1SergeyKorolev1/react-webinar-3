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

  onExit() {
    localStorage.removeItem("jwt");
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
  }

  async onAuthorize(password, login) {
    this.setState({
      errorText: "",
      name: "",
      telephone: "",
      email: "",
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });
      const json = await response.json();
      //   console.log(json.result.token);
      localStorage.setItem("jwt", json.result.token);

      this.setState(
        {
          ...this.getState(),
          errorText: "",
          name: json.result.user.username,
          telephone: json.result.user.profile.phone,
          email: json.result.user.email,
          waiting: false,
        },
        "Получаем данные пользователя при входе"
      );
    } catch (e) {
      //   console.log(e.message);
      this.setState(
        {
          ...this.getState(),
          errorText: e.message,
          name: "",
          telephone: "",
          email: "",
          waiting: false,
        },
        "Ошибка при входе"
      );
    }
  }
}

export default Auth;
