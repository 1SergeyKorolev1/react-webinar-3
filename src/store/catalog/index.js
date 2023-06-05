import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class CatalogState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        sort: "order",
        query: "",
        category: "",
      },
      count: 0,
      categories: [],
      waiting: false,
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    this.getCategories();
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has("page"))
      validParams.page = Number(urlParams.get("page")) || 1;
    if (urlParams.has("limit"))
      validParams.limit = Math.min(Number(urlParams.get("limit")) || 10, 50);
    if (urlParams.has("sort")) validParams.sort = urlParams.get("sort");
    if (urlParams.has("query")) validParams.query = urlParams.get("query");
    if (urlParams.has("category"))
      validParams.category = urlParams.get("category");
    await this.setParams(
      { ...this.initState().params, ...validParams, ...newParams },
      true
    );
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  getCategories() {
    return fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.result.items) {
          let finishArrey = [{ value: "", title: "Все" }];

          res.result.items.map((item) => {
            if (!item.parent) {
              finishArrey[finishArrey.length] = {
                value: item._id,
                title: item.title,
              };
            } else {
              const index = finishArrey.findIndex(
                (el) => el.value === item.parent._id
              );

              if (index !== -1 && !finishArrey[index].title.startsWith("-")) {
                finishArrey = [
                  ...finishArrey.slice(0, index + 1),
                  {
                    value: item._id,
                    title: `- ${item.title}`,
                  },
                  ...finishArrey.slice(index + 1),
                ];
              } else {
                finishArrey = [
                  ...finishArrey.slice(0, index + 1),
                  {
                    value: item._id,
                    title: `-- ${item.title}`,
                  },
                  ...finishArrey.slice(index + 1),
                ];
              }
            }
          });
          this.setState(
            {
              ...this.getState(),
              categories: finishArrey,
            },
            "Категории загруженны и установленны в нужном порядке"
          );
        }
      });
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    // console.log(newParams);
    const params = { ...this.getState().params, ...newParams };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      "Установлены параметры каталога"
    );

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    const url =
      window.location.pathname + "?" + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }

    // console.log(params.sort);

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: "items(*),count",
      sort: params.sort,
      "search[query]": params.query,
    };

    if (params.category !== "") {
      apiParams["search[category]"] = params.category;
    }

    // console.log(apiParams);
    // console.log(`/api/v1/articles?${new URLSearchParams(apiParams)}`);

    const response = await fetch(
      `/api/v1/articles?${new URLSearchParams(apiParams)}`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        waiting: false,
      },
      "Загружен список товаров из АПИ"
    );
  }
}

export default CatalogState;
