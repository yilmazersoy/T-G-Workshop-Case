import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Divider,
    Box,
    ListItemAvatar,
    Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCartStore } from "../store/cartStore";
import { formatPrice } from "../utils/format";

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

function CartDrawer({ open, onClose }: CartDrawerProps) {
    const items = useCartStore((state) => state.items);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 320, p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Sepet
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <List>
                    {items.map((item) => (
                        <ListItem
                            key={item.id}
                            sx={{ alignItems: "flex-start" }}
                        >
                            <ListItemAvatar>
                                <Avatar src={item.image} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.title}
                                secondary={
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mt: 0.5,
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                            disabled={item.quantity <= 1}
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{ mx: 1 }}>
                                            {item.quantity}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{ ml: 2 }}>
                                            {formatPrice(
                                                item.price * item.quantity
                                            )}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                            sx={{ ml: "auto" }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ mt: 2 }} />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                    }}
                >
                    <Typography variant="subtitle1">Toplam:</Typography>
                    <Typography variant="subtitle1">
                        {formatPrice(total)}
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
}

export default CartDrawer;
