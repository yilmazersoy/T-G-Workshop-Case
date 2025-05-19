import React from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Autocomplete,
    TextField,
    Checkbox,
    Chip,
    Divider,
    Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../../assets/styles/_sidebar.scss";

interface SidebarProps {
    categories: string[];
    counts: Record<string, number>;
    selected: string[];
    onSelectionChange: (selected: string[]) => void;
    onClear?: () => void;
    open?: boolean;
    onClose?: () => void;
    isMobile?: boolean;
}

function Sidebar({
    categories,
    counts,
    selected,
    onSelectionChange,
    onClear,
    open = true,
    onClose,
    isMobile = false,
}: SidebarProps) {
    function handleAutocompleteChange(
        event: React.SyntheticEvent,
        newValue: string[]
    ) {
        onSelectionChange(newValue);
    }

    const handleDelete = (category: string) => {
        onSelectionChange(selected.filter((c) => c !== category));
    };

    const content = (
        <Box className="sidebar" sx={{ p: 2 }}>
            {isMobile && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography variant="h6">Kategoriler</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            )}

            {!isMobile && (
                <Typography variant="subtitle1" gutterBottom>
                    Filtreler
                </Typography>
            )}

            <Autocomplete
                className="sidebar__autocomplete"
                multiple
                options={categories}
                value={selected}
                onChange={handleAutocompleteChange}
                getOptionLabel={(option) =>
                    `${option} (${counts[option] || 0})`
                }
                renderOption={(props, option, { selected: optionSelected }) => (
                    <li {...props} key={option}>
                        <Checkbox
                            checked={optionSelected}
                            style={{ marginRight: 8 }}
                        />
                        {`${option} (${counts[option] || 0})`}
                    </li>
                )}
                renderTags={() => null}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Kategoriler"
                        variant="outlined"
                    />
                )}
                sx={{ mb: 2 }}
            />

            {selected.length > 0 && (
                <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selected.map((cat) => (
                        <Chip
                            key={cat}
                            label={`${cat} (${counts[cat] || 0})`}
                            onDelete={() => handleDelete(cat)}
                        />
                    ))}
                </Box>
            )}

            {selected.length > 0 && onClear && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Button variant="outlined" fullWidth onClick={onClear}>
                        Kategorileri Sıfırla
                    </Button>
                </>
            )}
        </Box>
    );

    return isMobile ? (
        <Drawer anchor="left" open={open} onClose={onClose}>
            {content}
        </Drawer>
    ) : (
        content
    );
}

export default Sidebar;
