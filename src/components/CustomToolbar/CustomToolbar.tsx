import {
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ padding: "10px 0" }}>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
