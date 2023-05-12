/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.startMassiv = [1, 2, 3, 4, 5, 6, 7];
    this.maxNumberEntries = { min: 1, max: 1000 }; // Диапазон для генератора
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  // Генератор не повторяющихся чисел в заданном диапазоне
  addkey() {
    function getRandom({ min, max }) {
      return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }

    let result = getRandom(this.maxNumberEntries);

    while (this.startMassiv.includes(result)) {
      result = getRandom(this.maxNumberEntries);
    }

    this.startMassiv[this.startMassiv.length] = result;

    return result;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          count: 0,
          code: this.state.list[this.state.list.length - 1].code + 1,
          title: "Новая запись",
          key: this.addkey(),
        },
      ],
    });
  }

  /**
   * Удаление записи по коду или ключу
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => {
        if (item.key) {
          this.startMassiv = this.startMassiv.filter((item) => {
            return item !== code;
          });
          return item.key !== code;
        }
        this.startMassiv = this.startMassiv.filter((item) => {
          return item !== code;
        });
        return item.code !== code;
      }),
    });
  }

  /**
   * Выделение записи по коду или ключу и изменение счетчика выделений
   * @param code
   */
  selectItem(code) {
    console.log(this.startMassiv);
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.key === code || item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.count += 1;
          }
        }
        return item;
      }),
    });
  }
}

export default Store;
