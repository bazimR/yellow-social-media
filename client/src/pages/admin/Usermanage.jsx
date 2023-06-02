
import UserTable from "../../components/admin/UserTable";
import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box"


const Usermanage = () => {
  return (
     <>
      <Box p={2}  sx={{width:"-webkit-fill-available%",backgroundColor:"#D9D9D9"}}><Typography sx={{fontSize:"24px"  }}>User management</Typography></Box>
       <UserTable />
     </>
  );
};

export default Usermanage;
