import React from "react";

import MainLayout from "layout/MainLayout/MainLayout";
// import FormProfileInfo from "components/FormProfileInfo/FormProfileInfo";
import "./GeneralInformation.scss";
import InfosPersonas from "../InfosPersonas/InfosPersonas";
import useCreateAndUpdatePersona from "hook/useCreateAndUpdatePersona";

const GeneralInformation = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id || 0;
  const [submit] = useCreateAndUpdatePersona();

  const submitHandler = (data) => {
    const personaSubmit = {
      userId: userId,
      firstName: data.firstName,
      lastName: data.lastName,
      position: data.position.value,
      contractualTerm: data.contractualTerm.value,
      divisionId: data.division.id,
      locationId: data.location.id
    };
    submit(personaSubmit);
  };

  return (
    <MainLayout>
      {/* <FormProfileInfo /> */}
      <InfosPersonas handlePersonaProfile={submitHandler} />
    </MainLayout>
  );
};

export default GeneralInformation;
