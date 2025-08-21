import { Modal, Box } from "@mui/material";
import type { ReactNode } from "react";

interface IOpenModal {
  open: boolean;
  handleModal: () => void;
  children?: ReactNode;
}

const CustomModal= ({ open, handleModal, children } : IOpenModal) => {

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    maxWidth: 400, 
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    color: '#000'
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
    </>
  );
}

export default CustomModal;