import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";

function SearchForm({ text, onChange }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>
                <TextInput
                  name="text"
                  label="Search"
                  value={text}
                  onChange={onChange}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

SearchForm.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchForm;
