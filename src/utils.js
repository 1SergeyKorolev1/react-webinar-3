/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

export function getCategoriesUtils(res) {
  let finishArrey = [{ value: "", title: "Все" }];

  if (res.result) {
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
          finishArrey[index].title.startsWith("- -") &&
          !finishArrey[index].title.startsWith("- - -")
        ) {
          finishArrey = [
            ...finishArrey.slice(0, index + 1),
            {
              value: item._id,
              title: `- - - ${item.title}`,
            },
            ...finishArrey.slice(index + 1),
          ];
        } else if (
          index !== -1 &&
          finishArrey[index].title.startsWith("- - -") &&
          !finishArrey[index].title.startsWith("- - - -")
        ) {
          finishArrey = [
            ...finishArrey.slice(0, index + 1),
            {
              value: item._id,
              title: `- - - - ${item.title}`,
            },
            ...finishArrey.slice(index + 1),
          ];
        } else if (
          index !== -1 &&
          finishArrey[index].title.startsWith("- - - -")
        ) {
          finishArrey = [
            ...finishArrey.slice(0, index + 1),
            {
              value: item._id,
              title: `- - - - - ${item.title}`,
            },
            ...finishArrey.slice(index + 1),
          ];
        }
      }
    });
  }

  return finishArrey;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}
