import React, { useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from "./components/basket";
import BasketDisplay from "./components/basket-display";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const [price, setPrice] = React.useState(Number);
  const [productList, setProductList] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  function onAddInBasket(item) {
    setPrice(price + item.price);
    store.addEntryInBasket(item, price);
    setProductList(store.getBasketList());
    // console.log(productList);
  }

  function setOpen() {
    setIsOpen(!isOpen);
  }

  function setExit() {
    setIsOpen(!isOpen);
  }

  function onDeleteInBasket(item) {
    if (item.quantity > 1) {
      setPrice(price - item.price * item.quantity);
    } else {
      setPrice(price - item.price);
    }
    store.deleteEntryInBasket(item);
    setProductList(store.getBasketList());
    // console.log(item);
  }

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onSelectItem: useCallback(
      (code) => {
        store.selectItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      {/* <Controls onAdd={callbacks.onAddItem} /> */}
      <BasketDisplay
        price={price}
        productList={productList}
        setOpen={setOpen}
      />
      <List
        list={list}
        // onDeleteItem={callbacks.onDeleteItem}
        onAddInBasket={onAddInBasket}
        onSelectItem={callbacks.onSelectItem}
      />
      <Basket
        price={price}
        isOpen={isOpen}
        list={productList}
        onDeleteItem={callbacks.onDeleteItem}
        onSelectItem={callbacks.onSelectItem}
        title={"Корзина"}
        setExit={setExit}
        onDeleteInBasket={onDeleteInBasket}
      />
    </PageLayout>
  );
}

export default App;
