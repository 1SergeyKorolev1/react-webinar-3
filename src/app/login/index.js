import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import LoginNavigate from "../../components/login-navigate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LoginForm from "../../components/login-form";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";

function Login() {
  const store = useStore();
  let navigate = useNavigate();

  function onClickExit() {
    store.auth.onExit();
  }

  function handleAuthorizedUser(data) {
    store.actions.auth.onAuthorize(data.password, data.login);
    // navigate("/login");
  }

  const select = useSelector((state) => ({
    name: state.auth.name,
    error: state.auth.errorText,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginNavigate name={select.name} t={t} onClockExit={onClickExit} />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        onAuthorizedUser={handleAuthorizedUser}
        t={t}
        errorText={select.error}
      />
    </PageLayout>
  );
}

export default memo(Login);
