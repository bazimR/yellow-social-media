import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Skeleton,
} from "@mui/material";

const UserTableLoading = () => {
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ borderBottom: 1 }}>
            <TableRow>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600 }}
                  color="initial"
                >
                  Profile
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600 }}
                  color="initial"
                >
                  Username
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600 }}
                  color="initial"
                >
                  Name
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600 }}
                  color="initial"
                >
                  Email
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600 }}
                  color="initial"
                >
                  Gender
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600 }}
                  color="initial"
                >
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="circular" width={40} height={40} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="rounded" width={100} height={30} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="circular" width={40} height={40} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="rounded" width={100} height={30} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="circular" width={40} height={40} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="rounded" width={100} height={30} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="circular" width={40} height={40} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="rounded" width={100} height={30} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="circular" width={40} height={40} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="rounded" width={100} height={30} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="circular" width={40} height={40} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="rounded" width={100} height={30} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="circular" width={40} height={40} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="rounded" width={100} height={30} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="circular" width={40} height={40} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="rounded" width={100} height={30} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="circular" width={40} height={40} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="rounded" width={100} height={30} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Skeleton variant="circular" width={40} height={40} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="rounded" width={100} height={30} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTableLoading;
