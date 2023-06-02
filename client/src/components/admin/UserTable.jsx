import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import useFetchUsers from "../../hooks/admin/fetch.users";
import UserTableLoading from "./UserTableLoading";

const UserTable = () => {
  const [{ isLoading, apiData, serverError }] = useFetchUsers("admin/users");
  if (isLoading) {
    return <UserTableLoading />;
  }
  if (serverError) {
    console.log(serverError);
    return (
      <>
        <h1>server went down</h1>
      </>
    );
  }
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ borderBottom: 1 }}>
          <TableRow>
            <TableCell>
              <Typography variant="h6" sx={{ fontWeight: 600 }} color="initial">
                Profile
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6" sx={{ fontWeight: 600 }} color="initial">
                Username
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6" sx={{ fontWeight: 600 }} color="initial">
                Name
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6" sx={{ fontWeight: 600 }} color="initial">
                Email
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6" sx={{ fontWeight: 600 }} color="initial">
                Gender
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6" sx={{ fontWeight: 600 }} color="initial">
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiData?.map((doc) => {
            return (
              <TableRow
                key={doc.username}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img src="" alt="profile" />
                </TableCell>
                <TableCell align="left">{doc?.username}</TableCell>
                <TableCell align="left">doc?.fullname</TableCell>
                <TableCell align="left">{doc?.email}</TableCell>
                <TableCell align="left">doc?.gender</TableCell>
                <TableCell align="left">
                  <Switch />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
