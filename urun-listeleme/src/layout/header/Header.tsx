import {
    AppBar,
    Toolbar,
    Typography,
    Badge,
    IconButton,
    useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PropTypes from "prop-types";
import { useThemeToggle } from "../../context/ThemeContext";

export interface HeaderProps {
    cartCount: number;
    onToggleCart: () => void;
    onToggleSidebar?: () => void;
}

function Header({ onToggleCart, onToggleSidebar, cartCount }: HeaderProps) {
    const theme = useTheme();
    const { toggleTheme } = useThemeToggle();

    return (
        <AppBar position="sticky">
            <Toolbar>
                {onToggleSidebar && (
                    <IconButton
                        color="inherit"
                        onClick={onToggleSidebar}
                        sx={{
                            mr: 2,
                            display: { xs: "inline-flex", md: "none" },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Ürün Listesi
                </Typography>

                {/* Tema toggle */}
                <IconButton
                    color="inherit"
                    onClick={toggleTheme}
                    sx={{ mr: 1 }}
                >
                    {theme.palette.mode === "dark" ? (
                        <LightModeIcon />
                    ) : (
                        <DarkModeIcon />
                    )}
                </IconButton>

                {/* Sepet */}
                <IconButton color="inherit" onClick={onToggleCart}>
                    <Badge badgeContent={cartCount} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onToggleCart: PropTypes.func.isRequired,
    cartCount: PropTypes.number.isRequired,
};

export default Header;
