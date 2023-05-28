import { memo, useCallback } from "react";
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.lang,
  }));

  console.log(select.list);

  const callbacks = {
    onClickTitle: useCallback((item) => {
      store.actions.catalog.loadItem(item._id);
      callbacks.closeModal();
    }),
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.actions.basket.removeFromBasket(_id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      (item, lang) => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            onClickTitle={callbacks.onClickTitle}
            lang={lang}
          />
        );
      },
      [callbacks.removeFromBasket]
    ),
  };

  return (
    <ModalLayout
      title="Корзина"
      onClose={callbacks.closeModal}
      lang={select.lang}
    >
      <List
        list={select.list}
        renderItem={renders.itemBasket}
        lang={select.lang}
      />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
