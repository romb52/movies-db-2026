import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';


interface MovieCardProps {
    id: number;
    title: string;
    overview: string;
    popularity: number;
    enableUserActions?: boolean;
    image?: string;
}


export function MovieCard({ id, title, overview, popularity, enableUserActions, image = "/thumbnail.jpg" }: MovieCardProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <Card sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}>
                <CardMedia component="div"
                    image={image}
                    sx={{ pt: "56.25%" }}
                />
                <CardContent sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column"
                }}
                >
                    <Typography variant="h5"
                        gutterBottom
                    >{title}</Typography>
                    <Typography variant="body2"
                        color="text.secondary"
                    >{overview}</Typography>
                    <Typography variant="button">{popularity}</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => setModalOpen(true)}>
                        Details
                    </Button>
                    {enableUserActions && (<Tooltip title="Add to favorites">
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                    </Tooltip>)}
                </CardActions>
            </Card>

            {modalOpen && (
                <Modal>
                    <h2>Перейти до деталей фільму?</h2>

                    <Button onClick={() => setModalOpen(false)}>
                        Cancel
                    </Button>

                    <Button onClick={() => {
                        setModalOpen(false);
                        navigate(`/movies/${id}`);
                    }
                    }>
                        Details
                    </Button>
                </Modal>
            )}

        </>)

}