import { Typography } from '@mui/material';
import type { ReactNode } from "react";

interface IContainerCustomModal {
  header: string;
  children?: ReactNode
}

const ContainerCustomModal = ({ header, children } : IContainerCustomModal) => {
  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {header}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {children}
      </Typography>
    </>
  );
};

export default ContainerCustomModal;
