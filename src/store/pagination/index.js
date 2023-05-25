// import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Pagination extends StoreModule {
  initState() {
    return {
      number: [],
    };
  }

  addNumber() {
    const newArreyNumber = [];
    for (let i = 1; i <= 110; i++) {
      newArreyNumber.push(i);
    }

    this.setState(
      {
        ...this.getState(),
        number: newArreyNumber,
      },
      "Добавляем страницы пагинации"
    );
  }

  highlightNumber(evt) {
    console.log(Number(evt.target.innerHTML));
    this.store.getState().pagination.number.map((item) => {
      if (item === Number(evt.target.innerHTML)) {
        console.log(item);
      }
    });
  }
}

export default Pagination;
