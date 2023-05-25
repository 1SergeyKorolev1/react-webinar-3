import React, { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { number } from "prop-types";

function Main() {
  const store = useStore();

  const [limit, setMit] = React.useState(10);
  const [skip, setSkip] = React.useState(0);

  useEffect(() => {
    store.actions.catalog.load(limit, skip);
    store.actions.pagination.addNumber();
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    number: state.pagination.number,
  }));

  const callbacks = {
    // Выделение номера в пагинации
    highlightNumber: useCallback(
      (evt) => store.actions.pagination.highlightNumber(evt),
      [store]
    ),
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  const rendersPaginationNamber = {
    number: useCallback(
      (number) => {
        return (
          <a
            href="#"
            className={`Pagination-link ${
              number > 9 ? "Pagination-link-big" : ""
            } ${number > 99 ? "Pagination-link-big-1" : ""}`}
            onClick={callbacks.highlightNumber}
          >
            {number}
          </a>
        );
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        listnumber={select.number}
        rendersPaginationNamber={rendersPaginationNamber.number}
      />
    </PageLayout>
  );
}

export default memo(Main);
