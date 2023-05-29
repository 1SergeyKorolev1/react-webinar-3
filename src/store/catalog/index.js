import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      skip: 0,
      limit: 10,
      list: [],
      item: {},
      quantityitem: {},
    };
  }

  async load(limit, skip) {
    const response = await fetch(
      `/api/v1/articles?lang=ru&limit=${limit}&skip=${skip}`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      "Загружены товары из АПИ"
    );
  }

  skip(number) {
    this.setState(
      {
        ...this.getState(),
        skip: number,
      },
      "Изменяем значение Skip"
    );
  }

  async quantityitem() {
    const response = await fetch(
      `/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        quantityitem: json.result,
      },
      "Загружены данные об общем количестве товаров"
    );
  }

  async loadItem(id) {
    if (id !== undefined) {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
      );
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          item: json.result,
        },
        "Загружен выбранный товар из АПИ"
      );
    }
  }
}

export default Catalog;
