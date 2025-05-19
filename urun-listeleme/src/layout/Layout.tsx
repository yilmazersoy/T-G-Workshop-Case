import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

interface LayoutProps {
    children: React.ReactNode;
    cartCount: number;
    onToggleCart: () => void;
    categories: string[];
    selectedCats: string[];
    counts: Record<string, number>;
    onSelectionChange: (selected: string[]) => void;
}

function Layout({
    children,
    cartCount,
    onToggleCart,
    categories,
    selectedCats,
    counts,
    onSelectionChange,
}: LayoutProps) {
    const isMobile = useMediaQuery("(max-width:900px)");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Header
                cartCount={cartCount}
                onToggleCart={onToggleCart}
                onToggleSidebar={() => setSidebarOpen(true)}
            />
            <Box sx={{ display: "flex" }}>
                <Sidebar
                    categories={categories}
                    counts={counts}
                    selected={selectedCats}
                    onSelectionChange={onSelectionChange}
                    onClear={() => onSelectionChange([])}
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    isMobile={isMobile}
                />
                <Box sx={{ flex: 1 }}>{children}</Box>
            </Box>
        </>
    );
}

export default Layout;
