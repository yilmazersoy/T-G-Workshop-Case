import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export interface SortSelectProps {
    sort: string;
    onChange: (val: string) => void;
}

function SortSelect({ sort, onChange }: SortSelectProps) {
    return (
        <FormControl sx={{ minWidth: 150, m: 1 }}>
            <InputLabel>Sıralama</InputLabel>
            <Select
                value={sort}
                label="Sıralama"
                onChange={(e) => onChange(e.target.value)}
            >
                <MenuItem value="asc">En Düşük Fiyat</MenuItem>
                <MenuItem value="desc">En Yüksek Fiyat</MenuItem>
            </Select>
        </FormControl>
    );
}

export default SortSelect;
