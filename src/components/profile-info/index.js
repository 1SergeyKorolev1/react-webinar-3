import React from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

function ProfileInfo({ t, name, telephone, email }) {
  return (
    <section className="Profile-info">
      <p className="Profile-info-title">{t("Profile")}</p>
      <p className="">
        {t("Name")}: <span className="Profile-info-span">{name}</span>
      </p>
      <p className="">
        {t("Telephone")}: <span className="Profile-info-span">{telephone}</span>
      </p>
      <p className="">
        {t("email")}: <span className="Profile-info-span">{email}</span>
      </p>
    </section>
  );
}

// Head.propTypes = {
//   user: PropTypes.node,
// };

export default memo(ProfileInfo);
