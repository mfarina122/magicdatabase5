import styled from "@emotion/styled/macro";
import { TextField } from "@mui/material";

export const StyledTextfield = styled(TextField)`
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #aedbf0;
    }
  }
`;