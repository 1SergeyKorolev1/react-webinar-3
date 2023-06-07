import React from "react";
import { memo } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import LoginNavigate from "../../components/login-navigate";
import useSelector from "../../hooks/use-selector";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    name: state.profile.name,
  }));

  function onClickExit() {
    store.actions.auth.onExit(localStorage.jwt);
    location.reload();
  }

  React.useEffect(() => {
    if (localStorage.jwt) {
      store.actions.profile.checkToken(localStorage.jwt);
    }
  }, []);

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true
  );

  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginNavigate name={select.name} t={t} onClockExit={onClickExit} />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
