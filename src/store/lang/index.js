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
    // console.log(lang);
    if (lang !== null) {
      this.setState(
        {
          ...this.getState(),
          lang: lang.value,
        },
        "Переводим сайт на выбранный язык..."
      );
    }
  }
}

export default Lang;
