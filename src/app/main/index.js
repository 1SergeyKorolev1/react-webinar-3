import React, { memo, useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import PageItem from "../page-item";
import NotFound from "../../components/not-found";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { number } from "prop-types";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    item: state.catalog.item,
    skip: state.catalog.skip,
    limit: state.catalog.limit,
    list: state.catalog.list,
    quantityitem: state.catalog.quantityitem,
    amount: state.basket.amount,
    sum: state.basket.sum,
    number: state.pagination.number,
    lang: state.lang.lang,
  }));

  useEffect(() => {
    store.actions.pagination.addNumber(select.number, select.quantityitem);
  }, [select.quantityitem]);

  useEffect(() => {
    store.actions.catalog.quantityitem();
    store.actions.catalog.load(select.limit, select.skip);
    store.actions.pagination.addNumber(select.number, select.quantityitem);
    store.actions.lang.lang();
  }, [select.skip]);

  const callbacks = {
    // При выборе языка
    onChoiceLang: useCallback(() => store.actions.lang.lang(), [store]),
    // При клике по товару
    onClickTitle: useCallback((item) => {
      store.actions.catalog.loadItem(item._id);
    }),
    // Выделение номера в пагинации
    highlightNumber: useCallback(
      (evt) => {
        store.actions.pagination.highlightNumber(evt);
        store.actions.catalog.skip(Number(evt.target.innerHTML) * 10 - 10);
      },
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
      (item, lang) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            onClickTitle={callbacks.onClickTitle}
            lang={lang}
          />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  const rendersPaginationNamber = {
    number: useCallback(
      (number) => {
        return (
          <a
            className={`Pagination-link ${
              number.code > 9 ? "Pagination-link-big" : ""
            } ${number.code > 99 ? "Pagination-link-big-1" : ""} ${
              number.selected ? "Pagination-link-activ" : ""
            } ${number.data === "..." ? "Pagination-link-deactiv" : ""}`}
            onClick={callbacks.highlightNumber}
          >
            {number.data}
          </a>
        );
      },
      [store]
    ),
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageLayout>
            <Head
              title={select.lang === "Русский" ? "Магазин" : "Store"}
              onChoiceLang={callbacks.onChoiceLang}
              lang={select.lang}
            />
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
              lang={select.lang}
            />
            <List
              list={select.list}
              renderItem={renders.item}
              lang={select.lang}
            />
            <Pagination
              listnumber={select.number}
              rendersPaginationNamber={rendersPaginationNamber.number}
            />
          </PageLayout>
        }
      />
      <Route
        path="to/:id"
        element={
          <PageLayout>
            <Head
              title={select.item.title}
              onChoiceLang={callbacks.onChoiceLang}
              lang={select.lang}
            />
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
              lang={select.lang}
            />
            <PageItem
              item={select.item}
              onAdd={callbacks.addToBasket}
              lang={select.lang}
            />
          </PageLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default memo(Main);
