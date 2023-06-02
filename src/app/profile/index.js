import { memo, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import LoginNavigate from "../../components/login-navigate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import ProfileInfo from "../../components/profile-info";
import LoginForm from "../../components/login-form";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";

function Profile() {
  const store = useStore();

  const { t } = useTranslate();

  function onClockExit() {
    store.auth.onExit();
  }

  const select = useSelector((state) => ({
    name: state.auth.name,
    telephone: state.auth.telephone,
    email: state.auth.email,
    waiting: state.article.waiting,
  }));

  return (
    <PageLayout>
      <LoginNavigate name={select.name} t={t} onClockExit={onClockExit} />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileInfo
        t={t}
        name={select.name}
        telephone={select.telephone}
        email={select.email}
      />
    </PageLayout>
  );
}

export default memo(Profile);
