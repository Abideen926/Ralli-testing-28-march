import { useRef} from "react";
import { Cancel } from "@mui/icons-material";
import { Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Tags = ({ data, handleDelete }) => {
  return (
    <Box
      sx={{
        background: "#00305B",
        height: "auto",
        display: "flex",
        flexWrap: "wrap",
        borderRadius: "10px",
        margin: "8px 5px",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
      }}
    >
      <Stack direction="row" gap={1} sx={{display:'flex', justifyContent:'space-between', alignItems:'center', p:0.5}}>
        <Typography sx={{fontSize:'12px', fontWeight:500,}}>{data}</Typography>
        <Cancel
          sx={{ cursor: "pointer",fontSize: '16px'  }}
          size='sm'
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Stack>
    </Box>
  );
};

export default function TagInput({
  tags = [],
  setTags = () => {},
  placeholder = "Enter Tags",
}) {
  //   const [tags, setTags] = useState([]);
  const tagRef = useRef();

  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    setTags(newtags);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setTags([...tags, tagRef.current.value]);
    tagRef.current.value = "";
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleOnSubmit}>
        <TextField
          inputRef={tagRef}
          fullWidth
          size="small"
          inputProps={{
            style: {
              color: "#222222",
              fontSize: "16px",
              fontWeight: 400,
            },
            sx: {
              "&::placeholder": {
                color: "rgb(0, 0, 0)",
                fontSize: "16px",
                fontWeight: 300,
              },
          },
          }}
          sx={{
            //  margin: "0.1rem 0",
              color: "black !important",
          ".MuiOutlinedInput-notchedOutline": { border: "none" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            ".css-1u4kwaj-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
              {
                paddingTop: "15px",
              },
            color: "#222222",
            boxShadow: "0px 0px 3px 1px #00000040",
            borderRadius: "5px",
            fontSize: "13px",
            fontWeight: 300,
            py:0.7
          }}
          margin="none"
          placeholder={tags.length < 5 ? placeholder : ""}
          InputProps={{
            startAdornment: (
              <Box sx={{ padding: "0 0.2rem 0 0", display: "flex" ,
                  border: "none",
            outline:'none'
              }}>
                {tags?.map((data, index) => {
                  return (
                    <Tags data={data} handleDelete={handleDelete} key={index} />
                  );
                })}
              </Box>
            ),
            style: {
              color: "black",
            },
          }}
        />
      </form>
    </Box>
  );
}
