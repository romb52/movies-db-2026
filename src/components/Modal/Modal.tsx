import { createPortal } from "react-dom";
import { Box } from "@mui/material";

interface ModalProps {
    children: React.ReactNode;
}

export function Modal({ children }: ModalProps) {

    const modalRoot = document.getElementById("modal-root");

    return createPortal(
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}
        >
            <Box
                sx={{
                    backgroundColor: "white",
                    padding: 4,
                    borderRadius: 2
                }}
            >
                {children}
            </Box>
        </Box>,
        modalRoot!
    );
}