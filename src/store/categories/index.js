import StoreModule from "../module";

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
              } else if (
                index !== -1 &&
                finishArrey[index].title.startsWith("-") &&
                !finishArrey[index].title.startsWith("- -")
              ) {
                finishArrey = [
                  ...finishArrey.slice(0, index + 1),
                  {
                    value: item._id,
                    title: `- - ${item.title}`,
                  },
                  ...finishArrey.slice(index + 1),
                ];
              } else if (
                index !== -1 &&
                finishArrey[index].title.startsWith("- -")
              ) {
                finishArrey = [
                  ...finishArrey.slice(0, index + 1),
                  {
                    value: item._id,
                    title: `- - - ${item.title}`,
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
}

export default Categories;
