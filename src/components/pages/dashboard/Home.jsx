import { Grid2, Typography } from "@mui/material";
import BasicLineChart from "../../graphs/Line";

export default function Users() {

    return (
        <Grid2 container>
            <Grid2
                size={{ xs: 12 }}
            >
                <BasicLineChart />
            </Grid2>
        </Grid2>
    )
}