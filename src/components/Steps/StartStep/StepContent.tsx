import React from 'react';
import { TSetupStatus } from '@src/types/api/setup-status';
import ContinueSetup from './ContinueSetup';
import Default from './Default';
import Done from './Done';

interface IComponentProps {
  setupStatus: TSetupStatus;
  onClickFaceless: () => void;
  disableFacelessButton: boolean;
}

type TProps = IComponentProps;

const StepContent = ({ setupStatus, onClickFaceless, disableFacelessButton }: TProps) => {
  switch (setupStatus) {
    case 'starting':
      return <ContinueSetup />;
    case 'started':
      return <Done />;
    default:
      return <Default onClickFaceless={onClickFaceless} disableFacelessButton={disableFacelessButton} />;
  }
};

export default StepContent;
