import {
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ padding: "6px" }}>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
