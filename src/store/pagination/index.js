// import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Pagination extends StoreModule {
  initState() {
    return {
      number: [],
    };
  }

  addNumber(oldList) {
    const maxNumber = 25;
    const newArreyNumber = [];
    let selectedItem = {};
    let finishArreyNumber = [];
    for (let i = 1; i <= maxNumber; i++) {
      if (i === 1) {
        newArreyNumber.push({ code: i, data: i, selected: true });
      } else {
        newArreyNumber.push({ code: i, data: i, selected: false });
      }
    }

    if (oldList.length === 0) {
      newArreyNumber.map((item) => {
        if (item.selected) {
          selectedItem = item;
        }
      });
    } else {
      oldList.map((item) => {
        if (item.selected) {
          selectedItem = item;
        }
      });
    }

    if (oldList.length === 0) {
      newArreyNumber.map((item) => {
        if (selectedItem.code === 1) {
          if (Number(item.code) === maxNumber) {
            finishArreyNumber.push({
              code: item.code,
              data: item.code,
              selected: item.selected,
            });
          } else if (item.code > selectedItem.code + 2) {
            finishArreyNumber.push({
              code: item.code,
              data: "...",
              selected: false,
            });
          } else {
            finishArreyNumber.push({
              code: item.code,
              data: item.code,
              selected: item.selected,
            });
          }
        } else {
          if (
            item.code < selectedItem.code - 1 ||
            item.code > selectedItem.code + 1
          ) {
            finishArreyNumber.push({
              code: item.code,
              data: "...",
              selected: false,
            });
          } else {
            finishArreyNumber.push({
              code: item.code,
              data: item.code,
              selected: item.selected,
            });
          }
        }
      });
    } else {
      oldList.map((item) => {
        if (selectedItem.code === 1) {
          if (Number(item.code) === maxNumber) {
            finishArreyNumber.push({
              code: item.code,
              data: item.code,
              selected: item.selected,
            });
          } else if (item.code > selectedItem.code + 2) {
            finishArreyNumber.push({
              code: item.code,
              data: "...",
              selected: false,
            });
          } else {
            finishArreyNumber.push({
              code: item.code,
              data: item.code,
              selected: item.selected,
            });
          }
        } else {
          if (Number(item.code) === 1) {
            finishArreyNumber.push({
              code: item.code,
              data: item.code,
              selected: item.selected,
            });
          } else if (Number(item.code) === maxNumber) {
            finishArreyNumber.push({
              code: item.code,
              data: item.code,
              selected: item.selected,
            });
          } else if (
            item.code < selectedItem.code - 1 ||
            item.code > selectedItem.code + 1
          ) {
            finishArreyNumber.push({
              code: item.code,
              data: "...",
              selected: false,
            });
          } else {
            finishArreyNumber.push({
              code: item.code,
              data: item.code,
              selected: item.selected,
            });
          }
        }
      });
    }

    // console.log(selectedItem);
    // console.log(finishArreyNumber);

    this.setState(
      {
        ...this.getState(),
        number: finishArreyNumber,
      },
      "Добавляем страницы пагинации"
    );
  }

  highlightNumber(evt) {
    // console.log(Number(evt.target.innerHTML));
    const newArreyNumber = [];
    this.store.getState().pagination.number.map((item) => {
      if (item.code === Number(evt.target.innerHTML)) {
        if (item.selected) {
          console.log("мы уже на этой страницце");
        } else {
          item.selected = !item.selected;
        }
      }
      if (item.code !== Number(evt.target.innerHTML) && item.selected) {
        item.selected = !item.selected;
      }
      newArreyNumber.push(item);
    });

    this.setState(
      {
        ...this.getState(),
        number: newArreyNumber,
      },
      "Выделяем страницу пагинации"
    );
  }
}

export default Pagination;
