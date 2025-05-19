import { Box } from "@mui/material";
import SortSelect from "./SortSelect";
import SearchBar from "./SearchBar";
import "../assets/styles/_controls.scss";

export interface ControlsProps {
    sort: string;
    onSortChange: (val: string) => void;
    onSearch: (query: string) => void;
}

function Controls({ sort, onSortChange, onSearch }: ControlsProps) {
    return (
        <Box
            className="control-box"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
            }}
        >
            <SortSelect sort={sort} onChange={onSortChange} />
            <SearchBar onSearch={onSearch} />
        </Box>
    );
}

export default Controls;
