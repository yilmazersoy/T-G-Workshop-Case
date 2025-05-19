import React from "react";
import { InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export interface SearchBarProps {
    onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
    return (
        <Box
            className="search-bar"
            sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.05)",
                borderRadius: 2,
                px: 2,
            }}
        >
            <SearchIcon sx={{ mr: 1 }} />
            <InputBase
                placeholder="Ara…"
                fullWidth
                onChange={(e) => {
                    const value = e.target.value;
                    onSearch(value.length >= 2 ? value : "");
                }}
            />
        </Box>
    );
}

export default SearchBar;
