import React from "react";
import type { Product } from "../types/product";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartStore } from "../store/cartStore";
import { formatPrice } from "../utils/format";
import "../assets/styles/_productCard.scss";

function ProductCard({ product }: { product: Product }) {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <Card className="product-card">
            <CardMedia
                className="card-image"
                component="img"
                image={product.image}
                alt={product.title}
            />
            <CardContent className="card-content">
                <Typography gutterBottom variant="h6" component="h6">
                    {product.title}
                </Typography>
                <Box className="card-sell">
                    <Typography variant="body2">
                        {formatPrice(product.price)}
                    </Typography>
                    <Button
                        className="add-to-cart"
                        onClick={() => addToCart(product)}
                    >
                        <ShoppingCartIcon />
                        Sepete Ekle
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default ProductCard;
