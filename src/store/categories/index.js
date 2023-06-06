import StoreModule from "../module";
import { getCategoriesUtils } from "../../utils";

class Categories extends StoreModule {
  initState() {
    return {
      categories: [],
    };
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
          const result = getCategoriesUtils(res);

          this.setState(
            {
              ...this.getState(),
              categories: result,
            },
            "Категории загруженны и установленны в нужном порядке"
          );
        }
      });
  }
}

export default Categories;
