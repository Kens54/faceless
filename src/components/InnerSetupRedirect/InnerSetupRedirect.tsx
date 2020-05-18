import React from "react";
import { SET_UP_PAGE_PATH } from "@src/constants/routing";
import {Redirect} from "react-router-dom";
import { TPage } from "@src/types/routing";

interface IComponentProps {
  to: TPage;
}

type TProps = IComponentProps;

const InnerSetupRedirect = ({to}: TProps) => {
  return <Redirect to={`${SET_UP_PAGE_PATH}${to}`} />
}

export default InnerSetupRedirect;
