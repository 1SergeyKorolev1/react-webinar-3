import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Lang extends StoreModule {
  initState() {
    return {
      lang: "",
    };
  }

  lang() {
    const lang = document.querySelector(".Head-select");

    this.setState(
      {
        ...this.getState(),
        lang: lang.value,
      },
      "Переводим сайт на выбранный язык..."
    );
  }
}

export default Lang;
