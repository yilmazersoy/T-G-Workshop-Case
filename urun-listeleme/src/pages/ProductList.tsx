import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import { CircularProgress, Typography, Box, Grid } from "@mui/material";

import Layout from "../layout/Layout";
import CartDrawer from "../components/CartDrawer";
import ProductCard from "../components/ProductCard";
import Controls from "../components/Control";

import "../assets/styles/_productList.scss";

function ProductList() {
    const { products, loading, error, fetchProducts } = useProductStore();
    const cartCount = useCartStore((state) => state.items.length);

    const [query, setQuery] = useState("");
    const [selectedCats, setSelectedCats] = useState<string[]>([]);
    const [sort, setSort] = useState<"asc" | "desc">("asc");
    const [openCart, setOpenCart] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const list = products
        .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
        .filter((p) =>
            selectedCats.length ? selectedCats.includes(p.category) : true
        )
        .sort((a, b) =>
            sort === "asc" ? a.price - b.price : b.price - a.price
        );

    const categories = Array.from(new Set(products.map((p) => p.category)));
    const counts = products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <>
            <Layout
                cartCount={cartCount}
                onToggleCart={() => setOpenCart((o) => !o)}
                categories={categories}
                counts={counts}
                selectedCats={selectedCats}
                onSelectionChange={(newSelected: string[]) =>
                    setSelectedCats(newSelected)
                }
            >
                <Box>
                    <Controls
                        sort={sort}
                        onSortChange={(val) => setSort(val as "asc" | "desc")}
                        onSearch={setQuery}
                    />
                    <Grid
                        className="list-container"
                        container
                        spacing={2}
                        sx={{ p: 2 }}
                    >
                        {list.map((product) => (
                            <Grid
                                key={product.id}
                                className="list-container-item"
                            >
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Layout>

            <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
        </>
    );
}

export default ProductList;
